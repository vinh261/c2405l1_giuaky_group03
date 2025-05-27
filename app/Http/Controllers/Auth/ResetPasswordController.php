<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class ResetPasswordController extends Controller
{
    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $reset = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->password = Hash::make($password);
                    $user->save();
                    $user->tokens()->delete();
                }
            );

            if ($reset === Password::PASSWORD_RESET) {
                return response()->json([
                    'message' => 'Mật khẩu được đặt lại thành công.',
                ], 200);
            }

            $message = match ($reset) {
                Password::INVALID_TOKEN => 'Token không hợp lệ hoặc đã hết hạn.',
                Password::INVALID_USER => 'Không tìm thấy người dùng với email này.',
                default => 'Không thể đặt lại mật khẩu, vui lòng thử lại.',
            };

            return response()->json([
                'message' => $message,
            ], 400);
        }catch (ValidationException $e) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            // Lỗi khác:
            return response()->json([
                'message' => 'Không thể đặt lại mật khẩu, vui lòng thử lại sau.',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}
