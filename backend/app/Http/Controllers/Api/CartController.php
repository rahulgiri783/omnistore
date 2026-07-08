<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductVariant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $cart = Cart::query()
            ->firstOrCreate(['user_id' => $request->user()->id])
            ->load(['coupon', 'items.productVariant.product.images', 'items.productVariant.product.seller']);

        return response()->json($cart);
    }

    public function add(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_variant_id' => ['required', 'exists:product_variants,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $variant = ProductVariant::query()->with('product.seller')->findOrFail($data['product_variant_id']);
        $cart = Cart::query()->firstOrCreate(['user_id' => $request->user()->id]);

        $item = CartItem::query()->updateOrCreate(
            [
                'cart_id' => $cart->id,
                'product_variant_id' => $variant->id,
            ],
            [
                'seller_id' => $variant->product->seller_id,
                'quantity' => ($cart->items()->where('product_variant_id', $variant->id)->value('quantity') ?? 0) + $data['quantity'],
                'price_at_add' => $variant->price,
            ]
        );

        return response()->json([
            'message' => 'Item added to cart.',
            'item' => $item,
            'cart' => $cart->load('items'),
        ], 201);
    }

    public function update(Request $request, int $itemId): JsonResponse
    {
        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $item = CartItem::query()
            ->whereKey($itemId)
            ->whereHas('cart', fn ($q) => $q->where('user_id', $request->user()->id))
            ->firstOrFail();

        $item->update(['quantity' => $data['quantity']]);

        return response()->json([
            'message' => 'Cart item updated.',
            'item' => $item->fresh(),
        ]);
    }

    public function remove(Request $request, int $itemId): JsonResponse
    {
        $item = CartItem::query()
            ->whereKey($itemId)
            ->whereHas('cart', fn ($q) => $q->where('user_id', $request->user()->id))
            ->firstOrFail();

        $item->delete();

        return response()->json(['message' => 'Cart item removed.']);
    }

    public function clear(Request $request): JsonResponse
    {
        $cart = Cart::query()->firstOrCreate(['user_id' => $request->user()->id]);
        $cart->items()->delete();
        $cart->update(['coupon_id' => null]);

        return response()->json(['message' => 'Cart cleared.']);
    }
}
