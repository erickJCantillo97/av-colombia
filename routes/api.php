<?php

use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\BookingService\BookingServiceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServiceController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/user/{user}', function (User $user) {
    return $user;
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('logout', 'logout')->middleware('auth:sanctum');
});

// Rutas existentes
Route::get('getAllServices', [ServiceController::class, 'getServiceByUser'])->name('api.get.all.services');
Route::post('reservar/{userId}', [BookingServiceController::class, 'reservarByApi']);
Route::get('getBookingServices/{bookingService}', [BookingServiceController::class, 'show'])->name('bookingServices.show');
Route::get('getService/{slug}/{userId}', [ServiceController::class, 'apiShow'])->name('api.get.service');
Route::get('obtenerHorariosByServiceBetweeDays/{serviceId}/{startDate}', [ServiceController::class, 'obtenerHorariosByServiceBetweeDays'])->name('api.get.horarios');
Route::get('generateLinkToPayment/{userId}', [PaymentController::class, 'generateLinkToPayment'])->name('api.generate.link.payment');

// Nuevas rutas para el sistema de alojamientos v1
Route::get('accommodations/available', [AccommodationController::class, 'availableAccommodations'])
    ->name('api.accommodations.available');
//     Route::get('reviews', [ReviewController::class, 'index'])
//         ->name('api.reviews.index');
//     Route::get('reviews/{review}', [ReviewController::class, 'show'])
//         ->name('api.reviews.show');

//     // Rutas protegidas que requieren autenticación
//     Route::middleware('auth:sanctum')->group(function () {

//         // Rutas de reservas
//         Route::apiResource('bookings', BookingController::class);

//         // Rutas de reseñas (crear, editar, eliminar)
//         Route::post('reviews', [ReviewController::class, 'store'])
//             ->name('api.reviews.store');
//         Route::put('reviews/{review}', [ReviewController::class, 'update'])
//             ->name('api.reviews.update');
//         Route::delete('reviews/{review}', [ReviewController::class, 'destroy'])
//             ->name('api.reviews.destroy');

//         // Rutas adicionales de alojamientos para propietarios (futuras implementaciones)
//         Route::post('accommodations', [AccommodationController::class, 'store'])
//             ->name('api.accommodations.store');
//         Route::put('accommodations/{accommodation}', [AccommodationController::class, 'update'])
//             ->name('api.accommodations.update');
//         Route::delete('accommodations/{accommodation}', [AccommodationController::class, 'destroy'])
//             ->name('api.accommodations.destroy');
//     });
// });

// Descomenta o agrega estas rutas para la API
Route::middleware('api')->group(function () {
    Route::get('accommodations', [AccommodationController::class, 'index'])
        ->name('api.accommodations.index');  // Ruta para listar con filtros y paginación

    // Otras rutas si las necesitas (descomenta según sea necesario)
    Route::get('accommodations/{accommodation}', [AccommodationController::class, 'show'])
        ->name('api.accommodations.show');

    Route::get('accommodations/{accommodation}/availability', [AccommodationController::class, 'checkAvailability'])
        ->name('api.accommodations.availability');

    // Rutas protegidas (si usas auth, como Sanctum)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('accommodations', [AccommodationController::class, 'store'])
            ->name('api.accommodations.store');

        Route::put('accommodations/{accommodation}', [AccommodationController::class, 'update'])
            ->name('api.accommodations.update');

        Route::delete('accommodations/{accommodation}', [AccommodationController::class, 'destroy'])
            ->name('api.accommodations.destroy');
    });
});
