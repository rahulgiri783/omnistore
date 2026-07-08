<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Services\PaymentGatewayService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function createIntent(Request $request, PaymentGatewayService $paymentGatewayService): JsonResponse
    {
        $data = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'gateway' => ['nullable', 'in:'.implode(',', array_keys(config('ecommerce.payment_gateways')))],
        ]);

        $order = Order::query()->where('user_id', $request->user()->id)->findOrFail($data['order_id']);

        return response()->json($paymentGatewayService->createIntent($order, $data['gateway'] ?? null));
    }

    public function verify(Request $request, PaymentGatewayService $paymentGatewayService): JsonResponse
    {
        $data = $request->validate([
            'order_id' => ['required', 'exists:orders,id'],
            'gateway_payment_id' => ['required', 'string'],
            'status' => ['required', 'string'],
            'gateway' => ['nullable', 'string'],
            'raw_response_json' => ['nullable', 'array'],
        ]);

        $order = Order::query()->where('user_id', $request->user()->id)->findOrFail($data['order_id']);
        $verified = $paymentGatewayService->verify($data);

        $payment = Payment::query()->updateOrCreate(
            [
                'order_id' => $order->id,
                'gateway_payment_id' => $data['gateway_payment_id'],
            ],
            [
                'gateway' => $data['gateway'] ?? config('ecommerce.default_payment_gateway'),
                'amount' => $order->total_amount,
                'status' => $data['status'],
                'raw_response_json' => $data['raw_response_json'] ?? $verified,
            ]
        );

        if (in_array($data['status'], ['paid', 'succeeded', 'success'], true)) {
            $order->update(['payment_status' => 'paid']);
        } elseif (in_array($data['status'], ['failed', 'cancelled'], true)) {
            $order->update(['payment_status' => 'failed']);
        }

        return response()->json([
            'message' => 'Payment verified.',
            'payment' => $payment->fresh(),
            'order' => $order->fresh(),
        ]);
    }
}
