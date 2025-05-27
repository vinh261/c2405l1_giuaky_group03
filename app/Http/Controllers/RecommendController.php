<?php

namespace App\Http\Controllers;

use App\Http\Helper\RecommendHelper;
use App\Models\Meal;
use App\Models\Recommend;
use Exception;
use Illuminate\Support\Facades\Auth;

class RecommendController extends Controller
{
    public function index(RecommendHelper $recommendHelper)
    {
        try {
            $user = Auth::user();
            $recommend = $recommendHelper->recommendUser($user, 10); // đề xuất 10 món ăn

            return response()->json([
                'success' => true,
                'data' => $recommend,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải dữ liệu.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $recommend = Recommend::with([
                'meals',
                'recipe:cuisine_type,create_by',
                'tags',
            ])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $recommend,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu.',
                'error' => $e->getMessage(),
            ], 404);
        }
    }
}
