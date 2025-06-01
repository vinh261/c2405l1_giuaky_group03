<?php

namespace App\Providers;

use App\Policies\RecipePolicy;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        ResetPassword::createUrlUsing(function ($notifiable, $token) {
            // Gắn URL frontend thay vì backend
            return "http://localhost:5173/reset-password/{$token}?email=" . urlencode($notifiable->getEmailForPasswordReset());
        });
    }
}
