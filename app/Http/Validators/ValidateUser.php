<?php

namespace App\Http\Validators;

use Illuminate\Http\Request;

class ValidateUser
{
    public static function validateUserData(Request $request, $isUpdate = false)
    {
        return $request->validate([
            'email' => $isUpdate
                        ? 'required|string|email|max:50|unique:users,email'
                        : 'sometimes|string|email|max:50|unique:users,email',
            'password' => $isUpdate
                        ? 'required|string|min:8|max:80|confirmed'
                        : 'sometimes|string|min:8|max:80|confirmed',
            'password_confirmation' => $isUpdate
                        ? 'required|string|min:8|max:80'
                        : 'sometimes|string|min:8|max:80',
        ]);
    }

    public static function validateProfileUser(Request $request, $isUpdate = false)
    {
        return $request->validate([
            'user_name' => $isUpdate
                        ? 'required|string|min:2|max:50'
                        : 'sometimes|string|min:2|max:50',
            'phone' => $isUpdate
                        ? 'required|string|min:10|max:10'
                        : 'sometimes|string|min:10|max:10',
            'address' => $isUpdate
                        ? 'required|string|min:10|max:100'
                        : 'sometimes|string|min:10|max:100',
            'dob' => $isUpdate
                        ? 'required|date'
                        : 'sometimes|date',
            'gender' => $isUpdate
                        ? 'required|string|in:male,female,other'
                        : 'sometimes|string|in:male,female,other',
            'height' => $isUpdate
                        ? 'required|numeric'
                        : 'sometimes|numeric',
            'weight' => $isUpdate
                        ? 'required|numeric'
                        : 'sometimes|numeric',
            'note' => $isUpdate
                        ? 'required|string|min:6|max:200'
                        : 'sometimes|string|min:6|max:200',
            'role' => $isUpdate
                        ? 'required|string|in:admin,user'
                        : 'sometimes|string|in:admin,user',
        ]);
    }
}
?>
