<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index()
    {
        try {
            /**
             * lấy danh sách yêu thích.
             * @var \App\Models\User $user
            */
            $user = Auth::user();
            $fav = $user->meals()->with('tags')->get();

            return response()->json([
                'success' => true,
                'data' => $fav,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu.',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            // Đảm bảo meal_id tồn tại.
            request()->validate([
                'meal_id' => 'required|exists:meals,meal_id',
            ]);

            /**
             * Add món.
             * syncWithoutDetaching: đảm bảo các bản ghi không trùng.
             * @var \App\Models\User $user
             */
            $user = Auth::user();
            $user->meals()->syncWithoutDetaching($request->meal_id);

            return response()->json([
                'success' => true,
                'message' => 'Đã thêm vào danh sách yêu thích.',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi thêm món.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Request $request)
    {
        try {
            /**
             * Xóa món.
             * @var \App\Models\User $user
             */
            $user = Auth::user();
            $user->meals()->detach($request->meal_id);

            return response()->json([
                'success' => true,
                'message' => 'Đã xóa khỏi danh sách yêu thích.',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa món.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
