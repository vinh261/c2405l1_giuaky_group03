<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * PUBLIC: Get all categories
     * Xử lý cho public và admin
     * Route: GET /api/categories
     */
    public function index()
    {
        try {
            $categories = Category::withCount('meals')
                ->orderBy('category_name')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $categories
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải danh sách categories.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUBLIC: Get meals by category
     * Route: GET /api/categories/{category}/meals
     */
    public function meals(Category $category)
    {
        try {
            $meals = $category->meals()
                ->with(['tags', 'reviews'])
                ->withCount('reviews')
                ->withAvg('reviews', 'rating')
                ->paginate(12);

            return response()->json([
                'success' => true,
                'category' => $category->category_name,
                'data' => $meals
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải meals theo category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ADMIN: Get categories with full stats
     * Route: GET /api/admin/categories
     */
    public function adminIndex()
    {
        try {
            $categories = Category::withCount('meals')
                ->get()
                ->map(function ($category) {
                    return [
                        'category_id' => $category->category_id,
                        'category_name' => $category->category_name,
                        'meals_count' => $category->meals_count,
                        'created_at' => $category->created_at,
                        'updated_at' => $category->updated_at
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $categories
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải danh sách categories.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ADMIN: Create new category
     * Route: POST /api/admin/categories
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'category_name' => 'required|string|max:100|unique:categories,category_name'
            ]);

            $category = Category::create([
                'category_name' => $request->category_name
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Tạo category thành công.',
                'data' => $category
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tạo category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ADMIN: Update category
     * Route: PUT /api/admin/categories/{category}
     */
    public function update(Request $request, Category $category)
    {
        try {
            $request->validate([
                'category_name' => 'required|string|max:100|unique:categories,category_name,' . $category->category_id . ',category_id'
            ]);

            $category->update([
                'category_name' => $request->category_name
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật category thành công.',
                'data' => $category
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi cập nhật category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ADMIN: Delete category
     * Route: DELETE /api/admin/categories/{category}
     */
    public function destroy(Category $category)
    {
        try {
            // Check if category has meals
            if ($category->meals()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không thể xóa category đang có meals.'
                ], 400);
            }

            $category->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa category thành công.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
