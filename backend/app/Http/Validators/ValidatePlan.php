<?php

namespace App\Http\Validators;

use Illuminate\Http\Request;

class ValidatePlan
{
    public static function validatePlan(Request $request, $isUpdate = false)
    {
        return $request->validate([
            'plan_name' => $isUpdate
                        ? 'sometimes|string|min:2|max:50'
                        : 'required|string|min:2|max:50|unique:plan_name',
            'time' => $isUpdate
                        ? 'sometimes|string|in:breakfast,lunch,dinner'
                        : 'required|string|in:breakfast,lunch,dinner',
            'start_date' => $isUpdate
                        ? 'sometimes|date'
                        : 'required|date',
            'end_date' => $isUpdate
                        ? 'sometimes|date'
                        : 'required|date',
        ]);
    }
}
?>
