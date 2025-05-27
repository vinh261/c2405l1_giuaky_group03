<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
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
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            /**
            * Ktra $user, nếu user->email = null => return auth.failed
            * Hash::check : ktra password
            * User = null || password không khớp => throw auth.failed
            */
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => [trans('auth.failed')],
                ]);
            }

            // Lấy thông tin role từ bảng profile
            $profile = Profile::where('profile_id', $user->user_id)->first();

            /**
             * Tạo token api dạng string (plainText)
             */
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'message' => 'Đăng nhập thành công',
                'user' => [
                    'user_id' => $user->user_id,
                    'email' => $user->email,
                    'role' => $profile->role ?? 'user', // Trả về role từ bảng profile
                ],
                'token' => $token,
            ]);
        }catch (ValidationException $e) {
            return response()->json([
                'message' => 'Đăng nhập thất bại, vui lòng thử lại',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            // Lỗi khác:
            return response()->json([
                'message' => 'Có lỗi xảy ra trong quá trình đăng nhập, vui lòng liên hệ admin',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
