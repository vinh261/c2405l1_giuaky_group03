<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // --- 1) Tạo một admin ---
        $admin = User::create([
            'user_id'           => User::generateUserId(),
            'email'             => 'admin@example.com',
            'password'          => Hash::make('AdminPass123!'),
            'email_verified_at' => now(),
        ]);
        // Gán profile với role = 'admin'
        $admin->profile()->create([
            'profile_id' => $admin->user_id,
            'user_name'  => 'Administrator',
            'role'       => 'admin',
        ]);

        // --- 2) Tạo 5 user thường ---
        for ($i = 1; $i <= 5; $i++) {
            $user = User::create([
                'user_id'           => User::generateUserId(),
                'email'             => "user{$i}@example.com",
                'password'          => Hash::make("UserPass{$i}"),
                'email_verified_at' => now(),
            ]);
            // Gán profile với role = 'user'
            $user->profile()->create([
                'profile_id' => $user->user_id,
                'user_name'  => "User{$i}",
                'role'       => 'user',
            ]);
        }

        // --- 3) (Tùy chọn) Tạo thêm 2 admin nữa ---
        for ($j = 2; $j <= 3; $j++) {
            $a = User::create([
                'user_id'           => User::generateUserId(),
                'email'             => "admin{$j}@example.com",
                'password'          => Hash::make("AdminPass{$j}!"),
                'email_verified_at' => now(),
            ]);
            $a->profile()->create([
                'profile_id' => $a->user_id,
                'user_name'  => "Admin{$j}",
                'role'       => 'admin',
            ]);
        }
    }
}
