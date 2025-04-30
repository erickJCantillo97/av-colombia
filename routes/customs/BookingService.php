<?php

use App\Http\Controllers\BookingService\BookingExtrasController;
use App\Http\Controllers\BookingService\BookingServiceController;
use App\Http\Controllers\BookingService\BookingServiceProveedorController;
use Illuminate\Support\Facades\Route;


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::resource('BookingServices', BookingServiceController::class);
    Route::resource('BookingServiceProveedors', BookingServiceProveedorController::class);
    Route::resource('BookingServiceExtras', BookingExtrasController::class);
    Route::get('getProveedorByBookingService/{bookingServiceId}', [BookingServiceProveedorController::class, 'getProveedorByBookingService'])->name('get.proveedor.by.booking.service');
    Route::controller(BookingServiceController::class)->group(function () {
        Route::get('getAllBookingServicesByDates', 'getAllBookingServices')->name('get.all.booking.services.dates');
        Route::get('getAllBookingServices', 'getAll')->name('get.all.booking');
        Route::get('getBookingServicesNoPayment', 'getBookingServicesNoPayment')->name('get.services.no.payment');
        Route::post('BookingServices/{bookingService}/problematic', 'problematic')->name('booking.problematic');
        Route::get('getBookingTimeRange', 'getBookingTimeRange')->name('get.booking.time.range');
        Route::get('getStatesChange', 'getStatesChange')->name('get.states.change');
        Route::post('cancelarServico/{service}', 'cancelarServicio')->name('cancelar.servicio');
        Route::post('noShowServico/{service}', 'noShowServicio')->name('noshow.servicio');
        Route::post('completarReserva', 'completarReserva')->name('completar.reserva');
    });
});
