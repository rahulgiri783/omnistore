<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Coupon;
use App\Services\CheckoutService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function apply(Request $request, CheckoutService $checkoutService): JsonResponse
    {
        $data = $request->validate([
            'code' => ['required', 'string', 'max:100'],
        ]);

        $cart = Cart::query()->firstOrCreate(['user_id' => $request->user()->id]);
        $coupon = Coupon::query()->where('code', $data['code'])->firstOrFail();
        $cart->update(['coupon_id' => $coupon->id]);

        return response()->json([
            'message' => 'Coupon applied successfully.',
            'quote' => $checkoutService->quote($request->user()),
        ]);
    }

    public function remove(Request $request): JsonResponse
    {
        Cart::query()->firstOrCreate(['user_id' => $request->user()->id])->update(['coupon_id' => null]);

        return response()->json(['message' => 'Coupon removed.']);
    }
}
