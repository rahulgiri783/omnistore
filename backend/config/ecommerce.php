<?php

return [
    'currency' => env('ECOMMERCE_CURRENCY', 'INR'),
    'tax_rate' => (float) env('ECOMMERCE_TAX_RATE', 0),
    'platform_commission_rate' => (float) env('ECOMMERCE_PLATFORM_COMMISSION_RATE', 10),
    'default_shipping_fee' => (float) env('ECOMMERCE_DEFAULT_SHIPPING_FEE', 0),
    'free_shipping_threshold' => (float) env('ECOMMERCE_FREE_SHIPPING_THRESHOLD', 0),
    'default_payment_gateway' => env('ECOMMERCE_DEFAULT_PAYMENT_GATEWAY', 'stripe'),
    'payment_gateways' => [
        'stripe' => [
            'secret' => env('STRIPE_SECRET'),
            'key' => env('STRIPE_KEY'),
            'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
        ],
        'razorpay' => [
            'key_id' => env('RAZORPAY_KEY_ID'),
            'key_secret' => env('RAZORPAY_KEY_SECRET'),
            'webhook_secret' => env('RAZORPAY_WEBHOOK_SECRET'),
        ],
    ],
];
