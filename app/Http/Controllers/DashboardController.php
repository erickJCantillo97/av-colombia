<?php

namespace App\Http\Controllers;

use App\Models\BookingService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getServicesNopay(){
     
        if(auth()->user()->rol != 'admin'){
            $bookings =  BookingService::with('service', 'user')
            ->where('payment', 'pending')
            ->where('user_id' , auth()->user()->id)
            ->get();
            return response()->json(['bookings' => $bookings], 200);
        }

    }
}
