<?php

namespace App\Http\Controllers;

use App\Http\Validators\ValidatePlan;
use App\Models\MealPlan;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MealPlanController extends Controller
{
    public function index() {
        try {
            $plan = MealPlan::with([
                'user:user_id,user_name',
                'meals'
            ])->get();

            return response()->json($plan);
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
            $planData = ValidatePlan::validatePlan($request, false);
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
                'message' => 'Cập nhật kế hoạch.',
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
                'message' => 'Xóa thành công.'
            ]);
        }catch(Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Xóa thất bại.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
