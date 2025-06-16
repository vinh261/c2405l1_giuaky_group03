<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FavoriteController extends Controller
{
    public function index()
    {
        try {
            /**
             * Get user's favorite meals with proper formatting
             */
            $user = Auth::user();

            $favorites = $user->profile->meals()
                ->with([
                    'recipe.nutrition_info',
                    'tags',
                    'categories'
                ])
                ->get()
                ->map(function ($meal) {
                    return [
                        'meal_id' => $meal->meal_id,
                        'meal_name' => $meal->meal_name,
                        'category' => $meal->categories->first()->category_name ?? 'uncategorized',
                        'diet_type' => $meal->tags->pluck('tag_name')->toArray(),
                        'image' => $meal->image,
                        'desc' => $meal->desc,
                        'calories' => $meal->recipe?->nutrition_info?->calories ?? 0,
                        'recipe_id' => $meal->recipe_id,
                        'created_at' => $meal->created_at->toISOString(),
                        'updated_at' => $meal->updated_at->toISOString(),
                        'recipe' => $meal->recipe ? [
                            'cook_time' => $meal->recipe->cook_time,
                            'serve' => $meal->recipe->serve,
                        ] : null
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $favorites,
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
             */
            $user = Auth::user();
            $user->profile->meals()->syncWithoutDetaching($request->meal_id);

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

    public function destroy($meal_id)
    {
        try {
            /**
             * Xóa món.
             */
            $user = Auth::user();
            $user->profile->meals()->detach($meal_id);

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
