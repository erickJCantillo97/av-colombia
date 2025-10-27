<?php

namespace App\Http\Controllers\BookingService;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingService\BookingClientService;
use App\Http\Requests\BookingService\StoreBookingServiceRequest;
use App\Http\Requests\BookingService\UpdateBookingServiceRequest;
use App\Interfaces\BookingServiceRepositoryInterface;
use App\Interfaces\PaymentRepositoryInterface;
use App\Mail\BookingConfirmation;
use App\Models\BookingExtras;
use App\Models\BookingService;
use App\Models\Channel;
use App\Models\Horario;
use App\Models\Note;
use App\Models\PagoSaldos;
use App\Models\Service;
use App\Models\State;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BookingServiceController extends Controller
{
    public function __construct(
        private BookingServiceRepositoryInterface $bookingServiceRepository,
        private PaymentRepositoryInterface $paymentRepository
    ) {}

    public function index()
    {
        return Inertia::render('BookingServices/Index', [
            'bookingServices' => $this->bookingServiceRepository->getAllByDateCreated([Carbon::now()->subDays(15), Carbon::tomorrow()]),
        ]);
    }

    public function getAll()
    {
        $booking = $this->bookingServiceRepository->getAll();

        return response()->json(['bookingServices' => $booking], 200);
    }

    public function create()
    {
        return Inertia::render('BookingServices/Create');
    }

    public function getAllBookingServices(Request $request)
    {
        $validated = $request->validate([
            'dates' => 'required|array',
            'dates.0' => 'required|date',
            'dates.1' => 'required|date',
        ]);

        $booking = $this->bookingServiceRepository->getAllByDate($validated['dates']);

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

            return redirect()->route('BookingServices.edit', $booking->id);
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
        BookingService::find($bookingService)->delete();
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
        $bookingService->update(['problematic' => ! $bookingService->problematic]);

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
                'boys' => $booking->boys,
                'cliente_name' => $booking->cliente_name,
                'observaciones' => $booking->observations,
                'notas' => $booking->notes->map(function ($note) {
                    return [
                        'note' => $note->note,
                        'created_at' => $note->created_at,
                        'user' => $note->user->name,
                    ];
                }),
                'status' => strtoupper($booking->status),
                'proveedors' => $booking->proveedors->map(function ($proveedor) {
                    return [
                        'proveedor_id' => $proveedor->proveedor->id,
                        'proveedor' => $proveedor->proveedor->nombre,
                        'cost' => $proveedor->cost,
                        'cost_total' => $proveedor->cost_total,
                        'discount' => $proveedor->discount,
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
            'status' => $statues,
        ]);
    }

    public function completarReserva(Request $request)
    {
        $booking = BookingService::find($request->service_id);
        if (isset($request->extras)) {
            foreach ($request->extras as $extra) {
                // dd($extra);
                BookingExtras::find($extra['id'])->update([
                    'unit_cost' => $extra['unit_cost'],
                    'total_cost' => $extra['unit_cost'] * $extra['cantidad'],
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
        foreach ($request->saldos as $saldo) {
            $proveedor = $booking->proveedors->firstWhere('id', $saldo['id']);
            if ($proveedor) {
                $proveedor->update([
                    'cost' => $proveedor->cost - $saldo['amount'],
                ]);
                PagoSaldos::create([
                    'amount' => $saldo['amount'],
                    'proveedor_id' => $saldo['id'],
                    'booking_service_id' => $booking->id,
                ]);
            }

        }
        storeState($booking, request('status'), Auth::user()->id, 1);

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
            'fecha_cancelacion' => $request->date,
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
                'user_id' => Auth::user()->id,
            ]);
        }

        // $service->update([
        //     'fecha_cancelacion' => $request->date
        // ]);
        storeState($service, 'NO SHOW', 1);

        return back()->with('message', 'Reservación marcada como no show correctamente');
    }

    public function reservarByApi(BookingClientService $request, $userId = 8)
    {
        $data = $request->validated();
        $last_name = $data['cliente_last_name'];
        $email = $data['cliente_email'];
        $method = $data['payment_method'];
        $data['saldo'] = 0;
        $data['hour'] = Horario::find($request->time)->start ?? null;
        unset($data['cliente_email']);
        unset($data['cliente_last_name']);
        unset($data['time']);
        unset($data['payment_method']);
        $data['adult_tarifa'] = 0;
        $data['boys'] = 0;
        $data['channel_id'] = Channel::where('name', 'Vendedor')->first()->id;
        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d');
        $service = Service::findOrFail($data['service_id']);
        $data['boys_tarifa'] = $service->boy_tarifa;
        $data['boys_price'] = $service->boys_price;
        $data['adults_price'] = $service->adults_price;
        $data['service'] = $service->title;
        if (isset($data['soporte'])) {
            $data['file'] = $data['soporte']->store('public/soportes');
        }
        unset($data['soporte']);
        $data['vendedor_id'] = $userId;
        $data['hour'] = '08:00';
        $data['cliente_name'] = $data['cliente_name'].' '.$last_name;

        $booking = $this->bookingServiceRepository->store($data, 'SIN CONFIRMAR', $userId);
        // send mail
        $data['cliente_last_name'] = $last_name;
        $data['cliente_email'] = $email;
        $data['payment_method'] = $method;
        
        $payment = $this->paymentRepository->createPayment($data, $userId, $booking->id);

        // Enviar correo de confirmación
        try {
            // Preparar datos del cliente para el correo
            $customerData = [
                'cliente_name' => $data['cliente_name'],
                'cliente_email' => $email,
                'payment_method' => $method,
                'last_name' => $last_name,
            ];

            // Enviar correo de confirmación
            Mail::to([$email,  'avacacionales@gmail.com'])->send(new BookingConfirmation($booking,  $customerData));

        } catch (Exception $e) {
            // Log del error pero no fallar la reserva
            Log::error('Error al enviar correo de confirmación: '.$e->getMessage(), [
                'booking_id' => $booking->id,
                'email' => $email,
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'message' => 'Reservación guardada correctamente',
            'bookingService' => $booking,
            // 'payment' => $payment,
            'status' => true,
        ], 200);
    }

    public function successBooking(BookingService $bookingService)
    {
        return Inertia::render('Home/Success', [
            'bookingService' => $bookingService,
        ]);
    }

    public function setStatus()
    {
        $service = BookingService::where('id', request('service'))->first();
        $service->update(['fecha_cancelacion' => null]);
        if (request('state') == 'CANCELADA') {
            // $service->proveedors()->delete();
            $service->update(['fecha_cancelacion' => request('date')]);
        }
        if (request('state') == 'CAMBIO DE FECHA') {
            $service->update([
                'date' => Carbon::parse(request('date'))->format('Y-m-d'),
            ]);
        }
        if (request('state') == 'REUBICADO') {
            $proveedorService = DB::table('booking_proveedors')
                ->where('id', request('current_id'))
                ->update([
                    'proveedor_id' => request('new_id')['id'],
                    'cost' => request('value'),
                ]);
            // dd($proveedorService);

            if (request('note')) {
                Note::create([
                    'booking_service_id' => $service->id,
                    'note' => request('note'),
                    'user_id' => Auth::user()->id,
                ]);
            }
        }
        // dd($service);
        storeState($service, request('state'), Auth::user()->id, request('terminated'));

        return back()->with('message', 'Estado actualizado');
    }
}
