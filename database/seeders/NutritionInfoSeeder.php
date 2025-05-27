<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NutritionInfo;
use App\Models\Recipe;

class NutritionInfoSeeder extends Seeder
{
    public function run(): void
    {
        // Lấy một recipe bất kỳ
        $recipe = Recipe::first();
        if (! $recipe) return;

        NutritionInfo::updateOrCreate(
            ['recipe_id' => $recipe->recipe_id],
            [
                'calories' => 350,
                'protein'  => 25,
                // ... các giá trị khác nếu có
            ]
        );
    }
}
