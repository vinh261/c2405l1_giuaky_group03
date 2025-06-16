<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Get all reviews
     */
    public function index()
    {
        try {
            $reviews = Review::with('user:user_id,email', 'user.profile:profile_id,user_name')
                ->latest()
                ->get()
                ->map(function ($review) {
                    return [
                        'id' => $review->id,
                        'user_name' => $review->user->profile->user_name ?? 'Anonymous',
                        'rating' => $review->rating,
                        'comment' => $review->comment,
                        'created_at' => $review->created_at,
                        'admin_reply' => $review->admin_reply,
                        'admin_reply_at' => $review->admin_reply_at,
                    ];
                });

            return response()->json($reviews);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải đánh giá',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create new review
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'rating' => 'required|integer|between:1,5',
                'comment' => 'required|string|max:1000'
            ]);

            $review = Review::create([
                'user_id' => Auth::id(),
                'rating' => $request->rating,
                'comment' => $request->comment
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Đánh giá đã được gửi',
                'review' => $review
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi gửi đánh giá',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Admin reply to review
     */
    public function reply(Request $request, $id)
    {
        try {
            // Check if user is admin
            if (Auth::user()->profile->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 403);
            }

            $request->validate([
                'reply' => 'required|string|max:1000'
            ]);

            $review = Review::findOrFail($id);

            $review->update([
                'admin_reply' => $request->reply,
                'admin_reply_at' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Phản hồi đã được gửi',
                'review' => $review
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi gửi phản hồi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
