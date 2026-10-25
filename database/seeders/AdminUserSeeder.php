<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Membuat akun Administrator pertama yang aman
     */
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@shopeepicks.com'],
            [
                'name'              => 'Chief Curator & Admin',
                'password'          => Hash::make('AdminShopee2026!'), // Silakan ubah password ini sesuai kebutuhan
                'is_admin'          => true,
                'email_verified_at' => now(),
            ]
        );

        $this->command->info("Akun Super Admin berhasil dibuat!");
        $this->command->table(['Field', 'Value'], [
            ['Email', $admin->email],
            ['Password', 'AdminShopee2026!'],
            ['Status is_admin', $admin->is_admin ? 'TRUE (Active)' : 'FALSE'],
        ]);
    }
}