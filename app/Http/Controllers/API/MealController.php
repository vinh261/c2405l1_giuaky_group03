<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Meal;

class MealController extends Controller
{
    // GET /api/meals
    public function index()
    {
        return response()->json(Meal::all());
    }

    // GET /api/meals/{id}
    public function show($id)
    {
        return response()->json(Meal::findOrFail($id));
    }
}
