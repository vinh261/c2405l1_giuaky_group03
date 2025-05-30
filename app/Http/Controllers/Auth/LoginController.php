<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * __invoke: magic method, cho phép đối tượng của class này đc gọi như 1 hàm.
     * Dùng để xử lý 1 hành động duy nhất (single action controller).
     */
    public function __invoke(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            /**
             * Sử dụng Auth::attempt để xác thực người dùng, tự động hash password.
             * Nếu thành công, sẽ trả về true và lưu thông tin user vào session.
             * Nếu không thành công, trả về 401.
             */
            if (!Auth::guard('web')->attempt($credentials)) {
                return response()->json([
                    'message' => 'Đăng nhập thất bại, thông tin đăng nhập không chính xác',
                ], 401);
            }

            /**
             * Đăng nhập thành công! Tái tạo session ID để tăng bảo mật.
             */
            $request->session()->regenerate();

            /**
             * Lấy thông tin user và profile.
             */
            $user = Auth::user();
            $profile = $user->profile;

            return response()->json([
                'message' => 'Đăng nhập thành công',
                'user' => [
                    'user_id' => $user->user_id,
                    'email' => $user->email,
                    'role' => $profile->role ?? 'user', // Trả về role từ bảng profile
                ],
            ]);
        }catch (ValidationException $e) {
            return response()->json([
                'message' => 'Đăng nhập thất bại, vui lòng thử lại',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra trong quá trình đăng nhập, vui lòng liên hệ admin',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
