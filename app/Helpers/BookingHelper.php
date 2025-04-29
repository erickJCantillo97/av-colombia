<?php

use App\Models\BookingService;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

function reservar(
    $dataReserva = [],
) {
    $dataReserva['date'] = Carbon::parse($dataReserva['date'])->format('Y-m-d');
    $service = Service::find($dataReserva['service_id']);
    $dataReserva['boys'] = $dataReserva['boys'] ?? 0;
    $dataReserva['hour'] = explode(',', request('date'))[1];
    $dataReserva['user_id'] = request('user_id') ?? Auth::id();
    $dataReserva['service'] = $service->title;
    $dataReserva['adults_price'] = $service->adults_price;
    $dataReserva['adult_tarifa'] = $service->adult_tarifa;
    $dataReserva['boys_price'] = $service->boys_price;
    $dataReserva['boys_tarifa'] = $service->boy_tarifa;
    return BookingService::create($dataReserva);
}

function addBookingServiceProveedors(BookingService $bookingService, $proveedors)
{
    foreach ($proveedors as $proveedor) {
        if ($proveedor['costo'] != 0 && $proveedor['proveedor']) {
            $bookingService->proveedors()->create([
                'booking_service_id' => $bookingService->id,
                'proveedor_id' => $proveedor['proveedor']['id'],
                'cost' => $proveedor['costo'],
                'concept' => $proveedor['proveedor']['pivot']['concept'],
            ]);
        }
    }
}

function addBookingServiceExtras(BookingService $bookingService, $extras)
{
    foreach ($extras as $extra) {
        if ($extra['cantidad']) {
            $bookingService->extras()->create([
                'booking_service_id' => $bookingService->id,
                'cantidad' => $extra['cantidad'],
                'description' => $extra['description'],
                'unit_price' => $extra['unit_price'],
                'total_price' => $extra['cantidad'] * $extra['unit_price'],
            ]);
        }
    }
}
