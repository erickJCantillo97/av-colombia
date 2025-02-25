<?php

namespace App\Http\Controllers;

use App\Models\BookingService;
use App\Http\Requests\StoreBookingServiceRequest;
use App\Http\Requests\UpdateBookingServiceRequest;
use App\Models\Channel;
use App\Models\Service;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (request()->expectsJson()) {
            return response()->json(['bookingServices' => BookingService::with('service', 'user', 'payments', 'payments.metohdPayment', 'proveedors', 'proveedors.proveedor', 'channel', 'notes')->get()], 200);
        }
        return Inertia::render('BookingServices/Index', [
            'bookingServices' => BookingService::with('service', 'user', 'payments', 'payments.metohdPayment', 'proveedors', 'proveedors.proveedor', 'channel')->get()
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
        try {
            $service = Service::find($validateData['service_id']);

            $validateData['boys'] = $validateData['boys'] ?? 0;
            $validateData['service'] = $service->title;
            $validateData['adults_price'] = $service->adult_price;
            $validateData['adult_tarifa'] = $service->adult_tarifa;
            $validateData['boys_tarifa']  = $service->boys_tarifa;
            $validateData['boys_price'] = $service->boys_price;
            $validateData['channel_id'] = $validateData['channel_id'] ?? Channel::where('name', 'Pagina Web')->first()->id;
            $validateData['user_id'] = auth()->user()->id;
            $bookingService = BookingService::create($validateData);

            return response()->json(['message' => 'Reservación guardada correctamente', 'bookingService' => $bookingService], 201);
        } catch (Exception $e) {
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
    public function update(UpdateBookingServiceRequest $request,  $bookingService)
    {
        $booking = BookingService::find($bookingService);
        $validate = $request->validated();
        $validate['date'] = Carbon::parse($validate['date'])->format('Y-m-d');
        $service = Service::find($validate['service_id']);
        $validate['boys'] = $validate['boys'] ?? 0;
        $validate['hour'] = explode(',', request('date'))[1];
        $validate['user_id'] = request('user_id') ?? auth()->user()->id;
        $validate['service'] = $service->title;
        $validate['adults_price'] = $service->adults_price;
        $validate['adult_tarifa'] = $service->adult_tarifa;
        $validate['boys_price'] = $service->boys_price;
        $validate['boys_tarifa'] = $service->boy_tarifa;
        $booking->update($validate);
        $booking->proveedors()->delete();
        // $booking->proveedors()->attach(request('proveedors'));
        foreach (request('proveedors') as $proveedor) {
            if ($proveedor['costo'] && $proveedor['proveedor'])
                $booking->proveedors()->create([
                    'booking_service_id' => $booking->id,
                    'proveedor_id' => $proveedor['proveedor'],
                    'cost' => $proveedor['costo'],
                ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($bookingService)
    {
        try {
            BookingService::find($bookingService)->delete();
            return back()->with('message', 'Reservación eliminada correctamente');
            // return response()->json(['message' => 'Reservación eliminada correctamente'], 200);
        } catch (Exception $e) {
            return back()->withErrors('message', 'Error al eliminar la reservación');
            // return response()->json(['message' => 'Error al eliminar la reservación'], 500);
        }
        // BookingService::find($bookingService)->delete();
        // $bookingService->delete();
    }

    public function getBookingServicesNoPayment()
    {
        // $bookingNoPayment = BookingService::where('payment', 'pendiente')->get();
        $bookingNoPayment = BookingService::with('payments')->get()->filter(function ($booking) {
            return $booking->payments->count() == 0 || $booking->payments->sum('amount') < $booking->total_price;
        });

        return response()->json(['bookingNoPayment' => $bookingNoPayment], 200);
    }

    public function problematic(BookingService $bookingService)
    {
        // $problematic = $bookingService->problematic == '1' ? 1 : 0;
        $bookingService->update(['problematic' => !$bookingService->problematic]);
        return  back()->with('message', 'Estado actualizado correctamente');
    }


    public function  getBookingTimeRange(Request $request)
    {
        $startDate = Carbon::parse($request->start_date) ?? Carbon::now();
        $endDate = Carbon::parse($request->end_date) ?? Carbon::now();
        $bookingTimeRange = BookingService::with('proveedors', 'proveedors.proveedor', 'notes', 'notes.user')->whereBetween('date', [$startDate, $endDate])->get()->map(function ($booking) {
            return [
                'title' => $booking->service,
                'fecha' => Carbon::parse($booking->date)->format('d/m/Y'),
                'price' => $booking->total_price,
                'total_cost' => $booking->proveedors->sum('cost'),
                'adults' => $booking->adults,
                'cliente_name' => $booking->cliente_name,
                'observaciones' => $booking->observations,
                'notas' => $booking->notes->map(function ($note) {
                    return [
                        'note' => $note->note,
                        'created_at' => $note->created_at,
                        'user' => $note->user->name,
                    ];
                }),
                'status' => $booking->status,
                'proveedors' => $booking->proveedors->map(function ($proveedor) {
                    return [
                        'proveedor_id' => $proveedor->proveedor->id,
                        'proveedor' => $proveedor->proveedor->nombre,
                        'cost' => $proveedor->cost,
                    ];
                }),
            ];
        });
        $proveedores = $bookingTimeRange->map(function ($booking) {
            return $booking['proveedors'];
        })->flatten(1)->unique('proveedor_id')->values();
        return response()->json(['bookingTimeRange' => $bookingTimeRange, 'proveedores' => $proveedores], 200);
    }
}
