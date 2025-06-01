<?php

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
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * Public routes
 */
Route::get('/recipe', [RecipeController::class, 'index'])->name('recipe.index');
Route::get('/recipe/{recipe}', [RecipeController::class, 'show'])->name('recipe.show');

Route::get('meal', [MealController::class, 'index'])->name('meal.index');
Route::get('meal/{meal}', [MealController::class, 'show'])->name('meal.show');

Route::get('tag', [TagController::class, 'index'])->name('tag.index');
Route::get('tag/{tag}', [TagController::class, 'show'])->name('tag.show');

/**
 * Call role from react.
 */
Route::middleware('auth:sanctum')->get('/role', function (Request $request) {
    $profile = Profile::where('profile_id', $request->user()->user_id)->first();
    return response()->json([
        'role' => $profile->role ?? 'user',
    ]);
});

/**
 * Lấy thông tin người dùng đã đăng nhập.
 * Chỉ trả về khi người dùng đã xác thực.
 */
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    $user = $request->user();
    $user->load('profile'); // Tải relationship 'profile'
    return response()->json([
        'user_id' => $user->user_id,
        'email' => $user->email,
        'profile' => $user->profile,
        'role' => $user->profile->role ?? 'user', // Lấy role từ profile
    ]);
});

/**
 * Khách vãng lai
 */
Route::middleware('guest:sanctum')->group(function () {
    Route::post('/register', RegisterController::class)->name('user.register');
    Route::post('/login', LoginController::class)->name('user.login');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetEmail'])->name('password.forgot');
    Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword'])->name('password.reset');
});

/**
 * Yêu cầu xác thực trước khi abc xyz bên trong.
 * User đã xác thực rồi mới có thể logout.
 */
Route::middleware('auth:sanctum', 'users')->prefix('user')->group(function () {
    Route::resource('infomation', UserController::class)->only(['show', 'update'])->names([
        'show' => 'user.show',
        'update' => 'user.update',
    ]);
    Route::resource('recipe', RecipeController::class)->only(['store', 'update', 'destroy'])->names([
        'store' => 'recipe.store',
        'update' => 'recipe.update',
        'destroy' => 'recipe.destroy',
    ]);
    Route::resource('meal', MealController::class)->only(['store', 'update', 'destroy'])->names([
        'store' => 'meal.store',
        'update' => 'meal.update',
        'destroy' => 'meal.destroy',
    ]);
    Route::resource('plan', MealPlanController::class)->except(['create', 'edit'])->names([
        'index' => 'plan.index',
        'show' => 'plan.show',
        'store' => 'plan.store',
        'update' => 'plan.update',
        'destroy' => 'plan.destroy',
    ]);
    Route::resource('recommend', RecommendController::class)->only(['index', 'show'])->names([
        'index' => 'recommend.index',
        'show' => 'recommend.show',
    ]);
    Route::resource('wishlist', FavoriteController::class)->only(['index', 'store', 'destroy'])->names([
        'index' => 'favorite.index',
        'store' => 'favorite.store',
        'destroy' => 'favorite.destroy',
    ]);
    Route::post('/logout', LogoutController::class)->name('user.logout');
});

/**
 * Admin
 */
Route::middleware('auth:sanctum', 'admin')->prefix('admin')->group(function () {
    Route::resource('profile', ProfileController::class)->except(['create', 'edit'])->names([
        'index' => 'profile.index',
        'show' => 'profile.show',
        'store' => 'profile.store',
        'update' => 'profile.update',
        'destroy' => 'profile.destroy',
    ]);
    Route::resource('tag', TagController::class)->only(['store', 'update', 'destroy'])->names('tag.admin');
});
