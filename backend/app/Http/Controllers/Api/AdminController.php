<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CommissionSetting;

use App\Models\Seller;
use App\Models\Product;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminController extends Controller
{


    public function pendingSellers(): JsonResponse
    {
        return response()->json(
            Seller::query()->with('user')->where('kyc_status', 'pending')->latest()->get()
        );
    }



    public function approveSeller(int $id): JsonResponse
    {
        $seller = Seller::findOrFail($id);
        $seller->update(['kyc_status' => 'approved']);
        $seller->user()->update(['status' => 'active']);

        return response()->json(['message' => 'Seller approved.', 'seller' => $seller->fresh('user')]);
    }

    public function rejectSeller(int $id): JsonResponse
    {
        $seller = Seller::findOrFail($id);
        $seller->update(['kyc_status' => 'rejected']);
        $seller->user()->update(['status' => 'rejected']);

        return response()->json(['message' => 'Seller rejected.', 'seller' => $seller->fresh('user')]);
    }

    public function categoryStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'parent_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        $category = Category::create([
            ...$data,
            'slug' => Str::slug($data['name']).'-'.Str::lower(Str::random(5)),
            'is_active' => $data['is_active'] ?? true,
        ]);

        return response()->json(['message' => 'Category created.', 'category' => $category], 201);
    }



    public function productApprove(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->update(['approval_status' => 'approved']);

        return response()->json(['message' => 'Product approved.', 'product' => $product->fresh()]);
    }

    public function productReject(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->update(['approval_status' => 'rejected']);

        return response()->json(['message' => 'Product rejected.', 'product' => $product->fresh()]);
    }



    public function commissionIndex(): JsonResponse
    {
        return response()->json(CommissionSetting::query()->latest()->get());
    }

    public function commissionStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'key' => ['required', 'string', 'max:255', 'unique:commission_settings,key'],
            'value' => ['required', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        $setting = CommissionSetting::create([
            ...$data,
            'is_active' => $data['is_active'] ?? true,
        ]);

        return response()->json(['message' => 'Commission setting saved.', 'setting' => $setting], 201);
    }

}
