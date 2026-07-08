<?php

namespace App\Http\Controllers\Api\Seller;

use App\Http\Controllers\Controller;
use App\Models\OrderStatusHistory;
use App\Models\SellerOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $seller = $request->user()->seller;

        return response()->json(
            SellerOrder::query()
                ->where('seller_id', $seller->id)
                ->with(['order.user', 'items'])
                ->latest()
                ->paginate(15)
        );
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $seller = $request->user()->seller;

        return response()->json(
            SellerOrder::query()
                ->where('seller_id', $seller->id)
                ->with(['order.user', 'items', 'statusHistory.changer'])
                ->findOrFail($id)
        );
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $seller = $request->user()->seller;
        $sellerOrder = SellerOrder::query()->where('seller_id', $seller->id)->findOrFail($id);

        $data = $request->validate([
            'status' => ['required', 'in:pending,processing,shipped,delivered,cancelled,returned'],
            'note' => ['nullable', 'string'],
        ]);

        $sellerOrder->update(['status' => $data['status']]);

        OrderStatusHistory::create([
            'seller_order_id' => $sellerOrder->id,
            'status' => $data['status'],
            'note' => $data['note'] ?? null,
            'changed_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Seller order status updated.',
            'seller_order' => $sellerOrder->fresh('statusHistory'),
        ]);
    }
}
