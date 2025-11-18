<?php

use App\Http\Controllers\AmenityController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\ContabilidadController;
use App\Http\Controllers\CustomProductControlle;
use App\Http\Controllers\ItineraryController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PagoEntradaController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PaymentProveedorController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Web\AccommodationController as WebAccommodationController;
use App\Http\Controllers\Web\BookingAccommodationController;
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

    Route::get('getProvedorsService/{service}', [ProveedorController::class, 'getProvedorsService'])->name('get.provedors.service');

    Route::get('qrGenerator', function () {
        return Inertia::render('QrGenerator/Index');
    })->name('qr.generator');

    Route::resource('pagoEntradas', PagoEntradaController::class);

    Route::resource('itinerary', ItineraryController::class);

    Route::post('pagoEntradas/storeTicket', [PagoEntradaController::class, 'storeTicket'])->name('pagoEntradas.storeTicket');

    // Rutas para tickets
    Route::resource('tickets', \App\Http\Controllers\TicketController::class)->only(['update', 'destroy']);

    Route::resource('accommodation', WebAccommodationController::class);

    Route::post('photos/upload/{accommodationId}', [WebAccommodationController::class, 'uploadPhotos'])
        ->name('accommodations.photos.upload');

    Route::post('accommodation/{accommodation}/update', [WebAccommodationController::class, 'update'])
        ->name('accommodations.update');

    // Ruta para eliminar imágenes de alojamientos
    Route::delete('accommodation/images/{imageId}', [WebAccommodationController::class, 'destroyImage'])
        ->name('accommodations.images.destroy');

    // Rutas para amenidades
    Route::resource('amenities', AmenityController::class)->only(['store', 'index', 'destroy']);

    // Rutas para reservas de alojamientos
    Route::resource('bookingAccommodations', BookingAccommodationController::class);

    // Rutas adicionales para reservas de alojamientos
    Route::get('search-accommodations', [BookingAccommodationController::class, 'search'])
        ->name('booking-accommodations.search');

    Route::patch('booking-accommodations/{booking}/cancel', [BookingAccommodationController::class, 'cancel'])
        ->name('booking-accommodations.cancel');

    Route::get('booking-accommodations/{booking}/voucher', [BookingAccommodationController::class, 'voucher'])
        ->name('booking-accommodations.voucher');
});

Route::get('getAllServices', [ServiceController::class, 'getServices'])->name('get.all.services');
Route::post('get-service', [ServiceController::class, 'getServiceRecommendation']);
Route::get('showservice/{service}', [ServiceController::class, 'show'])->name('show.services');
Route::get('services-home', [ServiceController::class, 'home'])->name('services.home');
Route::get('check-out/{service}', [ServiceController::class, 'checkOut'])->name('check.out');
Route::get('getServicePagination', [ServiceController::class, 'getServicePagination'])->name('services.get.paginated');
Route::get('getAllFeatures', [ServiceController::class, 'getAllFeatures'])->name('get.all.features');
Route::get('getAllDestinations', [ServiceController::class, 'getAllDestinations'])->name('get.all.destinations');
Route::get('getAllOrigins', [ServiceController::class, 'getAllOrigins'])->name('get.all.origins');

// Ruta pública para ver detalle de alojamiento
Route::get('accommodations/{accommodation}', [WebAccommodationController::class, 'show'])->name('accommodations.show');

// Ruta pública para checkout de alojamiento
Route::get('accommodation-checkout/{accommodation}/{room}', [WebAccommodationController::class, 'checkout'])->name('accommodations.checkout');

// Ruta pública para confirmación de reserva de alojamiento
Route::get('accommodation-booking-success/{booking}', [WebAccommodationController::class, 'bookingSuccess'])->name('accommodations.booking.success');

// // Rutas web para el sistema de alojamientos (para testing o vistas web futuras)
// Route::prefix('accommodations')->name('accommodations.')->group(function () {
//     // Rutas públicas
//     // Route::get('/', [WebAccommodationController::class, 'index'])->name('public.index');
//     Route::get('/{accommodation}', [WebAccommodationController::class, 'show'])->name('public.show');

//     // Rutas protegidas
//     Route::middleware(['auth:sanctum'])->group(function () {
//         Route::get('/my-bookings', [BookingAccommodationController::class, 'index'])->name('my-bookings');
//         Route::post('/book', [BookingAccommodationController::class, 'store'])->name('book');
//     });
// });
