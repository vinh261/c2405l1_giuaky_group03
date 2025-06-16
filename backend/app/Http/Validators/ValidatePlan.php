<?php

namespace App\Http\Validators;

use Illuminate\Http\Request;

class ValidatePlan
{
    public static function validatePlan(Request $request)
    {
        return $request->validate([
            'plan_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date'
        ]);
    }

    public static function validateAddMeal(Request $request)
    {
        return $request->validate([
            'meal_id' => 'required|exists:meals,meal_id',
            'day' => 'required|date_format:Y-m-d',
            'time' => 'required|in:breakfast,lunch,dinner,snack'
        ]);
    }

    public static function validateGetMeal(Request $request)
    {
        return $request->validate([
            'start_date' => 'required|date_format:Y-m-d',
            'end_date' => 'required|date_format:Y-m-d|after_or_equal:start_date'
        ]);
    }
}
?>
