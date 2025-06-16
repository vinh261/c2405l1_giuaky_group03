<?php

use App\Http\Controllers\Auth\AdminController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\MealPlanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RecommendController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/**
 * Public routes - accessible without authentication
 */
Route::prefix('/')->group(function () {
    // recipe routes
    Route::get('recipe', [RecipeController::class, 'index'])->name('recipe.index');
    Route::get('recipe/{recipe}', [RecipeController::class, 'show'])->name('recipe.show');

    // meal-menu routes
    Route::get('meal', [MealController::class, 'index'])->name('meal.index');
    Route::get('meal/{meal}', [MealController::class, 'show'])->name('meal.show');

    // tag routes
    Route::get('tag', [TagController::class, 'index'])->name('tag.index');
    Route::get('tag/{tag}', [TagController::class, 'show'])->name('tag.show');

    // review routes
    Route::get('reviews', [ReviewController::class, 'index'])->name('review.index');
});


/**
 * Auth routes for user registration, login, and password management
 */
Route::middleware('web')->group(function () {
    Route::post('login', LoginController::class)->name('user.login');
    Route::post('register', RegisterController::class)->name('user.register');
    Route::post('forgot-password', [ForgotPasswordController::class, 'sendResetEmail'])->name('password.forgot');
    Route::post('reset-password', [ResetPasswordController::class, 'resetPassword'])->name('password.reset');
});


/**
 * authenticated routes - trả về thông tin user đang đăng nhập
 */
Route::middleware('auth:sanctum')->get('me', function (Request $request) {
    $user = $request->user();
    $user->load('profile');

    return response()->json([
        'message' => '/api/me response: thông tin user đã đăng nhập',
        'user' => [
            'user_id' => $user->user_id,
            'email' => $user->email,
            'profile' => $user->profile, // Trả về thông tin profile
        ],
    ]);
});


/**
 * protected user routes - quản lý thông tin user, công thức nấu ăn, thực đơn, kế hoạch bữa ăn, yêu thích, đánh giá
 */
Route::middleware('auth:sanctum', 'users')->prefix('user')->group(function () {
    Route::resource('infomation', UserController::class)->only(['show', 'update'])->names([
        'show' => 'user.show',
        'update' => 'user.update',
    ]);

    // recipe
    Route::resource('recipe', RecipeController::class)->only(['store', 'update', 'destroy'])->names([
        'store' => 'recipe.store',
        'update' => 'recipe.update',
        'destroy' => 'recipe.destroy',
    ]);

    // meal
    Route::resource('meal', MealController::class)->only(['store', 'update', 'destroy'])->names([
        'store' => 'meal.store',
        'update' => 'meal.update',
        'destroy' => 'meal.destroy',
    ]);

    // meal plan
    Route::prefix('plan')->group(function () {
        Route::resource('/', MealPlanController::class)->except(['create', 'edit'])->names([
            'index' => 'plan.index',
            'show' => 'plan.show',
            'store' => 'plan.store',
            'update' => 'plan.update',
            'destroy' => 'plan.destroy',
        ]);
        Route::post('/{plan}/meals', [MealPlanController::class, 'addMeal']);
        Route::delete('/{plan}/meals/{meal}', [MealPlanController::class, 'removeMeal']);
        Route::get('/meals/range', [MealPlanController::class, 'getMealsForDateRange']);
    });

    // recommendations
    Route::resource('recommend', RecommendController::class)->only(['index', 'show'])->names([
        'index' => 'recommend.index',
        'show' => 'recommend.show',
    ]);

    // favorite (wishlist)
    Route::resource('wishlist', FavoriteController::class)->only(['index', 'store', 'destroy'])->names([
        'index' => 'favorite.index',
        'store' => 'favorite.store',
        'destroy' => 'favorite.destroy',
    ]);

    // reviews
    Route::post('reviews', [ReviewController::class, 'store']);
    Route::post('reviews/{id}/reply', [ReviewController::class, 'reply']);

    // logout
    Route::post('logout', LogoutController::class)->name('user.logout');
});


/**
 * Admin routes - quản lý thông tin người dùng, công thức nấu ăn, thực đơn, kế hoạch bữa ăn, yêu thích, đánh giá
 */
Route::middleware('auth:sanctum', 'admin')->prefix('admin')->group(function () {
    // Profile Management routes (dành cho admin tạo/sửa/xem chi tiết profile)
    Route::resource('profile', ProfileController::class)->except(['create', 'edit'])->names([
        'index' => 'profile.index',
        'show' => 'profile.show',
        'store' => 'profile.store',
        'update' => 'profile.update',
        'destroy' => 'profile.destroy',
    ]);

    // Dashboard
    Route::get('/dashboard-stats', [AdminController::class, 'dashboardStats']);

    // Users management
    Route::get('/users', [AdminController::class, 'users']);
    Route::patch('/users/{user}/role', [AdminController::class, 'updateUserRole']);
    Route::delete('/users/{user}', [AdminController::class, 'deleteUser']);

    // Categories management
    Route::get('/categories', [AdminController::class, 'categories']);
    Route::post('/categories', [AdminController::class, 'createCategory']);
    Route::put('/categories/{category}', [AdminController::class, 'updateCategory']);
    Route::delete('/categories/{category}', [AdminController::class, 'deleteCategory']);

    // Reviews management
    Route::delete('/reviews/{review}', [AdminController::class, 'deleteReview']);

    // Favorites statistics
    Route::get('/favorites/stats', [AdminController::class, 'favoritesStats']);

    // Tags management
    Route::resource('tag', TagController::class)->only(['store', 'update', 'destroy'])->names([
        'store' => 'tag.store',
        'update' => 'tag.update',
        'destroy' => 'tag.destroy',
    ]);
});
