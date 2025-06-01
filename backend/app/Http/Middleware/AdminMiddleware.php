<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Vui lòng đăng nhập để tiếp tục.',
            ], 401);
        }

        $user = Auth::user();

        // Kiểm tra nếu user không có profile
        if (!$user->profile) {
            return response()->json([
                'message' => 'Không tìm thấy thông tin profile của người dùng.',
            ], 403);
        }

        if ($user->profile->role !== 'admin') {
            return response()->json([
                'message' => 'Bạn không có quyền truy cập.',
            ], 403);
        }

        return $next($request);
    }
}
