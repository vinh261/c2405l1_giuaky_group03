<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Favorite;

class FavoriteController extends Controller
{
    // GET /api/favorites
    public function index()
    {
        return response()->json(Favorite::all());
    }

    // GET /api/favorites/{id}
    public function show($id)
    {
        return response()->json(Favorite::findOrFail($id));
    }
}
