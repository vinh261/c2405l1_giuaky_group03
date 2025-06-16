<?php

namespace App\Http\Validators;

use Illuminate\Http\Request;

class ValidateMeal
{
    public static function validateMeal(Request $request)
    {
        return $request->validate([
            'meal_name' => 'required|string|max:255',
            'desc' => 'required|string',
            'image' => 'nullable|url',
            'category' => 'required|string|in:breakfast,lunch,dinner,snacks,smoothies',
            'diet_type' => 'required|array',
            'diet_type.*' => 'string',

            // Recipe validation
            'recipe.cuisine_type' => 'required|string',
            'recipe.desc_step' => 'required|string',
            'recipe.cook_time' => 'required|integer|min:1',
            'recipe.serve' => 'required|integer|min:1',

            // Nutrition validation
            'nutrition.calories' => 'required|numeric|min:0',
            'nutrition.protein' => 'required|numeric|min:0',
            'nutrition.carbohydrate' => 'required|numeric|min:0',
            'nutrition.fat' => 'required|numeric|min:0',

            // Ingredients validation
            'ingredients' => 'required|array|min:1',
            'ingredients.*.ingredient_name' => 'required|string',
            'ingredients.*.quantity' => 'required|numeric|min:0',
            'ingredients.*.units' => 'required|string',
        ]);
    }
}
?>
