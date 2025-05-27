<?php

namespace App\Http\Controllers;

use App\Http\Validators\ValidateRecipeNutrition;
use App\Models\Recipe;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    /**
     * Danh sách công thức.
     */
    public function index()
    {
        try {
            /**
             * lastest() lấy công thức mới nhất cùng tên người tạo.
             */
            $recipe = Recipe::with([
                    'user:user_id,user_name',
                    'nutrition_info',
                    'ingredients'
                ])
                ->latest()
                ->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $recipe
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải dữ liệu',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Lưu công thức tạo mới
     */
    public function store(Request $request)
    {
        try {
            /**
             * Transaction: vẹn toàn dữ liệu, nếu 1 thành phần trong transaction bị lỗi thì các thao tác khác cũng sẽ bị hủy (rollback).
             */
            return DB::transaction(function () use ($request) {
                /**
                 * validate data
                 */
                $recipeData = ValidateRecipeNutrition::validateRecipe($request, false);
                $nutritionData = ValidateRecipeNutrition::validateNutrition($request, false);
                $ingredientData = ValidateRecipeNutrition::validateIngredient($request, false);

                /**
                 * tạo cong thuc moi.
                 */
                $recipeData['created_by'] = Auth::id();
                $recipe = Recipe::create($recipeData);

                /**
                 * tạo nutrition thông qua quan hệ nutrition_info() trong model RecipePrepare.
                 */
                if(!empty($nutritionData['nutrition'])) {
                    $recipe->nutrition_info()->create($nutritionData['nutrition']);
                }

                /**
                 * tạo nguyen lieu
                 * format pivot data de luu quantity va units.
                 * attach: chen them nhieu id nguyen lieu vao mot id cong thuc trong pivot.
                 */
                if (!empty($ingredientData['ingredient'])) {
                    $pivotData = [];
                    foreach ($ingredientData['ingredient'] as $ingredient) {
                        $pivotData[$ingredient['ingredient_id']] = [
                            'quantity' => $ingredient['quantity'],
                            'units' => $ingredient['units']
                        ];
                    }
                    $recipe->ingredients()->attach($pivotData);
                }

                /**
                 * Lay thong tin nguoi tao cong thuc, dinh duong va nguyen lieu.
                 */
                $recipe->load('nutrition_info', 'ingredients', 'user:user_id,user_name');

                return response()->json([
                    'success' => true,
                    'message' => 'Tạo công thức thành công',
                    'recipe' => $recipe
                ], 201);
            });
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tạo công thức',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
    * Chi tiết công thức.
    */
    public function show($id)
    {
        try {
            $recipe = Recipe::with([
                    'user:user_id,user_name',
                    'nutrition_info',
                    'ingredients'
                ])->findOrFail($id);

            return response()->json([
                'success' => true,
                'recipe' => $recipe
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy công thức.',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
    * Edit công thức.
    */
    public function update(Request $request, $id)
    {
        try {
            return DB::transaction(function () use ($request, $id) {
                $recipe = Recipe::with('nutrition_info', 'ingredients')->findOrFail($id);

                /**
                 * Admin hoặc người tạo công thức mới có quyền chỉnh sửa.
                 */
                if ($recipe->created_by !== Auth::id() && Auth::user()->role !== 'admin') {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bạn không có quyền sửa công thức này.'
                    ], 403);
                }

                /**
                 * validate data
                 */
                $recipeData = ValidateRecipeNutrition::validateRecipe($request, true);
                $nutritionData = ValidateRecipeNutrition::validateNutrition($request, true);
                $ingredientData = ValidateRecipeNutrition::validateIngredient($request, true);

                $recipe->update($recipeData);

                /**
                 * outer if: du liệu nutrition nhận từ request, sau đó vào trong để ktra.
                 * createOrUpdate: nếu dữ liệu đó tồn tại thì update, không tồn tại thì create, dùng cho relation 1-1.
                 * update nutrition thông qua quan hệ nutrition_info() trong model RecipePrepare.
                 */
                if (!empty($nutritionData['nutrition'])) {
                    $recipe->nutrition_info()->updateOrCreate(
                        ['nutrition_id' => $recipe->nutrition_info->nutrition_id],
                        $nutritionData['nutrition']
                    );
                }

                /**
                 * update nguyen lieu
                 * sync: chen them nhieu id nguyen lieu vao mot id cong thuc trong pivot, xóa cũ thêm mới.
                 */
                if (!empty($ingredientData['ingredient'])) {
                    $pivotData = [];
                    foreach ($ingredientData['ingredient'] as $ingredient) {
                        $pivotData[$ingredient['ingredient_id']] = [
                            'quantity' => $ingredient['quantity'],
                            'units' => $ingredient['units']
                        ];
                    }
                    $recipe->ingredients()->sync($pivotData);
                }

                $recipe->refresh();
                $recipe->load('nutrition_info', 'ingredients', 'user:user_id,user_name');

                return response()->json([
                    'success' => true,
                    'message' => 'Cập nhật công thức thành công.',
                    'recipe' => $recipe
                ]);
            });
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi cập nhật công thức.',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Delete công thức, 204 no contentcons
     */
    public function destroy($id)
    {
        try {
            $recipe = Recipe::findOrFail($id);

            /**
             * Admin hoặc người tạo cong thuc moi co quyen xoa.
             */
            if ($recipe->created_by !== Auth::id() && Auth::user()->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không có quyền xóa công thức này.'
                ], 403);
            }

            $recipe->delete();

            return response()->json(null, 204);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa công thức.',
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
