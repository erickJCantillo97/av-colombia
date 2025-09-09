<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Gate para gestión de alojamientos
        Gate::define('manage-accommodations', function ($user) {
            return $user->rol === 'proveedor' || $user->rol === 'admin' || $user->rol === 'superadmin';
        });
    }
}
