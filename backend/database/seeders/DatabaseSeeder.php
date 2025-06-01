<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Các seeder khác nếu có…

        // Gọi đến UserSeeder để chèn tài khoản admin và user
        $this->call(UserSeeder::class);
    }
}
