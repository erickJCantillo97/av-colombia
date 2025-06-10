<?php

use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\ContabilidadController;
use App\Http\Controllers\CustomProductControlle;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PaymentProveedorController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use App\Models\BookingService;
use App\Models\PaymentProveedor;
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
        return Inertia::render('Dashboard/Dashboard');
    })->name('dashboard');

    // Routes for services
  
    // Routes for bookings services

    Route::resource('users', UserController::class)->except(['update']);

    Route::controller(UserController::class)->group(function () {
        Route::post('users/{user}/update', 'update')->name('users.update');
    });

    Route::get('portafolio', function () {
        return Inertia::render('Portafolio/Index');
    })->name('portafolio');

    Route::resource('paymentMethods', PaymentMethodController::class);

    Route::post('custom-product-price', [CustomProductControlle::class, 'store'])->name('custom.product');

    Route::resource('proveedors', ProveedorController::class);
    Route::get('settings', [SettingController::class, 'index'])->name('settings');

    Route::resource('payments', PaymentController::class);
    Route::put('payments/{payment}/setState', [PaymentController::class, 'setState'])->name('payment.set.state');

    Route::resource('channels', ChannelController::class);

    Route::post('availability', [AvailabilityController::class, 'store'])->name('availability.store');
    Route::put('availability/{availability}', [AvailabilityController::class, 'update'])->name('availability.update');
    Route::delete('availability/{availability}', [AvailabilityController::class, 'destroy'])->name('availability.destroy');
    Route::post('availability/{availability}/syncPrices', [AvailabilityController::class, 'syncPrices'])->name('availability.syncPrices');

    Route::get('contabilidad', [ContabilidadController::class, 'index'])->name('contabilidad');

    Route::get('pagos', [ContabilidadController::class, 'pagos'])->name('pagos');

    // Route::get('getVentasProveedores', [ContabilidadController::class, 'getVentasProveedores'])->name('get.ventas.proveedores');
    Route::get('getCostosProveedores', [ContabilidadController::class, 'getCostosProveedores'])->name('get.costos.proveedores');

    Route::resource('notes', NoteController::class);

    Route::post('paymentProveedors/{paymentProveedor}/update', [PaymentProveedorController::class, 'update'])->name('paymentProveedors.update');

    Route::resource('paymentProveedors', PaymentProveedorController::class)->except(['update']);

    Route::get('getVentas', [ContabilidadController::class, 'getVentas'])->name('get.ventas');

    Route::get('getTotalReservas', [ContabilidadController::class, 'getTotalReservas'])->name('get.total.reservas');

    Route::get('addConcept', [ProveedorController::class, 'addConcept'])->name('add.concept');
    // 9d9b2742-4af6-4c64-8511-4c9c7eb9c1fd
    Route::get('getProvedorsService/{service}', [ProveedorController::class, 'getProvedorsService'])->name('get.provedors.service');
    // route::get()
    // Route::post('uploadProveedors', [ProveedorController::class, 'upload'])->name('upload.proveedors');
});

Route::get('getAllServices', [ServiceController::class , 'getServices'])->name('get.all.services');
Route::post('get-service', [ServiceController::class, 'getServiceRecommendation']);
Route::get('showservice/{service}', [ServiceController::class, 'show'])->name('show.services');
Route::get('services-home', [ServiceController::class, 'home'])->name('services.home');
Route::get('check-out', [ServiceController::class, 'checkOut'])->name('check.out');
