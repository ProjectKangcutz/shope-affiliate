<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // 1. Cek apakah user sudah login
        if (!Auth::check()) {
            return redirect()->route('admin.login')
                ->with('error', 'Silakan login terlebih dahulu untuk mengakses panel admin.');
        }

        // 2. Cek apakah user adalah administrator (is_admin == true)
        if (!Auth::user()->is_admin) {
            abort(403, 'Akses Ditolak: Anda tidak memiliki otoritas Administrator.');
        }

        return $next($request);
    }
}