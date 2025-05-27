<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Recommend;

class RecommendController extends Controller
{
    // GET /api/recommends
    public function index()
    {
        return response()->json(
          Recommend::with('meals')->get()
        );
    }

    // GET /api/recommends/{id}
    public function show($id)
    {
        return response()->json(
          Recommend::with('meals')->findOrFail($id)
        );
    }
}
