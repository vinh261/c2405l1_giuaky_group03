<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{

    // LogoutController.php
    public function __invoke(Request $request)
    {
        /**
         * Logout, xóa token
         */
        Auth::guard('web')->logout(); // <<< Dùng web guard

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['message' => 'Đã đăng xuất thành công']);
    }
}
