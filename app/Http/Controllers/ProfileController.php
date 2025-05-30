<?php

namespace App\Http\Controllers;

use App\Http\Validators\ValidateUser;
use App\Models\Profile;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    public function index()
    {
        try {
            $profile = Profile::with('user')->paginate(10);

            return response()->json([
                'success' => true,
                'message' => 'Danh sách người dùng.',
                'data' => $profile,
            ], 200);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải dữ liệu.',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Lưu user tạo mới dành cho admin.
     */
    public function store(Request $request)
    {
        try {
            /**
             * Lấy data validate trong ValidateUser.
             * Hash password.
             * Tạo user.
             */
            $userData = ValidateUser::validateUserData($request, false);
            $profileData = ValidateUser::validateProfileUser($request, false);

            $userData['password'] = Hash::make($userData['password']);
            $userData['user_id'] = User::generateUserId();
            $user = User::create($userData);

            /**
             * Xử lý định dạng 'dob'.
             * Nếu 'dob' = true thì dùng Carbon parse chuỗi ISO 8601 và format lại.
             * Xử lý định dạng 'address'.
             * Gán profile_id = user_id vừa tạo.
             * Tạo profile.
             */
            if (!empty($profileData['dob'])) {
                $profileData['dob'] = Carbon::parse($profileData['dob'])->format('Y-m-d');
            } else {
                $profileData['dob'] = null;
            }

            $profileData['address'] = ValidateUser::addressData($request);
            $profileData['profile_id'] = $user->user_id;
            $profile = Profile::create($profileData);

            return response()->json([
                'success' => true,
                'message' => 'Thêm mới thành công.',
                'profileUser' => $profile->load('user'),
            ], 201);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tạo profile.',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Chi tiết thông tin profile.
     */
    public function show($id)
    {
        try {
            $profile = Profile::with('user')->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $profile,
            ], 200);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy profile.',
                'errors' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Cập nhật thông tin profile.
     */
    public function update(Request $request, $id)
    {
        try {
            $profile = Profile::with('user')->findOrFail($id);

            /**
             * Validate dữ liệu.
             * Cập nhật thông tin user và profile.
             */
            $userData = ValidateUser::validateUserData($request, true);
            $profileData = ValidateUser::validateProfileUser($request, true);

            if (isset($userData['password'])) {
                $userData['password'] = Hash::make($userData['password']);
            }
            unset($userData['password_confirmation']);

            $profile->user->update($userData);
            $profile->update($profileData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật thành công.',
                'profileUser' => $profile,
            ], 200);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi cập nhật profile.',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Xóa profile.
     */
    public function destroy($id)
    {
        try {
            $profile = Profile::with('user')->findOrFail($id);
            $userLogin = Auth::user();

            /**
             * Ngăn admin tự hủy.
             */
            if ($userLogin->user_id === $profile->profile_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không thể tự hủy.'
                ], 403);
            }

            $profile->user->delete();
            $profile->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa profile thành công.',
            ], 200);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa profile.',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}
