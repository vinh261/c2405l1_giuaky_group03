<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MealPlan;

class MealPlanController extends Controller
{
    // GET /api/meal-plans
    public function index()
    {
        return response()->json(MealPlan::all());
    }

    // GET /api/meal-plans/{id}
    public function show($id)
    {
        return response()->json(MealPlan::findOrFail($id));
    }
}
