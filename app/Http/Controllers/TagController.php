<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Exception;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        try {
            $tags = Tag::with('meals:meal_name')->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $tags,
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tải dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $tag = Tag::create($request->validate([
                'tag_name' => 'required|string|max:50|unique:tag_name',
            ]));

            return response()->json([
                'success' => true,
                'message' => 'Tạo dữ liệu thành công.',
                'tag' => $tag,
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi tạo dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show($id)
    {
        try {
            $tag = Tag::with('meals:meal_name')->findOrFail($id);

            return response()->json([
                'success' => true,
                'tag' => $tag,
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu.',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $tag = Tag::findOrFail($id);

            $tag->update($request->validate([
                'tag_name' => 'required|string|max:50|unique:tag_name',
            ]));

            return response()->json([
                'success' => true,
                'message' => 'Update thành công.',
                'tag' => $tag,
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi update dữ liệu.',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $tag = Tag::withCount('meals')->findOrFail($id);

            if ($tag->meals_count > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không thể xóa tag đang sử dụng.'
                ], 400);
            }

            $tag->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa dữ liệu thành công.',
            ]);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa dữ liệu.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
