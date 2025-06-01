<?php

namespace App\Http\Validators;

use Illuminate\Http\Request;

class ValidateMeal
{
    public static function validateMeal(Request $request, $isUpdate = false)
    {
        return $request->validate([
            'meal_name' => $isUpdate
                        ? 'sometimes|string|min:2|max:50'
                        : 'required|string|min:2|max:50',
            'diet_type' => $isUpdate
                        ? 'sometimes|string|min:2|max:50'
                        : 'required|string|min:2|max:50',
            'meal_description' => $isUpdate
                        ? 'sometimes|string|min:2|max:100'
                        : 'required|string|min:2|max:100',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    }
}
?>
