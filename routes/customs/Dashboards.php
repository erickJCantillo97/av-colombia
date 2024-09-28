<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('getServicesNopay', [DashboardController::class, 'getServicesNopay'])->name('services.no.pay');
?>