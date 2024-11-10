<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\BookingService;
use App\Models\Feature;
use App\Models\Included;
use App\Models\Lock;
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
            return response()->json([
                'services' => Service::with('locks')->whereAny([
                    'title',
                    'title_en',
                    'description',
                    'description_en'
                ], 'LIKE', $search)->with('images', 'features')->latest()->take(5)->get()
            ]);
        }
        return Inertia::render('Services/Index', [
            'services' => Service::with('locks')->get(),
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

        $service = Service::create($request->validated());
        // foreach ($request->features as $feature) {
        //     $service->features()->attach(
        //         Feature::firstOrCreate($feature)->id
        //     );
        // }
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
            'features' => $service->features,
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
            'hour' => 'required|date_format:H:i',
            // 'payment_type' => 'nullable|numeric',
            'date' => 'required|date',
        ]);
        $validate['date'] = Carbon::parse($validate['date'])->format('Y-m-d');
        $service = Service::find($validate['service_id']);
        $validate['boys'] = $validate['boys'] ?? 0;
        $validate['user_id'] = auth()->user()->id;
        $validate['service'] = $service->title;
        $validate['adults_price'] = $service->adults_price;
        $validate['adult_tarifa'] = $service->adult_tarifa;
        $validate['boys_price'] = $service->boys_price;
        $validate['boys_tarifa'] = $service->boy_tarifa;
        $booking = BookingService::create($validate);
        $booking->proveedors()->attach(request('proveedors'));
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

    public function setStatus(){
        $service = BookingService::where('id',request('service'))->first();
        // dd($service);
        storeState($service, request('state'), request('terminated'));
        return back()->with('message', 'Estado actualizado');
    }
}
