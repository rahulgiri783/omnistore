<?php

namespace App\Services;

use App\Models\Address;
use App\Models\Cart;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\SellerOrder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;

class CheckoutService
{
    public function quote(User $user): array
    {
        $cart = $this->loadCart($user);
        $coupon = $cart->coupon;
        $items = $cart->items->loadMissing('productVariant.product.seller');

        if ($items->isEmpty()) {
            throw new RuntimeException('Cart is empty.');
        }

        $grouped = $items->groupBy(fn ($item) => $item->seller_id)->map(function ($sellerItems) {
            $subtotal = $sellerItems->sum(fn ($item) => $item->quantity * $item->price_at_add);

            return [
                'seller_id' => $sellerItems->first()->seller_id,
                'subtotal' => round($subtotal, 2),
                'items' => $sellerItems->map(fn ($item) => [
                    'cart_item_id' => $item->id,
                    'product_variant_id' => $item->product_variant_id,
                    'quantity' => $item->quantity,
                    'price_at_add' => (float) $item->price_at_add,
                    'line_total' => round($item->quantity * $item->price_at_add, 2),
                ])->values(),
            ];
        })->values();

        $subTotal = $grouped->sum('subtotal');
        $discount = $this->calculateDiscount($coupon, $subTotal);
        $shipping = (float) config('ecommerce.default_shipping_fee', 0);
        if ((float) config('ecommerce.free_shipping_threshold') > 0 && $subTotal >= (float) config('ecommerce.free_shipping_threshold')) {
            $shipping = 0;
        }
        $tax = round($subTotal * ((float) config('ecommerce.tax_rate') / 100), 2);
        $total = max(0, round($subTotal + $shipping + $tax - $discount, 2));

        return [
            'coupon' => $coupon?->only(['id', 'code', 'type', 'value']),
            'sub_total' => round($subTotal, 2),
            'shipping' => round($shipping, 2),
            'tax' => $tax,
            'discount' => round($discount, 2),
            'total' => $total,
            'items_by_seller' => $grouped,
        ];
    }

    public function placeOrder(User $user, array $payload = []): Order
    {
        return DB::transaction(function () use ($user, $payload) {
            $cart = $this->loadCart($user)->loadMissing('items.productVariant.product.seller', 'coupon');
            $items = $cart->items;

            if ($items->isEmpty()) {
                throw new RuntimeException('Cart is empty.');
            }

            $shippingAddress = ! empty($payload['shipping_address_id'])
                ? Address::query()->whereKey($payload['shipping_address_id'])->where('user_id', $user->id)->firstOrFail()
                : $user->addresses()->where('is_default', true)->firstOrFail();

            $billingAddress = ! empty($payload['billing_address_id'])
                ? Address::query()->whereKey($payload['billing_address_id'])->where('user_id', $user->id)->firstOrFail()
                : $shippingAddress;

            $quote = $this->quote($user);

            $order = Order::create([
                'order_number' => 'ORD-'.strtoupper(Str::random(10)),
                'user_id' => $user->id,
                'shipping_address_id' => $shippingAddress->id,
                'billing_address_id' => $billingAddress->id,
                'coupon_id' => $cart->coupon_id,
                'sub_total_amount' => $quote['sub_total'],
                'shipping_amount' => $quote['shipping'],
                'tax_amount' => $quote['tax'],
                'discount_amount' => $quote['discount'],
                'total_amount' => $quote['total'],
                'payment_status' => 'pending',
                'order_status' => 'pending',
            ]);

            $sellerOrderMap = [];

            foreach ($items->groupBy('seller_id') as $sellerId => $sellerItems) {
                $subtotal = round($sellerItems->sum(fn ($item) => $item->quantity * $item->price_at_add), 2);
                $seller = $sellerItems->first()->productVariant->product->seller;
                $commissionRate = $seller->commission_rate ?: (float) config('ecommerce.platform_commission_rate');
                $commission = round($subtotal * ($commissionRate / 100), 2);
                $payout = round($subtotal - $commission, 2);

                $sellerOrder = SellerOrder::create([
                    'order_id' => $order->id,
                    'seller_id' => $sellerId,
                    'subtotal' => $subtotal,
                    'commission_amount' => $commission,
                    'seller_payout_amount' => $payout,
                    'status' => 'pending',
                ]);

                $sellerOrderMap[$sellerId] = $sellerOrder;

                foreach ($sellerItems as $item) {
                    OrderItem::create([
                        'seller_order_id' => $sellerOrder->id,
                        'product_variant_id' => $item->product_variant_id,
                        'product_name_snapshot' => $item->productVariant->product->name,
                        'quantity' => $item->quantity,
                        'price' => $item->price_at_add,
                        'subtotal' => round($item->quantity * $item->price_at_add, 2),
                    ]);

                    $item->productVariant()->decrement('stock_qty', $item->quantity);
                }
            }

            $cart->items()->delete();
            $cart->update(['coupon_id' => null]);

            return $order->load('sellerOrders.items', 'payments');
        });
    }

    protected function loadCart(User $user): Cart
    {
        return Cart::query()->firstOrCreate(['user_id' => $user->id]);
    }

    protected function calculateDiscount(?Coupon $coupon, float $subTotal): float
    {
        if (! $coupon || ! $coupon->is_active) {
            return 0;
        }

        if ($coupon->expires_at && $coupon->expires_at->isPast()) {
            return 0;
        }

        if ($subTotal < (float) $coupon->min_order_amount) {
            return 0;
        }

        return match ($coupon->type) {
            'percentage' => round($subTotal * ((float) $coupon->value / 100), 2),
            default => min((float) $coupon->value, $subTotal),
        };
    }
}
