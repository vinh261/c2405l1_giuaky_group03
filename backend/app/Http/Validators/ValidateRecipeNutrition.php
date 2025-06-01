<?php

namespace App\Http\Validators;

use Illuminate\Http\Request;

class ValidateRecipeNutrition
{
    public static function validateRecipe(Request $request, $isUpdate = false)
    {
        return $request->validate([
            'cuisine_type' => $isUpdate
                            ? 'sometimes|string|min:2|max:50'
                            : 'required|string|min:2|max:50',
            'desc_step' => $isUpdate
                            ? 'sometimes|string'
                            : 'required|string',
            'cook_time' => $isUpdate
                            ? 'sometimes|string'
                            : 'required|string',
        ]);
    }

    public static function validateNutrition(Request $request, $isUpdate = false)
    {
        return $request->validate([
            'nutrition.protein' => $isUpdate
                                ? 'sometimes|numeric|min:0'
                                : 'required|numeric|min:0',
            'nutrition.fat' => $isUpdate
                                ? 'sometimes|numeric|min:0'
                                : 'required|numeric|min:0',
            'nutrition.carbohydrate' => $isUpdate
                                ? 'sometimes|numeric|min:0'
                                : 'required|numeric|min:0',
            'nutrition.calories' => $isUpdate
                                ? 'sometimes|numeric|min:0'
                                : 'required|numeric|min:0',
        ]);
    }

    /**
     * ingredient.*: áp dụng xác thực cho tất cả phần tử trong mảng
     */
    public static function validateIngredient(Request $request, $isUpdate = false)
    {
        return $request->validate([
            'ingredient' => $isUpdate
                        ? 'sometimes|array|min:1'
                        : 'required|array|min:1',
            'ingredient.*.ingredient_id' => 'required|integer|exists:ingredients,id',
            'ingredient.*.quantity' => 'required|numeric|min:0',
            'ingredient.*.units' => 'required|string|in:kg,g,ml,l',
        ]);
    }
}
?>
