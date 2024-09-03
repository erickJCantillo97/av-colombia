<?php

namespace App\Http\Controllers;

use App\Models\BookingService;
use App\Http\Requests\StoreBookingServiceRequest;
use App\Http\Requests\UpdateBookingServiceRequest;
use App\Models\Service;
use Exception;
use Inertia\Inertia;

class BookingServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('BookingServices/Index', [
            'bookingServices' => BookingService::with('service', 'user')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingServiceRequest $request)
    {
        $validateData = $request->validated();
        try{
            $service = Service::find($validateData['service_id']);
            $validateData['service'] = $service->title;
            $validateData['adults_price'] = $service->adult_price;
            $validateData['adult_tarifa'] = $service->adult_tarifa;
            $validateData['boys_tarifa']  = $service->boys_tarifa;
            $validateData['boys_price'] = $service->boys_price;
            $validateData['user_id'] = auth()->user()->id;
            $bookingService = BookingService::create($validateData);
            return response()->json(['message' => 'Reservación guardada correctamente', 'bookingService' => $bookingService], 201);
        }catch(Exception $e){
            return response()->json(['message' => 'Error al guardar la reservación'], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(BookingService $bookingService)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookingService $bookingService)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingServiceRequest $request, BookingService $bookingService)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookingService $bookingService)
    {
        //
    }
}
