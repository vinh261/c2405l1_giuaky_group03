<?php

namespace App\Http\Controllers;

use App\Http\Validators\ValidateUser;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Chi tiết user
     */
    public function show($id)
    {
        try {
            $user = Auth::user();
            return response()->json($user);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không thể load thông tin tài khoản.',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Edit user.
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();

            /**
             * (isset($data['password']))
             * ? data['password'] = new password + hash.
             * : data['password'] = old password.
             * password_confirmation luôn đc xóa vì chỉ cần thiết cho xác thực password.
             */
            $data = $request->only(['email', 'password']);
            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }
            unset($data['password_confirmation']);

            /**
             * Cập nhật user.
             * @var \App\Models\User $user
             */
            $user->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật thành công.',
                'user' => $user
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi cập nhật.',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}
