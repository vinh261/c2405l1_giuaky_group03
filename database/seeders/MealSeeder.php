<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Meal;
use App\Models\Recipe;

class MealSeeder extends Seeder
{
    public function run(): void
    {
        $recipe = Recipe::first(); // ← Đảm bảo có ít nhất 1 recipe

        // Món 1
        Meal::firstOrCreate(
            ['meal_name' => 'Grilled Chicken Salad'],
            [
                'meal_id'     => (string) Str::uuid(),
                'slug'        => 'grilled-chicken-salad',
                'description' => 'Salad gà nướng kết hợp rau củ tươi mát.',
                'price'       => 120000,
                'diet_type'   => 'low-carb',
                'image'       => null,
                'recipe_id'   => $recipe ? $recipe->recipe_id : 'dummy',
            ]
        );

        // Món 2
        Meal::firstOrCreate(
            ['meal_name' => 'Tofu Stir Fry'],
            [
                'meal_id'     => (string) Str::uuid(),
                'slug'        => 'tofu-stir-fry',
                'description' => 'Đậu hũ xào rau củ kiểu chay.',
                'price'       => 95000,
                'diet_type'   => 'vegan',
                'image'       => null,
                'recipe_id'   => $recipe ? $recipe->recipe_id : 'dummy',
            ]
        );
    }
}
