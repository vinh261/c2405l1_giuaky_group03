<?php

namespace App\Http\Controllers;

use App\Http\Validators\ValidateMeal;
use App\Models\Meal;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MealController extends Controller
{
    public function index()
    {
        try {
            $meal = Meal::with([
               'recipe:cuisine_type,created_by',
               'tags',
            ])
            ->latest()
            ->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $meal,
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải dữ liệu',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store (Request $request)
    {
        try {
            $mealData = ValidateMeal::validateMeal($request, false);

            $meal = Meal::create($mealData);

            return response()->json([
                'success' => true,
                'message' => 'Tạo món thành công.',
                'meal' => $meal
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tạo món ăn.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $meal = Meal::with([
                'recipe:cuisine_type,created_by',
                'tags',
            ])->findOrFail($id);

            return response()->json([
                'success' => true,
                'meal' => $meal
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy món.',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $meal = Meal::with('recipe:cuisine_type,created_by')->findOrFail($id);

            if ($meal->recipe->created_by !== Auth::id() && Auth::user()->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không có quyền sửa món này.'
                ], 403);
            }

            $mealData = ValidateMeal::validateMeal($request, true);
            $meal->update($mealData);

            return response()->json([
                'success' => true,
                'message' => 'Update món thành công.',
                'meal' => $meal
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi update món.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $meal = Meal::findOrFail($id);

            if ($meal->recipe->created_by !== Auth::id() && Auth::user()->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không có quyền xóa món này.'
                ], 403);
            }

            $meal->delete();

            return response()->json(null, 204);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa món.',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
