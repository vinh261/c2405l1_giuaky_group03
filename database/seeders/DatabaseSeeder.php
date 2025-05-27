<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1) Tạo user test
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'user_id'           => (string) Str::uuid(),
                'user_name'         => 'Test User',
                'phone'             => '0123456789',
                'email_verified_at' => now(),
                'password'          => Hash::make('password'),
                'dob'               => '1990-01-01',
                'height'            => 1.70,
                'weight'            => 65.00,
                'address'           => '123 Đường ABC, Quận XYZ',
                'note'              => 'Tài khoản test',
            ]
        );

        // 2) Gọi CategorySeeder
        $this->call(CategorySeeder::class);

        // 3) Gọi RecipeSeeder
        $this->call(RecipeSeeder::class);

        // (nếu còn seeder khác, cũng gọi ở đây)
        // 4) Gọi IngredientSeeder
        $this->call(IngredientSeeder::class);

        // 5) Gọi MealPlanSeeder
        $this->call(MealPlanSeeder::class);
        // 6) Gọi favorite seeder nếu có
        $this->call(FavoriteSeeder::class);
        // 7) Gọi MealSeeder nếu có
        $this->call(MealSeeder::class);
        // 8) Gọi recommend seeder nếu có
        $this->call(RecommendSeeder::class);
        // 9) Gọi nutrition info seeder nếu có
        $this->call(NutritionInfoSeeder::class);
        // 10) Gọi plan meal menu seeder nếu có
        $this->call(PlanMealMenuSeeder::class);
    }
}
