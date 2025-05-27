<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    /**
     * __invoke: magic method, cho phép đối tượng của class này đc gọi như 1 hàm.
     * Dùng để xử lý 1 hành động duy nhất (single action controller).
     */
    public function __invoke(Request $request)
    {
        try {
            /**
            * Các trường bắt buộc khai báo trong request
            */
            $validated = $request->validate([
                'email' => 'required|string|email|max:50|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'password_confirmation' => 'required|string|min:8',
            ]);

            /**
            * Tạo user_id
            */
            $validated['user_id'] = User::generateUserId();

            /**
            * Hash password
            */
            $validated['password'] = Hash::make($validated['password']);

            /**
             * Xóa password_confirmation khỏi data trước khi tạo user
             */
            unset($validated['password_confirmation']);

            /**
            * Tạo người dùng
            */
            $user = User::create($validated);
            $user->profile()->create([
                'profile_id' => $user->user_id,
                'user_name' => $user->email, // Mặc định dùng email làm username
            ]);

            /**
            * Tạo token api dạng string (plainText)
            */
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'message' => 'Đăng ký thành công',
                'user' => [
                    'user_id' => $user->user_id,
                    'email' => $user->email,
                ],
                'token' => $token,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => "Đăng ký thất bại, vui lòng thử lại.",
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            // Lỗi khác:
            return response()->json([
                'message' => 'Có lỗi xảy ra trong quá trình đăng ký',
                'error' => $e->getMessage(), // Chỉ để debug, production nên bỏ
            ], 500);
        }
    }
}
