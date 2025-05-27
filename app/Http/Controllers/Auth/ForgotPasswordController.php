<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class ForgotPasswordController extends Controller
{
    public function sendResetEmail(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
            ]);

            /**
             * Send email reset password
             */
            $sendEmail = Password::sendResetLink(
                $request->only('email')
            );

            if ($sendEmail === Password::RESET_LINK_SENT) {
                return response()->json([
                    'message' => 'Email reset password vừa được gửi, vui lòng kiểm tra.',
                ]);
            }

            return response()->json([
                'message' => 'Không tìm thấy người dùng, vui lòng thử lại',
            ], 404);
        }catch (Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra trong quá trình đặt lại mật khẩu, vui lòng liên hệ admin',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
