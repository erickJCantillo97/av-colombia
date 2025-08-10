<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\BookingService\BookingServiceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ServiceController;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/user/{user}', function (User $user) {
    return $user;
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('logout', 'logout')->middleware('auth:sanctum');
});

Route::get('getAllServices', [ServiceController::class , 'getServiceByUser'])->name('api.get.all.services');
Route::post('reservar', [BookingServiceController::class, 'reservarByApi']);
Route::get('getBookingServices/{bookingService}', [BookingServiceController::class, 'show'])->name('bookingServices.show');
Route::get('getService/{slug}/{userId}', [ServiceController::class, 'apiShow'])->name('api.get.service');
Route::get('obtenerHorariosByServiceBetweeDays/{serviceId}/{startDate}', [ServiceController::class, 'obtenerHorariosByServiceBetweeDays'])->name('api.get.horarios');
Route::get('generateLinkToPayment/{userId}', [PaymentController::class, 'generateLinkToPayment'])->name('api.generate.link.payment');