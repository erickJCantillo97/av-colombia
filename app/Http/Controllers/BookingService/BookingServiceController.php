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
use App\Models\Payment;
use App\Models\PaymentMethod;
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

    public function index(Request $request)
    {
        $type = $request->query('type');
        $search = $request->query('search');
        $perPage = $request->query('per_page', 100);
        $dates = $request->query('dates');
        $columnFilters = $request->query('column_filters', []);
        $status = $request->query('status');

        return Inertia::render('BookingServices/Index', [
            'bookingServices' => $this->bookingServiceRepository->getPaginated($type, $search, $perPage, $dates, $columnFilters, $status),
            'serviceType' => $type,
            'filters' => $request->only(['search', 'dates', 'per_page', 'column_filters', 'status']),
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
            'type' => 'nullable|string|in:TOUR,EMBARCACION,TRANSFER',
            'search' => 'nullable|string',
            'per_page' => 'nullable|integer|min:1|max:500',
            'page' => 'nullable|integer|min:1',
            'column_filters' => 'nullable|array',
            'status' => 'nullable|string',
        ]);

        $booking = $this->bookingServiceRepository->getPaginated(
            $validated['type'] ?? null,
            $validated['search'] ?? null,
            $validated['per_page'] ?? 100,
            $validated['dates'],
            $validated['column_filters'] ?? [],
            $validated['status'] ?? null
        );

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

            return response()->json(['message' => 'Error al guardar la reservación + '.$e->getMessage()], 500);
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
        $lastName = $data['cliente_last_name'] ?? null;
        $email = $data['cliente_email'] ?? null;
        $paymentMethod = $data['payment_method'] ?? null;
        $data['saldo'] = 0;
        $hora = Horario::find($request->time)->start ?? '08:00';
        $data['hour'] = $hora;
        $data['adult_tarifa'] = 0;
        $data['boys'] = 0;
        $data['adults_nacionales'] = $data['adults'];
        $data['boys_nacionales'] = $data['boys'];

        if($userId == 8){
            $data['channel_id'] = Channel::where('name', 'Pagina Web')->first()?->id ?? null;
        }else {
            $data['channel_id'] = Channel::where('name', 'Vendedor')->first()?->id ?? null;
        }
        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d');
        $data['vendedor_id'] = $userId;
        $data['cliente_name'] = ($data['cliente_name'] ?? '').' '.($lastName ?? '');
        // Handle optional uploaded soporte
        if (isset($data['soporte']) && $data['soporte']) {
            $data['file'] = $data['soporte']->store('public/soportes');
        }
        $data['total'] = $data['total_real'];
        unset($data['cliente_email'], $data['cliente_last_name'], $data['time'], $data['payment_method'], $data['soporte']);
        
        $service = Service::findOrFail($data['service_id']);
        $data['boys_tarifa'] = $service->boy_tarifa;
        $data['boys_price'] = $service->boys_price;
        $data['adults_price'] = $service->adults_price;
        $data['service'] = $service->title;

        try {
            $result = DB::transaction(function () use ($data, $userId, $paymentMethod, $email, $lastName) {
                $data['payment_method'] = $this->getPaymentMethodId($paymentMethod);
                $booking = $this->bookingServiceRepository->store($data, 'SIN CONFIRMAR', $userId);
                // Reattach minimal data needed by payment repository
                $paymentPayload = array_merge($data, [

                    'cliente_email' => $email,
                    'cliente_last_name' => $lastName,
                    'payment_method' => $paymentMethod,
                    'cliente_name' => $data['cliente_name'] ?? null,

                ]);
                $payment = $this->paymentRepository->createPayment($paymentPayload, $userId, $booking->id);

                return compact('booking', 'payment');
            });
        } catch (Exception $e) {
            Log::error('Error creando reservación o pago', ['error' => $e->getMessage(), 'payload' => $data]);

            return response()->json(['message' => 'Error al guardar la reservación'], 500);
        }
        $booking = $result['booking'];
        $payment = $result['payment'];
        $customerData = [
            'cliente_name' => $data['cliente_name'],
            'cliente_email' => $email,
            'payment_method' => $paymentMethod,
            'last_name' => $lastName,
        ];
        try {
            Mail::to([$email, 'avacacionales@gmail.com'])->send(new BookingConfirmation($booking, $customerData));
        } catch (Exception $e) {
            Log::error('Error al enviar correo de confirmación', [
                'booking_id' => $booking->id,
                'email' => $email,
                'error' => $e->getMessage(),
            ]);
        }

        return response()->json([
            'message' => 'Reservación guardada correctamente',
            'bookingService' => $booking,
            'payment' => $payment,
            'status' => true,
        ], 200);
    }

    public function successBooking(BookingService $bookingService)
    {
        return Inertia::render('Home/Success', [
            'bookingService' => $bookingService,
        ]);
    }

    private function getPaymentMethodId($method)
    {
        if($method == 1){
            return PaymentMethod::where('name', 'EFECTIVO')->first()->id;
        }elseif($method == 2){
            return PaymentMethod::where('name', 'REDEBAN')->first()->id;
        }
        return PaymentMethod::where('name', 'TRANSFERENCIA')->first()->id;
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
