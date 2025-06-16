<?php

namespace App\Http\Controllers;

use App\Http\Validators\ValidateMeal;
use App\Models\Category;
use App\Models\Ingredient;
use App\Models\Meal;
use App\Models\NutritionInfo;
use App\Models\Recipe;
use App\Models\Tag;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MealController extends Controller
{
    public function index(Request $request)
    {
        try {
            $meal = Meal::with([
                'recipe.nutrition_info',
                'recipe.user:profile_id,user_name',
                'tags',
                'categories'
            ])
            ->latest();

            // Search functionality
            if ($request->has('search')) {
                $search = $request->search;
                $meal->where(function($q) use ($search) {
                    $q->where('meal_name', 'like', "%{$search}%")
                    ->orWhere('desc', 'like', "%{$search}%");
                });
            }

            // Filter by category
            if ($request->has('category')) {
                $meal->whereHas('categories', function($q) use ($request) {
                    $q->where('category_name', $request->category);
                });
            }

            // Filter by diet type (tags)
            if ($request->has('diet_type')) {
                $dietTypes = is_array($request->diet_type)
                    ? $request->diet_type
                    : explode(',', $request->diet_type);

                $meal->whereHas('tags', function($q) use ($dietTypes) {
                    $q->whereIn('tag_name', $dietTypes);
                });
            }

            // Filter by calories
            if ($request->has('min_calories') || $request->has('max_calories')) {
                $meal->whereHas('recipe.nutrition_info', function($q) use ($request) {
                    if ($request->min_calories) {
                        $q->where('calories', '>=', $request->min_calories);
                    }
                    if ($request->max_calories) {
                        $q->where('calories', '<=', $request->max_calories);
                    }
                });
            }

            $perPage = $request->per_page ?? 12;
            $meals = $meal->latest()->paginate($perPage);

             // Transform data to match frontend format
            $meals->getCollection()->transform(function ($meal) {
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
                ];
            });

            return response()->json($meals);
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
            DB::beginTransaction();

            ValidateMeal::validateMeal($request);

            // Get authenticated user
            $user = Auth::user();

            // Create recipe first
            $recipe = Recipe::create([
                'cuisine_type' => $request->recipe['cuisine_type'],
                'desc_step' => $request->recipe['desc_step'],
                'cook_time' => $request->recipe['cook_time'],
                'serve' => $request->recipe['serve'],
                'created_by' => $user->profile->profile_id
            ]);

            // Create nutrition info
            NutritionInfo::create([
                'recipe_id' => $recipe->recipe_id,
                'calories' => $request->nutrition['calories'],
                'protein' => $request->nutrition['protein'],
                'carbohydrate' => $request->nutrition['carbohydrate'],
                'fat' => $request->nutrition['fat']
            ]);

            // Create meal
            $meal = Meal::create([
                'meal_name' => $request->meal_name,
                'desc' => $request->desc,
                'image' => $request->image,
                'diet_type' => json_encode($request->diet_type),
                'recipe_id' => $recipe->recipe_id
            ]);

             // Attach category
            $category = Category::where('category_name', $request->category)->first();
            if ($category) {
                $meal->categories()->attach($category->category_id);
            }

            // Attach diet tags
            foreach ($request->diet_type as $dietName) {
                $tag = Tag::firstOrCreate(['tag_name' => $dietName]);
                $meal->tags()->attach($tag->tag_id);
            }

            // Add ingredients
            foreach ($request->ingredients as $ing) {
                $ingredient = Ingredient::firstOrCreate(
                    ['ingredient_name' => $ing['ingredient_name']],
                    ['unit' => $ing['units']]
                );

                $recipe->ingredients()->attach($ingredient->ingredient_id, [
                    'quantity' => $ing['quantity'],
                    'units' => $ing['units']
                ]);
            }

            DB::commit();

            // Load relationships
            $meal->load(['recipe.nutrition_info', 'tags', 'categories']);

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
                'recipe.nutrition_info',
                'recipe.user:profile_id,user_name',
                'recipe.ingredients',
                'tags',
                'categories'
            ])->findOrFail($id);

            // Transform to match frontend format
            $mealData = [
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
                    'recipe_id' => $meal->recipe->recipe_id,
                    'cuisine_type' => $meal->recipe->cuisine_type,
                    'desc_step' => $meal->recipe->desc_step,
                    'cook_time' => $meal->recipe->cook_time,
                    'serve' => $meal->recipe->serve,
                    'created_by' => $meal->recipe->user->user_name ?? 'Unknown',
                    'created_at' => $meal->recipe->created_at->toISOString(),
                    'updated_at' => $meal->recipe->updated_at->toISOString(),
                ] : null,
                'nutrition' => $meal->recipe?->nutrition_info ? [
                    'meal_id' => $meal->meal_id,
                    'calories' => $meal->recipe->nutrition_info->calories,
                    'protein' => $meal->recipe->nutrition_info->protein,
                    'carbs' => $meal->recipe->nutrition_info->carbohydrate,
                    'fat' => $meal->recipe->nutrition_info->fat,
                    'fiber' => 5, // Add to nutrition_info table if needed
                    'sugar' => 8, // Add to nutrition_info table if needed
                    'sodium' => 480, // Add to nutrition_info table if needed
                ] : null,
                'tags' => $meal->tags->map(function($tag) use ($meal) {
                    return [
                        'tag_id' => $tag->tag_id,
                        'meal_id' => $meal->meal_id,
                        'tag_name' => $tag->tag_name
                    ];
                }),
                'ingredients' => $meal->recipe?->ingredients->map(function($ing) use ($meal) {
                    return [
                        'meal_id' => $meal->meal_id,
                        'ingredient_id' => $ing->ingredient_id,
                        'ingredient_name' => $ing->ingredient_name,
                        'quantity' => $ing->pivot->quantity,
                        'unit' => $ing->pivot->units
                    ];
                }) ?? []
            ];

            return response()->json([
                'data' => $mealData,
                'message' => 'Meal details retrieved successfully'
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
            DB::beginTransaction();

            $meal = Meal::with('recipe')->findOrFail($id);

            // Check permission
            $user = Auth::user();
            if ($meal->recipe->created_by !== $user->profile->profile_id && $user->profile->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không có quyền sửa món này.'
                ], 403);
            }

            ValidateMeal::validateMeal($request);
            $meal->update([
                'meal_name' => $request->meal_name ?? $meal->meal_name,
                'desc' => $request->desc ?? $meal->desc,
                'image' => $request->image ?? $meal->image,
                'diet_type' => isset($request->diet_type) ? json_encode($request->diet_type) : $meal->diet_type,
            ]);

             // Update recipe
            if (isset($request->recipe)) {
                $meal->recipe->update($request->recipe);
            }

            // Update nutrition
            if (isset($request->nutrition)) {
                $meal->recipe->nutrition_info()->updateOrCreate(
                    ['recipe_id' => $meal->recipe_id],
                    $request->nutrition
                );
            }

            // Update category
            if (isset($request->category)) {
                $meal->categories()->detach();
                $category = Category::where('category_name', $request->category)->first();
                if ($category) {
                    $meal->categories()->attach($category->category_id);
                }
            }

            // Update tags
            if (isset($request->diet_type)) {
                $meal->tags()->detach();
                foreach ($request->diet_type as $dietName) {
                    $tag = Tag::firstOrCreate(['tag_name' => $dietName]);
                    $meal->tags()->attach($tag->tag_id);
                }
            }

            // Update ingredients
            if (isset($request->ingredients)) {
                $meal->recipe->ingredients()->detach();
                foreach ($request->ingredients as $ing) {
                    $ingredient = Ingredient::firstOrCreate(
                        ['ingredient_name' => $ing['ingredient_name']],
                        ['unit' => $ing['units']]
                    );

                    $meal->recipe->ingredients()->attach($ingredient->ingredient_id, [
                        'quantity' => $ing['quantity'],
                        'units' => $ing['units']
                    ]);
                }
            }

            DB::commit();

            // Reload with relationships
            $meal->load(['recipe.nutrition_info', 'tags', 'categories']);

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

            // Check permission
            $user = Auth::user();
            if ($meal->recipe->created_by !== $user->profile->profile_id && $user->profile->role !== 'admin') {
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
