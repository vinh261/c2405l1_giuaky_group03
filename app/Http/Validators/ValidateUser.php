<?php

namespace App\Http\Validators;

use Illuminate\Http\Request;

class ValidateUser
{
    /**
     * Validate user data
     */
    public static function validateUserData(Request $request, $isUpdate = false)
    {
        return $request->validate([
            'user_id' => 'string|unique:users,user_id',
            'email' => $isUpdate
                        ? 'required|string|email|max:50|unique:users,email'
                        : 'sometimes|string|email|max:50|unique:users,email',
            'password' => $isUpdate
                        ? 'required|string|min:8|max:80'
                        : 'sometimes|string|min:8|max:80',
        ]);
    }

    /**
     * Validate address data
     */
    public static function addressData(Request $request)
    {
        $address = $request->validate([
            'country' => 'sometimes|string|min:2|max:50',
            'city' => 'sometimes|string|min:2|max:50',
            'district' => 'sometimes|string|min:2|max:50',
            'ward' => 'sometimes|string|min:2|max:50',
        ]);

        $mergeAddress = [];

        // Thêm có điều kiện để tránh các giá trị null hoặc rỗng không cần thiết
        // Thêm theo thứ tự từ nhỏ đến lớn (Phường -> Quận -> Thành phố -> Quốc gia)
        if (!empty($address['ward'])) {
            $mergeAddress[] = $address['ward'];
        }
        if (!empty($address['district'])) {
            $mergeAddress[] = $address['district'];
        }
        if (!empty($address['city'])) {
            $mergeAddress[] = $address['city'];
        }
        if (!empty($address['country'])) {
            $mergeAddress[] = $address['country'];
        }
        $fullAddress = implode(', ', $mergeAddress);
        return $fullAddress;
    }

    /**
     * Validate profile user data
     */
    public static function validateProfileUser(Request $request, $isUpdate = false)
    {
        return $request->validate([
            'user_name' => $isUpdate
                        ? 'required|string|min:2|max:50'
                        : 'sometimes|string|min:2|max:50',
            'phone' => $isUpdate
                        ? 'required|string|min:10|max:10'
                        : 'sometimes|string|min:10|max:10',
            'dob' => $isUpdate
                        ? 'required|date|before_or_equal:'. now()->subYears(1)->format('Y-m-d') . '|after_or_equal:' . now()->subYears(100)->format('Y-m-d')
                        : 'sometimes|date|before_or_equal:'. now()->subYears(1)->format('Y-m-d') . '|after_or_equal:' . now()->subYears(100)->format('Y-m-d'),
            'job' => $isUpdate
                        ? 'required|string|min:2|max:50'
                        : 'sometimes|string|min:2|max:50',
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

            'address' => 'sometimes|string|min:6|max:100',
            'role' => 'sometimes|string|in:admin,user',
        ]);
    }
}
?>
