<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\ProductReview;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, int $productId): JsonResponse
    {
        $data = $request->validate([
            'order_item_id' => ['nullable', 'exists:order_items,id'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string'],
        ]);

        $verified = false;

        if (! empty($data['order_item_id'])) {
            $verified = OrderItem::query()
                ->whereKey($data['order_item_id'])
                ->whereHas('sellerOrder.order', fn ($q) => $q->where('user_id', $request->user()->id))
                ->exists();
        }

        $review = ProductReview::create([
            'product_id' => $productId,
            'user_id' => $request->user()->id,
            'order_item_id' => $data['order_item_id'] ?? null,
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
            'is_verified_purchase' => $verified,
        ]);

        return response()->json(['message' => 'Review submitted.', 'review' => $review], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $review = ProductReview::query()->where('user_id', $request->user()->id)->findOrFail($id);
        $data = $request->validate([
            'rating' => ['sometimes', 'integer', 'min:1', 'max:5'],
            'comment' => ['sometimes', 'nullable', 'string'],
        ]);

        $review->update($data);

        return response()->json(['message' => 'Review updated.', 'review' => $review->fresh()]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        ProductReview::query()->where('user_id', $request->user()->id)->whereKey($id)->delete();

        return response()->json(['message' => 'Review deleted.']);
    }
}
