<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Customer',
                'slug' => 'customer',
                'description' => 'Regular customer who can browse and purchase products',
            ],
            [
                'name' => 'Seller',
                'slug' => 'seller',
                'description' => 'Seller who can manage their store and products',
            ],
            [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Administrator who manages the entire platform',
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['slug' => $role['slug']],
                $role
            );
        }
    }
}
