<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Feature;
use App\Models\Included;
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
                'services' => Service::whereAny([
                    'title',
                    'title_en',
                    'description',
                    'description_en'
                ], 'LIKE', $search)->with('images', 'features')->latest()->take(5)->get()
            ]);
        }
        return Inertia::render('Services/Index', [
            'services' => Service::get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $features = Feature::orderBy('name')->get();
        return Inertia::render('Services/Form', [
            'features' => $features
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
    {
        $included = array_merge(json_decode($request->includes), json_decode($request->notIncludes));
        foreach ($included as $i) {
            Included::create(['name' => $i]);
        }

        $service = Service::create($request->validated());
        foreach ($request->features as $feature) {
            $service->features()->attach(
                Feature::firstOrCreate($feature)->id
            );
        }
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        //
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

    public function reservar(Request $request){
        $validateData = $request->validate([
            'service_id' => 'required|exists:services,id',
            'adultos' => 'required|numeric',
            'boys' => 'required|numeric',
            'date' => 'required|date',
        ]);

    }
}
