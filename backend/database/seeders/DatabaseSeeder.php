<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach (['customer', 'seller', 'admin'] as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        $adminEmail = env('ADMIN_EMAIL');
        $adminPassword = env('ADMIN_PASSWORD');

        if ($adminEmail && $adminPassword) {
            $admin = User::firstOrCreate(
                ['email' => $adminEmail],
                [
                    'name' => 'Admin',
                    'phone' => null,
                    'password' => Hash::make($adminPassword),
                    'role' => 'admin',
                    'status' => 'active',
                ]
            );

            $admin->syncRoles(['admin']);
        }
    }
}
