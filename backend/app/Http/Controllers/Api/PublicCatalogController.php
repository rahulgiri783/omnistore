<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\Seller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicCatalogController extends Controller
{
    public function categories(): JsonResponse
    {
        return response()->json(Category::query()->where('is_active', true)->with('children')->orderBy('name')->get());
    }

    public function category(string $slug): JsonResponse
    {
        return response()->json(Category::query()->where('slug', $slug)->with('children')->firstOrFail());
    }

    public function categoryProducts(string $slug): JsonResponse
    {
        $category = Category::query()->where('slug', $slug)->firstOrFail();

        return response()->json(
            Product::query()
                ->where('category_id', $category->id)
                ->where('approval_status', 'approved')
                ->where('is_active', true)
                ->with(['seller', 'brand', 'images', 'variants'])
                ->paginate(12)
        );
    }

    public function products(Request $request): JsonResponse
    {
        $query = Product::query()
            ->where('approval_status', 'approved')
            ->where('is_active', true)
            ->with(['seller', 'brand', 'images', 'variants']);

        if ($search = $request->string('q')->trim()->toString()) {
            $query->where(function ($builder) use ($search) {
                $builder->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($categoryId = $request->integer('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($brandId = $request->integer('brand_id')) {
            $query->where('brand_id', $brandId);
        }

        return response()->json($query->latest()->paginate(12));
    }

    public function product(string $slug): JsonResponse
    {
        return response()->json(
            Product::query()
                ->where('slug', $slug)
                ->with(['seller.user', 'category', 'brand', 'images', 'variants', 'reviews.user'])
                ->firstOrFail()
        );
    }

    public function search(Request $request): JsonResponse
    {
        return $this->products($request);
    }

    public function related(int $id): JsonResponse
    {
        $product = Product::query()->with('category', 'brand')->findOrFail($id);

        return response()->json(
            Product::query()
                ->where('id', '!=', $product->id)
                ->where('approval_status', 'approved')
                ->where('is_active', true)
                ->where(function ($builder) use ($product) {
                    if ($product->category_id) {
                        $builder->where('category_id', $product->category_id);
                    }

                    if ($product->brand_id) {
                        $builder->orWhere('brand_id', $product->brand_id);
                    }
                })
                ->with(['seller', 'images', 'variants'])
                ->limit(8)
                ->get()
        );
    }

    public function reviews(int $id): JsonResponse
    {
        return response()->json(
            ProductReview::query()
                ->where('product_id', $id)
                ->with('user')
                ->latest()
                ->paginate(10)
        );
    }

    public function seller(string $slug): JsonResponse
    {
        return response()->json(
            Seller::query()
                ->where('store_slug', $slug)
                ->with('user')
                ->firstOrFail()
        );
    }

    public function sellerProducts(string $slug): JsonResponse
    {
        $seller = Seller::query()->where('store_slug', $slug)->firstOrFail();

        return response()->json(
            Product::query()
                ->where('seller_id', $seller->id)
                ->where('approval_status', 'approved')
                ->where('is_active', true)
                ->with(['brand', 'images', 'variants'])
                ->paginate(12)
        );
    }

    public function banners(): JsonResponse
    {
        return response()->json(Banner::query()->where('is_active', true)->orderBy('position')->get());
    }

    public function deals(): JsonResponse
    {
        return response()->json([
            'coupons' => Coupon::query()->where('is_active', true)->where(fn ($q) => $q->whereNull('expires_at')->orWhere('expires_at', '>', now()))->get(),
            'featured_products' => Product::query()
                ->where('approval_status', 'approved')
                ->where('is_active', true)
                ->with(['seller', 'brand', 'images'])
                ->latest()
                ->limit(12)
                ->get(),
        ]);
    }
}
