<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\CheckoutService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request, CheckoutService $checkoutService): JsonResponse
    {
        $data = $request->validate([
            'shipping_address_id' => ['nullable', 'exists:addresses,id'],
            'billing_address_id' => ['nullable', 'exists:addresses,id'],
        ]);

        $order = $checkoutService->placeOrder($request->user(), $data);

        return response()->json([
            'message' => 'Order created successfully.',
            'order' => $order,
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        return response()->json(
            Order::query()
                ->where('user_id', $request->user()->id)
                ->with('sellerOrders.items', 'payments')
                ->latest()
                ->paginate(10)
        );
    }

    public function show(Request $request, int $id): JsonResponse
    {
        return response()->json(
            Order::query()
                ->where('user_id', $request->user()->id)
                ->with(['sellerOrders.items', 'sellerOrders.statusHistory', 'payments', 'shippingAddress', 'billingAddress', 'coupon'])
                ->findOrFail($id)
        );
    }

    public function cancel(Request $request, int $id): JsonResponse
    {
        $order = Order::query()->where('user_id', $request->user()->id)->findOrFail($id);

        if (! in_array($order->order_status, ['pending', 'processing'], true)) {
            return response()->json(['message' => 'Order cannot be cancelled.'], 422);
        }

        $order->update(['order_status' => 'cancelled']);
        $order->sellerOrders()->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Order cancelled successfully.']);
    }
}
