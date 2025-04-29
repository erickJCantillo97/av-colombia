<?php

namespace App\Http\Controllers;

use App\Http\Requests\Service\StoreServiceRequest;
use App\Http\Requests\Service\UpdateServiceRequest;
use App\Interfaces\ServiceRepositoryInterface;
use App\Models\Availability;
use App\Models\Feature;
use App\Models\Horario;
use App\Models\Image;
use App\Models\Included;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;


class ServiceController extends Controller
{
    public function __construct(
        private ServiceRepositoryInterface $serviceRepository
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Services/Index', [
            'services' => $this->serviceRepository->getAll(),
        ]);
    }

    public function getServices(Request $request)
    {
        return response()->json([
            'services' => $this->serviceRepository->getAll(),
        ]);
    }

    public function home(Request $request)
    {
        return Inertia::render('Home/Services', [
            'search' => $request->search,
            'date' => $request->date,
            'type' => $request->type,
        ]);
    }

    public function create()
    {
        $features = Feature::orderBy('name')->get();
        return Inertia::render('Services/Form', [
            'features' => $features,
            'included' => Included::orderBy('name')->pluck('name')->toArray()
        ]);
    }

    public function store(StoreServiceRequest $request)
    {
        $service = $this->serviceRepository->create($request->validated());
        return redirect()->route('services.edit', $service->slug)->with('message', 'Servicio creado');
    }

    public function show(Service $service)
    {
        return Inertia::render('Services/Show', [
            'service' => $service,
            'gallery' => $service->images,
            'availabilities' => Availability::where('service_id', $service->id)->with('horarios', 'precies')->get(),
            'features' => $service->features
        ]);
    }

    public function edit(Service $service)
    {
        $features = Feature::orderBy('name')->get();

        return Inertia::render('Services/Form', [
            'features' => $features,
            'service' => $service,
            'images' => $service->images,
            'features' => $service->features,
            'availabilities' => Availability::where('service_id', $service->id)->with('horarios', 'precies')->get(),
            'included' => Included::orderBy('name')->pluck('name')->toArray()
        ]);
    }

    public function update(UpdateServiceRequest $request, $service)
    {
        $this->serviceRepository->update($service, $request->validated());
    }

    public function uploadImage(Request $request, Service $service)
    {
        $request->validate([
            'images' => 'required|array',
        ]);
        $images = $request->images;
        foreach ($images as $image) {
            $service->images()->create([
                'filepath' => $image->store('public/images'),
                'filename' => $image->getClientOriginalName(),
                'extension' => $image->extension(),
                'size' => $image->getSize(),
            ]);
        }
    }

    public function deleteImage(Image $image)
    {
        $image->delete();
    }

    public function destroy(string $uuid)
    {
        try {
            $this->serviceRepository->delete($uuid);
        } catch (Exception $e) {
            return Back()->withErrors(['message' => 'No se puedo Eliminar']);
        }
    }

    public function checkOut(Request $request)
    {
        return Inertia::render('Home/CheckOut');
    }

    public function getProveedorsByService($id){
        return  response()->json([
            'proveedors' => $this->serviceRepository->getProveedors($id),
        ]);
    }
}
