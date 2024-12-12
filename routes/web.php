<?php

use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\BookingServiceController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\CustomProductControlle;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use App\Models\Service;
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

    Route::resource('services', ServiceController::class)->except(['update']);
    Route::post('services/{service}/update', [ServiceController::class, 'update'])->name('services.update');
    Route::post('services/{service}/lock', [ServiceController::class, 'lock'])->name('services.lock');

    Route::resource('users', UserController::class);

    Route::get('portafolio', function () {
        return Inertia::render('Portafolio/Index');
    })->name('portafolio');

    Route::post('reservar', [ServiceController::class, 'reservar'])->name('reservar');
    Route::resource('BookingServices', BookingServiceController::class);
    Route::put('updateServiceStart/{service}', [ServiceController::class, 'updateStart'])->name('update.start');

    Route::get('getBookingServicesNoPayment', [BookingServiceController::class, 'getBookingServicesNoPayment'])->name('get.services.no.payment');
    Route::post('BookingServices/{bookingService}/problematic', [BookingServiceController::class, 'problematic'])->name('booking.problematic');
    Route::resource('paymentMethods', PaymentMethodController::class);

    Route::post('custom-product-price', [CustomProductControlle::class, 'store'])->name('custom.product');

    Route::resource('proveedors', ProveedorController::class);
    Route::get('settings', [SettingController::class, 'index'])->name('settings');
    Route::post('uploadFile/{service}', [ServiceController::class, 'uploadImage'])->name('upload.images');
    Route::delete('deleteFile/{image}', [ServiceController::class, 'deleteImage'])->name('delete.images');

    Route::resource('payments', PaymentController::class);
    Route::put('payments/{payment}/setState', [PaymentController::class, 'setState'])->name('payment.set.state');
    Route::post('services/{lock}/unlock', [ServiceController::class, 'unlock'])->name('services.unlock');
    Route::post('services/setStatus', [ServiceController::class, 'setStatus'])->name('set.states');


    Route::get('services/proveedors/{service}', [ServiceController::class, 'getProveedors'])->name('get.proveedors');
    Route::resource('channels', ChannelController::class);

    Route::post('availability', [AvailabilityController::class, 'store'])->name('availability.store');
    Route::put('availability/{availability}', [AvailabilityController::class, 'update'])->name('availability.update');
    Route::delete('availability/{availability}', [AvailabilityController::class, 'destroy'])->name('availability.destroy');
    Route::post('availability/{availability}/syncPrices', [AvailabilityController::class, 'syncPrices'])->name('availability.syncPrices');
});

Route::get('get-services', [ServiceController::class, 'index'])->name('get.services');
Route::get('showservice/{service}', [ServiceController::class, 'show'])->name('show.services');
Route::get('services-home', [ServiceController::class, 'home'])->name('services.home');
