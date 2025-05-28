<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use Database\Seeders\CategorySeeder;
use Database\Seeders\RecipeSeeder;
use Database\Seeders\IngredientSeeder;
use Database\Seeders\MealPlanSeeder;
use Database\Seeders\FavoriteSeeder;
use Database\Seeders\MealSeeder;
use Database\Seeders\RecommendSeeder;
use Database\Seeders\NutritionInfoSeeder;
use Database\Seeders\PlanMealMenuSeeder;

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

        // 2) Gọi các seeder theo đúng thứ tự:
        $this->call([
            CategorySeeder::class,
            RecipeSeeder::class,
            IngredientSeeder::class,
            MealPlanSeeder::class,
            FavoriteSeeder::class,
            MealSeeder::class,
            RecommendSeeder::class,
            NutritionInfoSeeder::class,
            PlanMealMenuSeeder::class,
        ]);
    }
}
