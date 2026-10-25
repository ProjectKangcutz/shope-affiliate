<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
                // Jalankan sinkronisasi katalog Shopee setiap 6 jam
        $schedule->command('shopee:sync-catalog')->everySixHours();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    protected $routeMiddleware = [
    'auth'          => \App\Http\Middleware\Authenticate::class,
    'admin'         => \App\Http\Middleware\AdminMiddleware::class, // <-- TAMBAHKAN INI
    'guest'         => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle'      => \Illuminate\Routing\Middleware\ThrottleRequests::class,
    'verified'      => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
];
}
