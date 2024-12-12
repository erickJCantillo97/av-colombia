<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Availability;
use App\Models\BookingService;
use App\Models\Feature;
use App\Models\Horario;
use App\Models\Included;
use App\Models\Lock;
use App\Models\Precie;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        if ($request->expectsJson()) {
            $search = '%' . $request->search . '%';
            $service = Service::with('locks')
                ->with('images', 'features');

            if ($request->type) {
                $service->where('type', $request->type);
            }
            if ($request->search) {
                $service->whereAny([
                    'title',
                    'title_en',
                    'description',
                    'description_en',

                ], 'LIKE', $search);
            }
            return response()->json([
                'services' => $service->get(),
            ]);
        }
        return Inertia::render('Services/Index', [
            'services' => Service::with('locks')->get(),
        ]);
    }

    public function home(Request $request)
    {

        // dd($request->all());
        return Inertia::render('Home/Services', [
            'search' => $request->search,
            'date' => $request->date,
            'type' => $request->type,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $features = Feature::orderBy('name')->get();

        return Inertia::render('Services/Form', [
            'features' => $features,
            'included' => Included::orderBy('name')->pluck('name')->toArray()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
    {
        $included = array_merge(json_decode($request->includes), json_decode($request->notIncludes));
        foreach ($included as $i) {
            Included::firstOrCreate(['name' => $i]);
        }
        $validated = $request->validated();
        if ($request->hasFile('portada')) {
            $validated['portada'] = $request->file('portada')->store('public/images');
        }
        $service = Service::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $service->images()->create([
                    'filepath' => $image->store('public/images'),
                    'filename' => $image->getClientOriginalName(),
                    'extension' => $image->extension(),
                    'size' => $image->getSize(),
                ]);
            }
        }
        return redirect()->route('services.edit', $service->slug)->with('message', 'Servicio creado');
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        return Inertia::render('Services/Show', [
            'service' => $service,
            'gallery' => $service->images,
            'features' => $service->features
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        $features = Feature::orderBy('name')->get();

        return Inertia::render('Services/Form', [
            'features' => $features,
            'service' => $service,
            'images' => $service->images,
            'features' => $service->features,
            'availabilities' => Availability::where('service_id', $service->id)->with('horarios')->get(),
            'included' => Included::orderBy('name')->pluck('name')->toArray()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        $included = array_merge(json_decode($request->includes), json_decode($request->notIncludes));
        foreach ($included as $i) {
            Included::firstOrCreate(['name' => $i]);
        }

        foreach ($request->file('images') as $image) {
            $service->images()->create([
                'filepath' => $image->store('public/images'),
                'filename' => $image->getClientOriginalName(),
                'extension' => $image->extension(),
                'size' => $image->getSize(),
            ]);
        }

        $service->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        try {
            Service::where('id', $uuid)->first()->delete();
        } catch (Exception $e) {
            return Back()->withErrors(['message' => 'No se puedo Eliminar']);
        }
    }

    public function reservar(Request $request)
    {
        $validate = $request->validate([
            'service_id' => 'required|exists:services,id',
            'adults' => 'required|numeric',
            'boys' => 'nullable|numeric',
            'cliente_name' => 'required|string',
            'cliente_phone' => 'required|numeric',
            'cliente_city' => 'required|string',
            'cliente_building' => 'required|string',
            'channel_id' => ['required', 'uuid'],
            'mascota' => 'nullable|numeric',
            'persona_adicional' => 'nullable|numeric',
            'cobre_transaccion' => 'nullable|numeric',
            'cobro_extra_cliente' => 'nullable|numeric',
            'reserva' => 'nullable|numeric',
            'saldo' => 'nullable|numeric',
            'percent_descuento' => 'nullable|numeric',
            // 'payment_type' => 'nullable|numeric',
            'mascota' =>  'nullable|numeric',
            'persona_adicional' =>  'nullable|numeric',
            'cobre_transaccion' =>  'nullable|numeric',
            'cobro_extra_cliente' =>  'nullable|numeric',
            'alimentacion' =>  'nullable|numeric',
            'reserva' =>  'nullable|numeric',
            'saldo' =>  'nullable|numeric',
            'percent_descuento' =>  'nullable|numeric',
            'date' => 'required',
            'total_real' => 'nullable|numeric',
            'percent_channel' => 'nullable|numeric',
            'total' => 'nullable|numeric',
            'observations' => 'nullable|string',
            'method_id' => 'nullable|uuid',
        ]);

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
        $booking = BookingService::create($validate);
        // $booking->proveedors()->attach(request('proveedors'));
        foreach (request('proveedors') as $proveedor) {
            if ($proveedor['costo'] && $proveedor['proveedor'])
                $booking->proveedors()->create([
                    'booking_service_id' => $booking->id,
                    'proveedor_id' => $proveedor['proveedor'],
                    'cost' => $proveedor['costo'],
                ]);
        }
        if (request('abono'))
            paymentStore(request('abono'), request('method'), $booking);
        storeState($booking, 'reservado');
    }

    public function lock(Service $service, Request $request)
    {
        $validate = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'description' => 'required|string',
        ]);
        $validate['start_date'] = Carbon::parse($validate['start_date'])->format('Y-m-d');
        $validate['end_date'] = Carbon::parse($validate['end_date'])->format('Y-m-d');
        $validate['user_id'] = auth()->user()->id;
        $service->locks()->create($validate);
    }

    public function unlock(Lock $lock)
    {
        $lock->delete();
        return back()->with('message', 'Lock eliminado');
    }

    public function setStatus()
    {
        $service = BookingService::where('id', request('service'))->first();
        // dd($service);
        storeState($service, request('state'), request('terminated'));
        return back()->with('message', 'Estado actualizado');
    }

    public function getProveedors($service)
    {
        $service = Service::find($service);
        return response()->json([
            'proveedors' => $service->proveedors
        ]);
    }

    public function updateStart(Service $service, Request $request)
    {
        $validate = $request->validate([
            'availability_type' => 'required|string',
            'price_type' => 'required|string',
            'horarios' => 'required|array',
            'precies' => 'required|array',
        ]);
        // dd($validate['horarios']);
        foreach ($validate['horarios'] as $horario) {
            Horario::where('availability_id', $horario['id'])->delete();
            foreach ($horario['days'] as $index => $day) {
                foreach ($day['times'] as $time)
                    Horario::create([
                        'availability_id' => $horario['id'],
                        'day' => $day['day'],
                        'day_number' => $index + 1,
                        'start' => $time['start']['hours'] . ':' . $time['start']['minutes'],
                        'end' => $time['end'] ? $time['end']['hours'] . ':' . $time['end']['minutes'] : null,
                    ]);
            }
        }
        Precie::where('service_id', $service->id)->delete();
        foreach ($validate['precies'] as $precie) {
            $service->precies()->create([
                'min' => $precie['min'],
                'max' => $precie['max'],
                'value' => $precie['value'],
                'duration' => $precie['duration'],
                'duration_type' => $precie['duration_type'],
            ]);
        }
        unset($validate['horarios']);
        $service->update($validate);
        return back()->with('message', 'Servicio iniciado');
    }
}
