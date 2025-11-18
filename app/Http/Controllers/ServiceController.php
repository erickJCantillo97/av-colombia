<?php

namespace App\Http\Controllers;

use App\Http\Requests\Service\StoreServiceRequest;
use App\Http\Requests\Service\UpdateServiceRequest;
use App\Interfaces\ServiceRepositoryInterface;
use App\Models\Accommodation;
use App\Models\Availability;
use App\Models\Feature;
use App\Models\Horario;
use App\Models\Image;
use App\Models\Included;
use App\Models\Service;
use Exception;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function __construct(
        private ServiceRepositoryInterface $serviceRepository
    ) {}

    public function index(Request $request)
    {
        $type = $request->type ?? 'TOUR';

        return Inertia::render('Services/Index', [
            'services' => $this->serviceRepository->getAllByType($type),
            'type' => $type,
        ]);
    }

    public function getServices(Request $request)
    {
        return response()->json([
            'services' => $this->serviceRepository->getAll(),
        ]);
    }

    public function getServiceByUser(Request $request)
    {
        $userId = $request->user_id;

        return response()->json([
            'services' => $this->serviceRepository->getServiceByUser($userId),
        ]);
    }

    public function getServicePagination(Request $request)
    {
        $perPage = 12;

        // Si el tipo es HOSPEDAJE, buscar en acomodaciones
        if ($request->filled('type') && $request->type === 'HOSPEDAJE') {
            $query = Accommodation::with('photos', 'amenities', 'rooms');

            if ($request->filled('location')) {
                $query->where('city', 'LIKE', "%{$request->location}%");
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%$search%")
                        ->orWhere('description', 'LIKE', "%$search%")
                        ->orWhere('city', 'LIKE', "%$search%")
                        ->orWhere('address_line_1', 'LIKE', "%$search%")
                        ->orWhere('state', 'LIKE', "%$search%")
                        ->orWhere('country', 'LIKE', "%$search%");
                });
            }

            $accommodations = $query->published()->paginate($perPage);

            return response()->json($accommodations);
        }

        // Búsqueda normal de servicios
        $query = Service::with('images', 'features', 'availabilities', 'availabilities.horarios', 'availabilities.precies');

        if ($request->filled('location')) {
            $query->where('city', 'LIKE', "%{$request->location}%");
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%$search%")
                    ->orWhere('description', 'LIKE', "%$search%")
                    ->orWhere('title_en', 'LIKE', "%$search%")
                    ->orWhere('description_en', 'LIKE', "%$search%")
                    ->orWhere('city', 'LIKE', "%$search%")
                    ->orWhere('destinations', 'LIKE', "%$search%");
            });
        }

        $services = $query->paginate($perPage);

        return response()->json($services);
    }

    public function home(Request $request)
    {
        if ($request->type == 'TRANSFER') {
            $transfer = Service::where('type', 'TRANSFER')
                ->where('destino', $request->destino)
                ->where('origen', $request->origen)
                ->first();
            if (! $transfer) {
                $transfer = Service::where('type', 'TRANSFER')
                    ->where('origen', $request->destino)
                    ->where('destino', $request->origen)
                    ->where('is_round_trip', 1)
                    ->first();
            }

            return redirect()->route('show.services', $transfer->slug);
        }

        return Inertia::render('Home/Services', [
            'search' => $request->search,
            'date' => $request->date,
            'type' => $request->type,
        ]);
    }

    public function create(Request $request)
    {
        $serviceType = $request->serviceType ?? 'TOUR';
        $features = Feature::orderBy('name')->get();
        $included = Included::orderBy('name')->pluck('name')->toArray();

        return Inertia::render('Services/Form/Create', [
            'features' => $features,
            'serviceType' => $serviceType,
            'included' => $included,
        ]);
    }

    public function store(StoreServiceRequest $request)
    {
        $service = $this->serviceRepository->create($request->validated());

        // dd($service);
        return redirect()->route('services.edit', $service->slug)->with('message', 'Servicio creado');
    }

    public function show(Service $service)
    {
        if (request()->wantsJson()) {
            return response()->json([
                'service' => $service,
                'gallery' => $service->images,
                'availabilities' => Availability::where('service_id', $service->id)->with('horarios', 'precies')->get(),
                'features' => Feature::all(),
            ]);
        }

        return Inertia::render('Services/Show', [
            'service' => $service,
            'gallery' => $service->images,
            'itineraries' => $service->itineraries()->with('images')->get(),
            'availabilities' => Availability::where('service_id', $service->id)->with('horarios', 'precies')->get(),
            'features' => Feature::all(),
        ]);
    }

    public function apiShow($slug, $userId)
    {
        return response()->json([
            'service' => $this->serviceRepository->getServiceBySlugAndUser($slug, $userId),
        ]);
    }

    public function edit(Service $service)
    {
        $features = Feature::orderBy('name')->get();
        $serviceType = $request->serviceType ?? 'TOUR';

        return Inertia::render('Services/Form/Edit', [
            // 'features' => $features,
            'service' => $service,
            'serviceType' => $serviceType,
            'images' => $service->images,
            'features' => $service->features,
            'itineraries' => $service->itineraries()->with('images')->get(),
            'availabilities' => Availability::where('service_id', $service->id)->with('horarios', 'precies')->get(),
            'included' => Included::orderBy('name')->pluck('name')->toArray(),
        ]);
    }

    public function update(UpdateServiceRequest $request, $service)
    {
        //  dd($request->all());
        $this->serviceRepository->update($service, $request->validated());
    }

    public function setPortada(Request $request, $service)
    {
        $request->validate([
            'portada' => 'file|required|max:2048',
        ]);
        $this->serviceRepository->setPortada($service, $request->portada);
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

    public function checkOut(Service $service, Request $request)
    {
        return Inertia::render('Home/CheckOut/Index', [
            'service' => $service,
        ]);
    }

    public function getProveedorsByService($id)
    {
        return response()->json([
            'proveedors' => $this->serviceRepository->getProveedors($id),
        ]);
    }

    public function getServiceRecommendation(Request $request)
    {
        $validated = $request->validate([
            'prompt' => 'required|string|max:255',
            'type' => 'nullable',
        ]);
        $userQuery = $validated['prompt'];

        $services = Service::whereAny(['title', 'description'], 'like', "%{$userQuery}%")
            ->where('type', 'like', '%'.$validated['type'].'%')
            ->limit(5) // Limitar la cantidad de productos para no exceder el prompt
            ->get(['slug', 'title', 'description']);

        $productListForPrompt = $services->map(function ($product) {
            return "- slug: {$product->slug}, Nombre: {$product->name}, Descripción: {$product->description}";
        })->implode("\n");

        $finalPrompt = "Un cliente está buscando: '{$userQuery}'.\n\n".
            "Basado en la siguiente lista de productos de mi tienda, ¿cuál le recomendarías y por qué? Responde de forma amigable y conversacional.\n\n".
            "**MUY IMPORTANTE**: Cuando menciones el nombre de un producto, formatéalo como un enlace Markdown usando su ID. Por ejemplo, si un producto tiene slug zapatilla-pro y se llama 'Zapatilla Pro', debes escribir '[Zapatilla Pro](zapatilla-pro)'. No uses URLs completas, solo el slug y por favor no des mas opciones de productos que no esten en la lista, ademas no trates de seguir la conversación solo agradece la busqueda en la pagina.\n\n".
            "Lista de productos disponibles (con sus slugs):\n".
            $productListForPrompt;
        $result = Gemini::generativeModel(model: 'gemini-2.0-flash')->generateContent($finalPrompt);

        return response()->json([
            'recommendation' => $result->text(),
        ]);
    }

    public function updateStart(Service $service, Request $request)
    {
        $validate = $request->validate([
            'availability_type' => 'required|string',
            'price_type' => 'required|string',
            'horarios' => 'required|array',
        ]);
        // dd($validate['horarios']);
        foreach ($validate['horarios'] as $horario) {
            Horario::where('availability_id', $horario['id'])->delete();
            foreach ($horario['days'] as $index => $day) {
                foreach ($day['times'] as $time) {
                    Horario::create([
                        'availability_id' => $horario['id'],
                        'day' => $day['day'],
                        'day_number' => $index + 1,
                        'start' => $time['start']['hours'].':'.$time['start']['minutes'],
                        'end' => $time['end'] ? $time['end']['hours'].':'.$time['end']['minutes'] : null,
                    ]);
                }
            }
        }

        unset($validate['horarios']);
        $service->update($validate);

        return back()->with('message', 'Servicio iniciado');
    }

    public function obtenerHorariosByServiceBetweeDays($serviceId, $startDate)
    {
        return response()->json([
            'horarios' => $this->serviceRepository->obtenerHorariosByServiceBetweeDays($serviceId, $startDate),
        ]);
    }

    public function getAllFeatures()
    {
        return response()->json(Feature::all()->toArray());
    }

    public function getAllOrigins(Request $request)
    {
        $destinos = Service::where('city', $request->city)->whereNotNull('destino')->pluck('destino')->unique()->toArray();
        $origen = Service::where('is_round_trip', true)->where('city', $request->city)->whereNotNull('origen')->pluck('origen')->unique()->toArray();
        $result = array_unique(array_merge($origen, $destinos));

        return response()->json($result);
    }

    public function getAllDestinations(Request $request)
    {
        $destinos = Service::where('origen', $request->origen)->whereNotNull('destino')->pluck('destino')->unique()->toArray();
        $origin = Service::where('destino', $request->origen)->where('is_round_trip', 1)->whereNotNull('origen')->pluck('origen')->unique()->toArray();
        $result = array_unique(array_merge($origin, $destinos));

        return response()->json($result);
    }
}
