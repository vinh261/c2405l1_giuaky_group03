<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NutritionInfo;

class NutritionInfoController extends Controller
{
    // GET /api/nutrition-info
    public function index()
    {
        return response()->json(NutritionInfo::all());
    }

    // GET /api/nutrition-info/{recipe_id}
    public function show($recipeId)
    {
        return response()->json(
            NutritionInfo::findOrFail($recipeId)
        );
    }
}
