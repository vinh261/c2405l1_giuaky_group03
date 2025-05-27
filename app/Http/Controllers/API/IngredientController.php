<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;

class IngredientController extends Controller
{
    // GET /api/ingredients
    public function index()
    {
        return response()->json(Ingredient::all());
    }

    // GET /api/ingredients/{id}
    public function show($id)
    {
        return response()->json(Ingredient::findOrFail($id));
    }
}
