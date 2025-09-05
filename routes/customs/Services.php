<?php

use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TicketTypeController;
use Illuminate\Support\Facades\Route;


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::resource('services', ServiceController::class);
    Route::resource('ticketTypes', TicketTypeController::class);
    Route::get('getTicketTypes', [TicketTypeController::class, 'getTicketTypes'])->name('get.ticket.types');
    
    Route::controller(ServiceController::class)->group(function () {
        Route::post('services/{service}/lock', 'lock')->name('services.lock');
        Route::put('updateServiceStart/{service}', 'updateStart')->name('update.start');
        Route::post('uploadFile/{service}', 'uploadImage')->name('upload.images');
        Route::delete('deleteFile/{image}', 'deleteImage')->name('delete.images');
        Route::post('services/{lock}/unlock', 'unlock')->name('services.unlock');
        // Route::post('services/setStatus', 'setStatus')->name('set.states');
        Route::post('service/setPortada/{service}', 'setPortada')->name('set.portada');
        Route::get('services/proveedors/{id}', 'getProveedorsByService')->name('get.proveedors.by.service');
    });
});
// Route::post('reservar', 'reservar')->name('reservar');


