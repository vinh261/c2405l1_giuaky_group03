<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Meal;
use App\Models\Profile;
use App\Models\Review;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function dashboardStats()
    {
        try {
            // User stats
            $totalUsers = User::count();
            $newUsersThisMonth = User::whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->count();
            $lastMonthUsers = User::whereMonth('created_at', Carbon::now()->subMonth()->month)
                ->whereYear('created_at', Carbon::now()->subMonth()->year)
                ->count();
            $userGrowth = $lastMonthUsers > 0
                ? round((($newUsersThisMonth - $lastMonthUsers) / $lastMonthUsers) * 100, 1)
                : 0;

            // Meal stats
            $totalMeals = Meal::count();
            $mealsByCategory = Meal::join('category_meals', 'meals.meal_id', '=', 'category_meals.meal_id')
                ->join('categories', 'category_meals.category_id', '=', 'categories.category_id')
                ->select('categories.category_name', DB::raw('count(*) as count'))
                ->groupBy('categories.category_name')
                ->pluck('count', 'category_name');

            // Favorites stats
            $totalFavorites = DB::table('favorites')->count();
            $mostFavorited = DB::table('favorites')
                ->join('meals', 'favorites.meal_id', '=', 'meals.meal_id')
                ->select('meals.meal_name', DB::raw('count(*) as count'))
                ->groupBy('meals.meal_id', 'meals.meal_name')
                ->orderBy('count', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($item) {
                    return [
                        'meal_name' => $item->meal_name,
                        'count' => $item->count
                    ];
                });

            // Reviews stats
            $totalReviews = Review::count();
            $averageRating = Review::avg('rating') ?: 0;
            $recentReviews = Review::where('created_at', '>=', Carbon::now()->subDays(7))->count();

            return response()->json([
                'users' => [
                    'total' => $totalUsers,
                    'new_this_month' => $newUsersThisMonth,
                    'growth' => $userGrowth
                ],
                'meals' => [
                    'total' => $totalMeals,
                    'by_category' => $mealsByCategory
                ],
                'favorites' => [
                    'total' => $totalFavorites,
                    'most_favorited' => $mostFavorited
                ],
                'reviews' => [
                    'total' => $totalReviews,
                    'average_rating' => round($averageRating, 1),
                    'recent_count' => $recentReviews
                ]
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error fetching dashboard stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get users list for admin
     */
    public function users(Request $request)
    {
        try {
            $query = User::with('profile');

            // Search
            if ($request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('email', 'like', "%{$search}%")
                      ->orWhereHas('profile', function($q) use ($search) {
                          $q->where('user_name', 'like', "%{$search}%");
                      });
                });
            }

            // Filter by role
            if ($request->role && $request->role !== 'all') {
                $query->whereHas('profile', function($q) use ($request) {
                    $q->where('role', $request->role);
                });
            }

            $users = $query->get()->map(function ($user) {
                // Get user stats
                $mealsCount = Meal::whereHas('recipe', function($q) use ($user) {
                    $q->where('created_by', $user->profile->profile_id);
                })->count();

                $favoritesCount = DB::table('favorites')
                    ->where('profile_id', $user->profile->profile_id)
                    ->count();

                $reviewsCount = Review::where('user_id', $user->user_id)->count();

                return [
                    'user_id' => $user->user_id,
                    'email' => $user->email,
                    'created_at' => $user->created_at,
                    'profile' => [
                        'profile_id' => $user->profile->profile_id,
                        'user_name' => $user->profile->user_name,
                        'role' => $user->profile->role,
                        'phone' => $user->profile->phone,
                        'image' => $user->profile->image
                    ],
                    'stats' => [
                        'meals_count' => $mealsCount,
                        'favorites_count' => $favoritesCount,
                        'reviews_count' => $reviewsCount
                    ]
                ];
            });

            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update user role
     */
    public function updateUserRole(Request $request, $userId)
    {
        try {
            $request->validate([
                'role' => 'required|in:admin,user'
            ]);

            $user = User::findOrFail($userId);
            $user->profile->update(['role' => $request->role]);

            return response()->json([
                'message' => 'User role updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating user role',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete user
     */
    public function deleteUser($userId)
    {
        try {
            $profile = Profile::with('user')->findOrFail($userId);
            $user = Auth::user();

            // Prevent deleting self
            if ($user->user_id === $profile->profile_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không thể tự hủy.'
                ], 403);
            }

            $profile->user->delete();
            $profile->delete();

            return response()->json([
                'message' => 'User deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get categories for admin
     */
    public function categories()
    {
        try {
            $categories = Category::withCount('meals')
                ->get()
                ->map(function ($category) {
                    return [
                        'category_id' => $category->category_id,
                        'category_name' => $category->category_name,
                        'meals_count' => $category->meals_count,
                        'created_at' => $category->created_at
                    ];
                });

            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create category
     */
    public function createCategory(Request $request)
    {
        try {
            $request->validate([
                'category_name' => 'required|string|unique:categories,category_name'
            ]);

            $category = Category::create([
                'category_name' => $request->category_name
            ]);

            return response()->json([
                'message' => 'Category created successfully',
                'category' => $category
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update category
     */
    public function updateCategory(Request $request, $categoryId)
    {
        try {
            $category = Category::findOrFail($categoryId);

            $request->validate([
                'category_name' => 'required|string|unique:categories,category_name,' . $categoryId . ',category_id'
            ]);

            $category->update([
                'category_name' => $request->category_name
            ]);

            return response()->json([
                'message' => 'Category updated successfully',
                'category' => $category
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete category
     */
    public function deleteCategory($categoryId)
    {
        try {
            $category = Category::findOrFail($categoryId);

            // Check if category has meals
            if ($category->meals()->count() > 0) {
                return response()->json([
                    'message' => 'Cannot delete category with meals'
                ], 400);
            }

            $category->delete();

            return response()->json([
                'message' => 'Category deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete review (admin only)
     */
    public function deleteReview($reviewId)
    {
        try {
            $review = Review::findOrFail($reviewId);
            $review->delete();

            return response()->json([
                'message' => 'Review deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting review',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get favorites statistics
     */
    public function favoritesStats()
    {
        try {
            $totalFavorites = DB::table('favorites')->count();
            $totalUniqueUsers = DB::table('favorites')
                ->distinct('profile_id')
                ->count('profile_id');

            // Most favorited meals
            $mostFavorited = DB::table('favorites')
                ->join('meals', 'favorites.meal_id', '=', 'meals.meal_id')
                ->select(
                    'meals.meal_id',
                    'meals.meal_name',
                    'meals.image',
                    DB::raw('count(*) as count')
                )
                ->groupBy('meals.meal_id', 'meals.meal_name', 'meals.image')
                ->orderBy('count', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($item) use ($totalFavorites) {
                    return [
                        'meal_id' => $item->meal_id,
                        'meal_name' => $item->meal_name,
                        'image' => $item->image,
                        'count' => $item->count,
                        'percentage' => $totalFavorites > 0
                            ? round(($item->count / $totalFavorites) * 100, 1)
                            : 0
                    ];
                });

            // Recent favorites
            $recentFavorites = DB::table('favorites')
                ->join('profiles', 'favorites.profile_id', '=', 'profiles.profile_id')
                ->join('meals', 'favorites.meal_id', '=', 'meals.meal_id')
                ->select(
                    'profiles.user_name',
                    'meals.meal_name',
                    'favorites.created_at'
                )
                ->orderBy('favorites.created_at', 'desc')
                ->limit(10)
                ->get();

            return response()->json([
                'total_favorites' => $totalFavorites,
                'total_unique_users' => $totalUniqueUsers,
                'most_favorited' => $mostFavorited,
                'recent_favorites' => $recentFavorites
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error fetching favorites stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
