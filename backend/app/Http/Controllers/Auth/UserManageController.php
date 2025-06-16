<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

/**
 * UserManagementController - Xử lý quản lý users cho Admin
 */
class UserManageController extends Controller
{
    /**
     * Get users list with search, filter, and stats
     * Route: GET /api/admin/users
     */
    public function index(Request $request)
    {
        try {
            $query = User::query();

            // Eager load để tránh N+1
            $query->with(['profile'])
                  ->withCount(['reviews'])
                  ->withCount(['profile as favorites_count' => function ($query) {
                        $query->select(DB::raw('count(favorites.meal_id)'));
                        $query->join('favorites', 'profiles.profile_id', '=', 'favorites.profile_id');
                  }])
                  ->withCount(['profile as meals_count' => function ($query) {
                        $query->select(DB::raw('count(recipes.recipe_id)'));
                        $query->join('recipes', 'profiles.profile_id', '=', 'recipes.created_by');
                  }]);

            // Search by email or username
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('email', 'like', "%{$search}%")
                      ->orWhereHas('profile', function($q) use ($search) {
                          $q->where('user_name', 'like', "%{$search}%");
                      });
                });
            }

            // Filter by role
            if ($request->filled('role') && $request->role !== 'all') {
                $query->whereHas('profile', function($q) use ($request) {
                    $q->where('role', $request->role);
                });
            }

            // Paginate
            $users = $query->latest()->paginate($request->per_page ?? 10);

            // Transform data
            $users->getCollection()->transform(function ($user) {
                return [
                    'user_id' => $user->user_id,
                    'email' => $user->email,
                    'created_at' => $user->created_at,
                    'profile' => [
                        'profile_id' => $user->profile->profile_id,
                        'user_name' => $user->profile->user_name,
                        'role' => $user->profile->role,
                        'phone' => $user->profile->phone,
                        'image' => $user->profile->image,
                        'dob' => $user->profile->dob,
                        'address' => $user->profile->address,
                    ],
                    'stats' => [
                        'meals_count' => $user->meals_count ?? 0,
                        'favorites_count' => $user->favorites_count ?? 0,
                        'reviews_count' => $user->reviews_count ?? 0,
                    ]
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $users
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải danh sách người dùng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update user role
     * Route: PATCH /api/admin/users/{user}/role
     */
    public function updateRole(Request $request, User $user)
    {
        try {
            $request->validate([
                'role' => 'required|in:admin,user'
            ]);

            // Không cho phép user tự thay đổi role của mình
            if ($user->user_id === Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không thể thay đổi role của chính mình.'
                ], 403);
            }

            $user->profile->update(['role' => $request->role]);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật role thành công.',
                'data' => [
                    'user_id' => $user->user_id,
                    'email' => $user->email,
                    'role' => $request->role
                ]
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi cập nhật role.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete user
     * Route: DELETE /api/admin/users/{user}
     */
    public function destroy(User $user)
    {
        try {
            // Không cho phép user tự xóa
            if ($user->user_id === Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không thể xóa tài khoản của chính mình.'
                ], 403);
            }

            // Xóa user (cascade delete sẽ xóa profile)
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa người dùng thành công.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa người dùng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
