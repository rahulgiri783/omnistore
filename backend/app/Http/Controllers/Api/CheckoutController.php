<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CheckoutService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function preview(Request $request, CheckoutService $checkoutService): JsonResponse
    {
        return response()->json($checkoutService->quote($request->user()));
    }
}
