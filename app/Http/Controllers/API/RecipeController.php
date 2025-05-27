<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
  // GET /api/recipes
  public function index()
  {
    return response()->json(Recipe::all());
  }
  // GET /api/recipes/{id}
  public function show($id)
  {
    return response()->json(Recipe::findOrFail($id));
  }
}
