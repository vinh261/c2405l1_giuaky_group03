<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ingredient;

class IngredientSeeder extends Seeder
{
    public function run(): void
    {
        Ingredient::firstOrCreate(
          ['ingredient_name' => 'Chicken Breast'],
          ['unit' => 'g']
        );

        Ingredient::firstOrCreate(
          ['ingredient_name' => 'Broccoli'],
          ['unit' => 'g']
        );
    }
}
