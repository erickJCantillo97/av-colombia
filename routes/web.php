<?php

use App\Http\Controllers\BookingServiceController;
use App\Http\Controllers\CustomProductControlle;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('services', ServiceController::class);
    Route::resource('users', UserController::class);

    Route::get('portafolio', function () {
        return Inertia::render('Portafolio/Index');
    })->name('portafolio');

    Route::post('reservar', [ServiceController::class, 'reservar'])->name('reservar');
    Route::resource('BookingServices', BookingServiceController::class);
    Route::resource('payments', PaymentController::class);
    Route::get('getBookingServicesNoPayment', [BookingServiceController::class, 'getBookingServicesNoPayment'])->name('get.services.no.payment');
    Route::resource('paymentMethods', PaymentMethodController::class);

    Route::post('custom-product-price', [CustomProductControlle::class, 'store'])->name('custom.product');
    Route::get('settings', function () {
        return Inertia::render('Settings/Index');
    })->name('settings');
});

Route::get('get-services', [ServiceController::class, 'index'])->name('get.services');
Route::get('showservice/{service}', [ServiceController::class, 'show'])->name('show.services');
