<?php

namespace App\Http\Controllers\BookingService;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingService\StoreBookingServiceRequest;
use App\Http\Requests\BookingService\UpdateBookingServiceRequest;
use App\Interfaces\BookingServiceRepositoryInterface;
use App\Models\BookingExtras;
use App\Models\BookingService;
use App\Models\Channel;
use App\Models\Horario;
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
    public function __construct(
        private BookingServiceRepositoryInterface $bookingServiceRepository,
    ) {}

    public function index()
    {
        return Inertia::render('BookingServices/Index', [
            'bookingServices' => $this->bookingServiceRepository->getRecentAll(),
        ]);
    }

    public function create()
    {
        return Inertia::render('BookingServices/Create');
    }

    public function getAllBookingServices()
    {
        $booking = $this->bookingServiceRepository->getAll();
        return response()->json(['bookingServices' => $booking], 200);
    }

    public function store(StoreBookingServiceRequest $request)
    {
        DB::beginTransaction();
        try {
            $booking = $this->bookingServiceRepository->create($request->validated());
            DB::commit();
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Reservación guardada correctamente', 'bookingService' => $booking], 201);
            }
            return redirect()->route('BookingServices.edit',  $booking->id);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al guardar la reservación'], 500);
        }
    }

    public function show(BookingService $bookingService)
    {
        return response()->json(['booking_service' => $bookingService], 200);
    }

    public function edit($bookingService)
    {
        $bookingService = $this->bookingServiceRepository->getById($bookingService);
        // dd($bookingService);
        return Inertia::render('BookingServices/Edit', [
            'bookingService' => $bookingService,
            'bookingServiceProveedors' => $bookingService->proveedors->load('proveedor'),
            'bookingServiceExtras' => $bookingService->extras,
            'changes' => $bookingService->changes->load('user'),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingServiceRequest $request, $bookingService)
    {
        DB::beginTransaction();
        try {
            $bookingService = $this->bookingServiceRepository->update($bookingService, $request->validated());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al actualizar la reservación'], 500);
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
        } catch (Exception $e) {
            return back()->withErrors('message', 'Error al eliminar la reservación');
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
        if ($request->conductor) {
            $booking->update([
                'conductor' => $request->conductor,
                'placa' => $request->placa,
                'total_pago_proveedor' => $request->value,
            ]);
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

    public function reservarByApi(Request $request)
    {
        $data = $request->validate([
            'adults' => 'required|numeric',
            'boys' => 'required|numeric',
            'service_id' => 'required|uuid',
            'user_id' => 'required|numeric',
            'date' => 'required|date',
            'adult_tarifa' => 'required|numeric',
            'total' => 'required|numeric',
            'cliente_name' => 'required|string',
            'cliente_phone' => 'required',
            'cliente_building' => 'required|string',
            'cliente_city' => 'required|string',
        ]);
        $data['saldo'] = $data['total'] - $request->abono;
        $data['hour'] = Horario::find($request->time)->start;
        $data['channel_id'] = Channel::where('name', 'Vendedor')->first()->id;
        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d');
        $service = Service::find($data['service_id']);
        $data['boys_tarifa'] = $service->boy_tarifa;
        $data['boys_price'] = $service->boys_price;
        $data['adults_price'] = $service->adults_price;

        $data['service'] = $service->title;
        $data['total_real'] = $service->adults_price * $data['adults'];
        if (request()->file('soporte')) {
            $data['file'] = request()->file('soporte')->store('soportes');
        }
        $booking = BookingService::create($data);
        storeState(
            $booking,
            'SIN CONFIRMAR',
        );
        return response()->json([
            'message' => 'Reservación guardada correctamente',
            'bookingService' => $booking,
            'status' => true,
        ], 201);
    }
}
