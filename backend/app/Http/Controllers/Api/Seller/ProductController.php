<?php

namespace App\Http\Controllers\Api\Seller;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $seller = $request->user()->seller;

        return response()->json(
            Product::query()
                ->where('seller_id', $seller->id)
                ->with(['category', 'brand', 'variants', 'images'])
                ->latest()
                ->paginate(15)
        );
    }

    public function store(Request $request): JsonResponse
    {
        $seller = $request->user()->seller;

        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'brand_id' => ['nullable', 'exists:brands,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'base_price' => ['required', 'numeric', 'min:0'],
            'sku' => ['nullable', 'string', 'max:255', 'unique:products,sku'],
            'is_active' => ['boolean'],
        ]);

        $product = Product::create([
            ...$data,
            'seller_id' => $seller->id,
            'slug' => Str::slug($data['name']).'-'.Str::lower(Str::random(5)),
            'approval_status' => 'pending',
            'is_active' => $data['is_active'] ?? true,
        ]);

        return response()->json(['message' => 'Product created.', 'product' => $product], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $seller = $request->user()->seller;
        $product = Product::query()->where('seller_id', $seller->id)->whereKey($id)->firstOrFail();

        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'brand_id' => ['nullable', 'exists:brands,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'base_price' => ['sometimes', 'numeric', 'min:0'],
            'sku' => ['nullable', 'string', 'max:255', 'unique:products,sku,'.$product->id],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']).'-'.Str::lower(Str::random(5));
            $data['approval_status'] = 'pending';
        }

        $product->update($data);

        return response()->json(['message' => 'Product updated.', 'product' => $product->fresh()]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $seller = $request->user()->seller;
        Product::query()->where('seller_id', $seller->id)->whereKey($id)->delete();

        return response()->json(['message' => 'Product deleted.']);
    }
}
