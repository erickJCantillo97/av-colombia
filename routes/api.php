<?php

use App\Http\Controllers\ServiceController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user/{user}', function (User $user) {
    return $user;
});


Route::get('get-services/', [ServiceController::class, 'index']);
Route::post('reservar', [ServiceController::class, 'reservar']);
