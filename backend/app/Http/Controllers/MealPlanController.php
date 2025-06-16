<?php

namespace App\Http\Controllers;

use App\Http\Validators\ValidatePlan;
use App\Models\MealPlan;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MealPlanController extends Controller
{
    public function index() {
        try {
            $profileId = Auth::user()->profile->profile_id; // Use profile_id instead of user_id

            $plans = MealPlan::where('profile_id', $profileId)
                ->with(['meals' => function($query) {
                    $query->with(['recipe:recipe_id,cook_time', 'tags', 'categories'])
                        ->withPivot('day', 'time'); // Include pivot data
                }])
                ->latest()
                ->get();

            // Transform to include plan info in meals
            $plans = $plans->map(function($plan) {
                $plan->meals = $plan->meals->map(function($meal) {
                    // Add plan info to meal
                    $meal->plan_time = $meal->pivot->time;
                    $meal->plan_day = $meal->pivot->day;

                    // Get category name
                    $meal->category = $meal->categories->first()->category_name ?? 'uncategorized';

                    // Get diet types from tags
                    $meal->diet_type = $meal->tags->pluck('tag_name')->toArray();

                    // Get calories from nutrition info
                    $meal->calories = $meal->recipe?->nutrition_info?->calories ?? 0;

                    // Clean up response
                    unset($meal->pivot);
                    unset($meal->categories);

                    return $meal;
                });

                return $plan;
            });

            return response()->json($plans);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            ValidatePlan::validatePlan($request);

            $user = Auth::user();

            $planData = $request->only(['plan_name', 'start_date', 'end_date']);
            $planData['profile_id'] = $user->profile->profile_id;

            $plan = MealPlan::create($planData);

            return response()->json([
                'success' => true,
                'message' => 'Tạo kế hoạch thành công.',
                'plan' => $plan
            ]);
        }catch(Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Thêm món ăn vào kế hoạch
     */
    public function addMeal(Request $request, $planId)
    {
        try {
            ValidatePlan::validateAddMeal($request);

            $plan = MealPlan::findOrFail($planId);

            // Check ownership
            if ($plan->profile_id !== Auth::user()->profile->profile_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không có quyền thao tác'
                ], 403);
            }

            // Check if meal already exists for this day/time
            $exists = $plan->meals()
                ->wherePivot('day', $request->day)
                ->wherePivot('time', $request->time)
                ->wherePivot('meal_id', $request->meal_id)
                ->exists();

            if ($exists) {
                return response()->json([
                    'success' => false,
                    'message' => 'Món ăn đã tồn tại trong kế hoạch'
                ], 400);
            }

            // Add meal to plan
            $plan->meals()->attach($request->meal_id, [
                'day' => $request->day,
                'time' => $request->time,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Đã thêm món vào kế hoạch'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi thêm món vào kế hoạch',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove meal from plan
     */
    public function removeMeal($planId, $mealId)
    {
        try {
            $plan = MealPlan::findOrFail($planId);

            // Check ownership
            if ($plan->profile_id !== Auth::user()->profile->profile_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không có quyền thao tác'
                ], 403);
            }

            // Remove meal from plan
            $plan->meals()->detach($mealId);

            return response()->json([
                'success' => true,
                'message' => 'Đã xóa món khỏi kế hoạch'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa món khỏi kế hoạch',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get meals for date range
     */
    public function getMealsForDateRange(Request $request)
    {
        try {
            ValidatePlan::validateGetMeal($request);

            $profileId = Auth::user()->profile->profile_id;

            // Get all plans for user in date range
            $plans = MealPlan::where('profile_id', $profileId)
                ->where(function($query) use ($request) {
                    $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                        ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                        ->orWhere(function($q) use ($request) {
                            $q->where('start_date', '<=', $request->start_date)
                                ->where('end_date', '>=', $request->end_date);
                        });
                })
                ->with(['meals' => function($query) use ($request) {
                    $query->wherePivot('day', '>=', $request->start_date)
                        ->wherePivot('day', '<=', $request->end_date)
                        ->with(['recipe', 'tags', 'categories'])
                        ->withPivot('day', 'time');
                }])
                ->get();

            // Flatten meals and add plan info
            $meals = collect();
            foreach ($plans as $plan) {
                foreach ($plan->meals as $meal) {
                    $meal->plan_time = $meal->pivot->time;
                    $meal->plan_day = $meal->pivot->day;
                    $meal->plan_id = $plan->plan_id;
                    unset($meal->pivot);
                    $meals->push($meal);
                }
            }

            return response()->json([
                'success' => true,
                'data' => $meals
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi lấy dữ liệu',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show ($id)
    {
        try {
            $plan = MealPlan::with([
                'user:user_id,user_name',
                'meals'
            ])->findOrFail($id);

            return response()->json($plan);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $planData = ValidatePlan::validatePlan($request, true);
            $plan = MealPlan::with('meals')->findOrFail($id);

            if ($plan->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Không có quyền cập nhật.'
                ], 403);
            }

            $plan->update($planData);

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật kế hoạch thành công.',
                'plan' => $plan
            ]);
        }catch(Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $plan = MealPlan::findOrFail($id);

            if ($plan->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'Không có quyền xóa.'
                ], 403);
            }

            $plan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa kế hoạch thành công.'
            ]);
        }catch(Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Xóa kế hoạch thất bại.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
