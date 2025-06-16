<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Meal;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * PUBLIC: Get all reviews
     * Xử lý cho public và admin
     * Route: GET /api/reviews
     */
    public function index(Request $request)
    {
        try {
            $query = Review::with(['user.profile', 'meal']);

            // Filter by rating
            if ($request->filled('rating')) {
                $query->where('rating', $request->rating);
            }

            // Sort
            $sortBy = $request->sort ?? 'latest';
            switch ($sortBy) {
                case 'highest':
                    $query->orderBy('rating', 'desc');
                    break;
                case 'lowest':
                    $query->orderBy('rating', 'asc');
                    break;
                default:
                    $query->latest();
            }

            $reviews = $query->paginate($request->per_page ?? 10);

            return response()->json([
                'success' => true,
                'data' => $reviews
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải danh sách reviews.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUBLIC: Get reviews by meal
     * Route: GET /api/meals/{meal}/reviews
     */
    public function byMeal(Meal $meal)
    {
        try {
            $reviews = $meal->reviews()
                ->with('user.profile')
                ->latest()
                ->paginate(10);

            $stats = [
                'total' => $meal->reviews()->count(),
                'average' => round($meal->reviews()->avg('rating'), 1),
                'distribution' => $meal->reviews()
                    ->selectRaw('rating, count(*) as count')
                    ->groupBy('rating')
                    ->pluck('count', 'rating')
            ];

            return response()->json([
                'success' => true,
                'stats' => $stats,
                'data' => $reviews
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải reviews của meal.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * USER: Create review
     * Route: POST /api/user/reviews
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'meal_id' => 'required|exists:meals,meal_id',
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'nullable|string|max:1000'
            ]);

            // Check if user already reviewed this meal
            $existingReview = Review::where('user_id', Auth::id())
                ->where('meal_id', $request->meal_id)
                ->first();

            if ($existingReview) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn đã đánh giá món ăn này rồi.'
                ], 400);
            }

            $review = Review::create([
                'user_id' => Auth::id(),
                'meal_id' => $request->meal_id,
                'rating' => $request->rating,
                'comment' => $request->comment
            ]);

            $review->load('user.profile');

            return response()->json([
                'success' => true,
                'message' => 'Đánh giá thành công.',
                'data' => $review
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tạo review.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * USER: Update own review
     * Route: PUT /api/user/reviews/{review}
     */
    public function update(Request $request, Review $review)
    {
        try {
            // Check ownership
            if ($review->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không có quyền sửa review này.'
                ], 403);
            }

            $request->validate([
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'nullable|string|max:1000'
            ]);

            $review->update([
                'rating' => $request->rating,
                'comment' => $request->comment
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật review thành công.',
                'data' => $review
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi cập nhật review.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * USER: Delete own review
     * Route: DELETE /api/user/reviews/{review}
     */
    public function destroy(Review $review)
    {
        try {
            // Check ownership
            if ($review->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không có quyền xóa review này.'
                ], 403);
            }

            $review->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa review thành công.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa review.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ADMIN: Get all reviews with filters
     * Route: GET /api/admin/reviews
     */
    public function adminIndex(Request $request)
    {
        try {
            $query = Review::with(['user.profile', 'meal']);

            // Search by user or meal
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->whereHas('user.profile', function($q) use ($search) {
                        $q->where('user_name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('meal', function($q) use ($search) {
                        $q->where('meal_name', 'like', "%{$search}%");
                    });
                });
            }

            // Filter by rating
            if ($request->filled('rating')) {
                $query->where('rating', $request->rating);
            }

            // Filter by date range
            if ($request->filled('from_date')) {
                $query->whereDate('created_at', '>=', $request->from_date);
            }
            if ($request->filled('to_date')) {
                $query->whereDate('created_at', '<=', $request->to_date);
            }

            $reviews = $query->latest()->paginate($request->per_page ?? 20);

            return response()->json([
                'success' => true,
                'data' => $reviews
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải danh sách reviews.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ADMIN: Delete any review
     * Route: DELETE /api/admin/reviews/{review}
     */
    public function adminDestroy(Review $review)
    {
        try {
            $review->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa review thành công.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa review.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
