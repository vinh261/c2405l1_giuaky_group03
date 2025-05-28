<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048', // kiểm tra file là ảnh < 2MB
        ]);

        // Lưu file vào disk 'public/images'
        $path = $request->file('image')->store('images', 'public');

        // Tạo URL truy cập công khai
        $url = Storage::url($path);

        return response()->json([
            'success' => true,
            'url'     => $url,
        ]);
    }
}
