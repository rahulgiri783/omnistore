<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            Wishlist::query()
                ->where('user_id', $request->user()->id)
                ->with(['product.images', 'product.brand'])
                ->latest()
                ->get()
        );
    }

    public function add(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
        ]);

        $wishlist = Wishlist::query()->firstOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $data['product_id'],
        ]);

        return response()->json([
            'message' => 'Added to wishlist.',
            'item' => $wishlist,
        ], 201);
    }

    public function remove(Request $request, int $productId): JsonResponse
    {
        Wishlist::query()
            ->where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->delete();

        return response()->json(['message' => 'Removed from wishlist.']);
    }
}
