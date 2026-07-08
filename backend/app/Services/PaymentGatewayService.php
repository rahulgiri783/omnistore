<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class PaymentGatewayService
{
    public function createIntent(Order $order, string $gateway = null): array
    {
        $gateway ??= config('ecommerce.default_payment_gateway');

        $payment = Payment::create([
            'order_id' => $order->id,
            'gateway' => $gateway,
            'amount' => $order->total_amount,
            'status' => 'pending',
            'raw_response_json' => [
                'intent_id' => (string) Str::uuid(),
                'gateway' => $gateway,
            ],
        ]);

        return [
            'payment' => $payment,
            'client_secret' => Arr::get($payment->raw_response_json, 'intent_id'),
        ];
    }

    public function verify(array $payload): array
    {
        return [
            'verified' => true,
            'payload' => $payload,
        ];
    }
}
