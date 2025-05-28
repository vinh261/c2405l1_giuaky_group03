<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\RecipeController;
use App\Http\Controllers\API\IngredientController;
use App\Http\Controllers\API\MealPlanController;
use App\Http\Controllers\API\FavoriteController;
use App\Http\Controllers\API\MealController;
use App\Http\Controllers\API\RecommendController;
use App\Http\Controllers\API\NutritionInfoController;
use App\Http\Controllers\API\PlanMealMenuController;
use App\Http\Controllers\API\UserController;



Route::get('users',      [UserController::class, 'index']);
Route::get('users/{id}', [UserController::class, 'show']);
// danh sách tất cả
Route::get('plan-meal-menu', [PlanMealMenuController::class, 'index']);
// chi tiết theo composite key
Route::get(
  'plan-meal-menu/{plan}/{meal}/{date}',
  [PlanMealMenuController::class, 'show']
);
Route::get('nutrition-info',      [NutritionInfoController::class, 'index']);
Route::get('nutrition-info/{id}', [NutritionInfoController::class, 'show']);
Route::get('recommends',      [RecommendController::class, 'index']);
Route::get('recommends/{id}', [RecommendController::class, 'show']);
Route::get('meals',      [MealController::class, 'index']);
Route::get('meals/{id}', [MealController::class, 'show']);
Route::get('favorites',      [FavoriteController::class, 'index']);
Route::get('favorites/{id}', [FavoriteController::class, 'show']);
Route::get('meal-plans',      [MealPlanController::class, 'index']);
Route::get('meal-plans/{id}', [MealPlanController::class, 'show']);
Route::get('ingredients', [IngredientController::class, 'index']);
Route::get('ingredients/{id}', [IngredientController::class, 'show']);
Route::get('recipes', [RecipeController::class, 'index']);
Route::get('recipes/{id}', [RecipeController::class, 'show']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{id}', [CategoryController::class, 'show']);
