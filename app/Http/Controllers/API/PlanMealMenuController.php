<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PlanMealMenu;
use Illuminate\Http\Request;

class PlanMealMenuController extends Controller
{
    // GET /api/plan-meal-menu
    public function index()
    {
        return response()->json(
          PlanMealMenu::with(['plan','meal'])->get()
        );
    }

    // GET /api/plan-meal-menu/{plan}/{meal}/{date}
    public function show($planId, $mealId, $serveDate)
    {
        $item = PlanMealMenu::with(['plan','meal'])
            ->where('plan_id', $planId)
            ->where('meal_id', $mealId)
            ->where('serve_date', $serveDate)
            ->firstOrFail();

        return response()->json($item);
    }
}
