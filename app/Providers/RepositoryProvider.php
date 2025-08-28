<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $models = [
            'Service',
            'Horario',
            'Lock',
            'State',
            'Note',
            'BookingService',
            'BookingServiceProveedor',
            'BookingExtras',
            'Proveedor',
            'Payment',
            'Ticket',
        ];

        foreach ($models as $model) {
            $this->app->bind('App\\Interfaces\\' . $model . 'RepositoryInterface', 'App\\Repositories\\' . $model . 'Repository');
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
