<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingServiceRequest;
use App\Http\Requests\UpdateBookingServiceRequest;
use App\Models\BookingExtras;
use App\Models\BookingService;
use App\Models\Channel;
use App\Models\Note;
use App\Models\Service;
use App\Models\State;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Exception;

class BookingServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $status = State::where('state', 'CANCELADA')->pluck('statable_id')->toArray();

        // return $status;

        $booking = BookingService::whereIn('id', $status)->get();

        $booking = BookingService::with('service', 'extras', 'user', 'payments', 'payments.metohdPayment', 'proveedors', 'proveedors.proveedor', 'channel', 'notes')->orderBy('created_at', 'DESC')->get()->map(function ($booking) {
            return [
                'id' => $booking->id,
                'method_id' => $booking->method_id,
                'service_id' => $booking->service_id,
                'channel_id' => $booking->channel_id,
                'service' => $booking->service,
                'user' => $booking->user,
                'channel' => $booking->channel,
                'date' => $booking->date,
                'hour' => $booking->hour,
                'adults' => $booking->adults,
                'boys' => $booking->boys,
                'status' => $booking->status,
                'cliente_name' => $booking->cliente_name,
                'created_at' => $booking->created_at,
                'cliente_email' => $booking->cliente_email,
                'cliente_phone' => $booking->cliente_phone,
                'cliente_building' => $booking->cliente_building,
                'cliente_city' => $booking->cliente_city,
                'notes' => $booking->notes->count(),
                'fecha_cancelacion' => $booking->fecha_cancelacion,
                'time_service' => $booking->time_service,
                'observations' => $booking->observations,
                'total_real' => $booking->total_real,
                'saldo' => $booking->saldo,
                'total' => $booking->total,
                'channel' => $booking->channel,
                'total_price_sales' => $booking->total_price_sales,
                'proveedors_names' => $booking->proveedors->map(function ($proveedor) {
                    return $proveedor->proveedor->nombre;
                })->implode(', '),
                'problematic' => $booking->problematic,
                'proveedors' => $booking->proveedors->map(function ($proveedor) {
                    return [
                        'id' => $proveedor->id,
                        'proveedor_id' => $proveedor->proveedor->id,
                        'proveedor' => $proveedor,
                        'cost' => $proveedor->cost,
                        'concept' => $proveedor->concept,
                    ];
                }),
                'extras' => $booking->extras,
            ];
        });
        if (request()->expectsJson()) {
            return response()->json(['bookingServices' => $booking], 200);
        }
        return Inertia::render('BookingServices/Index', [
            'bookingServices' => $booking,
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
            $booking = reservar($validateData);
            if ($validateData['observations']) {
                createNote($booking, $validateData['observations']);
            }
            addBookingServiceProveedors($booking, request('proveedors'));
            addBookingServiceExtras($booking, request('extras'));
            storeState(
                $booking,
                'reservado',
            );
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Reservación guardada correctamente', 'bookingService' => $booking], 201);
            }
            return back()->with('message', 'Reservación guardada correctamente');
        } catch (Exception $e) {
            dd($e);
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
    public function update(UpdateBookingServiceRequest $request, $bookingService)
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
                    'proveedor_id' => $proveedor['proveedor']['id'],
                    'cost' => $proveedor['costo'],
                    'concept' => $proveedor['proveedor']['pivot']['concept'],
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
    }

    public function getBookingServicesNoPayment()
    {
        $bookingNoPayment = BookingService::with('payments')->get()->filter(function ($booking) {
            return $booking->payments->count() == 0 || $booking->payments->sum('amount') < $booking->total_price;
        });
        return response()->json(['bookingNoPayment' => $bookingNoPayment], 200);
    }

    public function problematic(BookingService $bookingService)
    {
        // $problematic = $bookingService->problematic == '1' ? 1 : 0;
        $bookingService->update(['problematic' => !$bookingService->problematic]);
        return back()->with('message', 'Estado actualizado correctamente');
    }

    public function getBookingTimeRange(Request $request)
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

    public function getStatesChange(Request $request)
    {
        $date = $request->date ?? now();

        $statues = State::where('user_id', 5)->whereDate('created_at', $date)->orderByDesc('created_at')->with('user', 'statable')->get();

        return response()->json([
            'status' => $statues
        ]);
    }

    public function completarReserva(Request $request)
    {
        $booking = BookingService::find($request->service_id);
        if (isset($booking->extra)) {
            foreach ($booking->extras as $extra) {
                BookingExtras::find($extra->id)->update([
                    'unit_cost' => $extra->unit_cost,
                    'total_cost' => $extra->unit_cost * $extra->cantidad,
                ]);
            }
        }

        storeState($booking, request('status'), 1);
        return back()->with('message', 'Reservación completada correctamente');
    }

    public function cancelarServicio(BookingService $service, Request $request)
    {
        foreach ($request->proveedors as $proveedor) {
            $proveedorService = DB::table('booking_proveedors')
                ->where('id', $proveedor['proveedor_id'])
                ->update([
                    'cost' => $proveedor['costo_penalidad'],
                ]);
        }
        $service->update([
            'fecha_cancelacion' => $request->date
        ]);

        storeState($service, 'CANCELADA', 1);
        return back()->with('message', 'Reservación cancelada correctamente');
    }

    public function noShowServicio(BookingService $service, Request $request)
    {
        foreach ($request->proveedors as $proveedor) {
            $proveedorService = DB::table('booking_proveedors')
                ->where('id', $proveedor['proveedor_id'])
                ->update([
                    'cost' => $proveedor['totalpayment'],
                ]);
        }
        if ($request['notes']) {
            Note::create([
                'booking_service_id' => $service->id,
                'note' => $request['notes'],
                'user_id' => auth()->user()->id,
            ]);
        };

        // $service->update([
        //     'fecha_cancelacion' => $request->date
        // ]);
        storeState($service, 'NO SHOW', 1);
        return back()->with('message', 'Reservación marcada como no show correctamente');
    }
}
