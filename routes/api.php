<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\BookingServiceController;
use App\Http\Controllers\ServiceController;
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

Route::get('get-services/', [ServiceController::class, 'index']);
Route::post('reservar', [BookingServiceController::class, 'reservarByApi']);
Route::get('getBookingServices/{bookingService}', [BookingServiceController::class, 'show'])->name('bookingServices.show');
