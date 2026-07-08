<?php

require __DIR__.'/vendor/autoload.php';

$app = require __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = App\Models\User::where('email', 'admin@omnistore.local')->first();

if ($user && Illuminate\Support\Facades\Hash::check('Admin@12345', $user->password) && $user->hasRole('admin')) {
    echo "admin-ok";
    exit(0);
}

echo "admin-bad";
exit(1);
