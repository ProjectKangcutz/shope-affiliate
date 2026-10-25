<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    /**
     * Tampilkan halaman form login admin
     */
    public function showLoginForm()
    {
        // Jika sudah login dan admin, langsung ke dashboard
        if (Auth::check() && Auth::user()->is_admin) {
            return redirect()->route('admin.dashboard');
        }

        return view('admin.auth.login');
    }

    /**
     * Proses autentikasi login dengan proteksi Brute-Force Rate Limiting & Session Fixation Guard
     */
    public function login(Request $request)
    {
        // 1. Validasi input form
        $request->validate([
            'email'    => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:6'],
        ], [
            'email.required'    => 'Email admin wajib diisi.',
            'email.email'       => 'Format email tidak valid.',
            'password.required' => 'Password wajib diisi.',
            'password.min'      => 'Password minimal 6 karakter.',
        ]);

        // 2. Proteksi Brute-Force: Kunci throttle IP + Email (Maksimal 5x gagal per 60 detik)
        $throttleKey = Str::transliterate(Str::lower($request->input('email')) . '|' . $request->ip());

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            
            throw ValidationException::withMessages([
                'email' => "Terlalu banyak percobaan login gagal. Demi keamanan, akun dikunci sementara selama {$seconds} detik.",
            ]);
        }

        // 3. Coba Autentikasi Kredensial
        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            $user = Auth::user();

            // 4. Verifikasi bahwa user adalah Administrator
            if (!$user->is_admin) {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                RateLimiter::hit($throttleKey, 60);

                return back()->withErrors([
                    'email' => 'Akses ditolak: Akun Anda tidak memiliki hak akses administrator.',
                ])->onlyInput('email');
            }

            // 5. Bersihkan counter throttle jika berhasil
            RateLimiter::clear($throttleKey);

            // 6. Regenerasi Session ID untuk mencegah Session Fixation
            $request->session()->regenerate();

            \Illuminate\Support\Facades\Log::info("Admin login sukses: {$user->email} [IP: {$request->ip()}]");

            return redirect()->intended(route('admin.dashboard'))
                ->with('success', "Selamat datang kembali, {$user->name}!");
        }

        // 7. Jika salah, tambahkan hit ke rate limiter
        RateLimiter::hit($throttleKey, 60);

        return back()->withErrors([
            'email' => 'Kredensial login (Email atau Password) salah.',
        ])->onlyInput('email');
    }

    /**
     * Logout aman dengan regenerasi CSRF Token
     */
    public function logout(Request $request)
    {
        $userEmail = Auth::user()?->email;

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        \Illuminate\Support\Facades\Log::info("Admin logout: {$userEmail} [IP: {$request->ip()}]");

        return redirect()->route('admin.login')
            ->with('info', 'Anda telah berhasil logout dengan aman.');
    }
}