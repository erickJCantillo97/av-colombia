<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Accommodation;
use App\Models\Amenity;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccommodationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Accommodation::with(['rooms', 'amenities', 'photos', 'user']);

        $accommodations = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('Accommodations/Index', [
            'accommodations' => $accommodations,
            'canCreateAccommodation' => true,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $amenities = Amenity::orderBy('name')->get();

        return Inertia::render('Accommodations/Form', [
            'amenities' => $amenities,
            'accommodation' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:hotel,apartamento,casa,hostal,villa',
            'address_line_1' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'star_rating' => 'required|integer|min:1|max:5',
            'contact_email' => 'required|email',
            'contact_phone' => 'required|string|max:20',
            'status' => 'required|in:publicado,borrador,inactivo',
            'amenities' => 'array',
            'amenities.*' => 'exists:amenities,id',
            'rooms' => 'required|array|min:1',
            'rooms.*.name' => 'required|string|max:255',
            'rooms.*.description' => 'required|string',
            'rooms.*.capacity_adults' => 'required|integer|min:1',
            'rooms.*.capacity_children' => 'required|integer|min:0',
            'rooms.*.price_per_night' => 'required|numeric|min:0',
        ]);

        $validatedData['user_id'] = Auth::id();

        $accommodation = Accommodation::create($validatedData);

        // Sincronizar amenidades
        if (isset($validatedData['amenities'])) {
            $accommodation->amenities()->sync($validatedData['amenities']);
        }

        // Crear habitaciones
        foreach ($validatedData['rooms'] as $roomData) {
            $roomData['accommodation_id'] = $accommodation->id;
            Room::create($roomData);
        }

        return redirect()->route('accommodations.index')
            ->with('success', 'Alojamiento creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Accommodation $accommodation)
    {
        $accommodation->load([
            'rooms.photos',
            'amenities',
            'photos',
            'reviews.user',
            'user',
        ]);

        $accommodation->append(['average_rating', 'min_price']);

        return Inertia::render('Accommodations/Show', [
            'accommodation' => $accommodation,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Accommodation $accommodation)
    {
        // Verificar que el usuario sea propietario
        if ($accommodation->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para editar este alojamiento.');
        }

        $accommodation->load(['rooms', 'amenities']);
        $amenities = Amenity::orderBy('name')->get();

        return Inertia::render('Accommodations/Form', [
            'accommodation' => $accommodation,
            'amenities' => $amenities,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Accommodation $accommodation)
    {
        // Verificar que el usuario sea propietario
        if ($accommodation->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para editar este alojamiento.');
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:hotel,apartamento,casa,hostal,villa',
            'address_line_1' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'star_rating' => 'required|integer|min:1|max:5',
            'contact_email' => 'required|email',
            'contact_phone' => 'required|string|max:20',
            'status' => 'required|in:publicado,borrador,inactivo',
            'amenities' => 'array',
            'amenities.*' => 'exists:amenities,id',
            'rooms' => 'required|array|min:1',
            'rooms.*.id' => 'nullable|exists:rooms,id',
            'rooms.*.name' => 'required|string|max:255',
            'rooms.*.description' => 'required|string',
            'rooms.*.capacity_adults' => 'required|integer|min:1',
            'rooms.*.capacity_children' => 'required|integer|min:0',
            'rooms.*.price_per_night' => 'required|numeric|min:0',
        ]);

        $accommodation->update($validatedData);

        // Sincronizar amenidades
        if (isset($validatedData['amenities'])) {
            $accommodation->amenities()->sync($validatedData['amenities']);
        }

        // Actualizar o crear habitaciones
        $existingRoomIds = [];
        foreach ($validatedData['rooms'] as $roomData) {
            if (isset($roomData['id'])) {
                // Actualizar habitación existente
                $room = Room::find($roomData['id']);
                if ($room && $room->accommodation_id === $accommodation->id) {
                    $room->update($roomData);
                    $existingRoomIds[] = $room->id;
                }
            } else {
                // Crear nueva habitación
                $roomData['accommodation_id'] = $accommodation->id;
                $room = Room::create($roomData);
                $existingRoomIds[] = $room->id;
            }
        }

        // Eliminar habitaciones que ya no están en la lista
        $accommodation->rooms()->whereNotIn('id', $existingRoomIds)->delete();

        return redirect()->route('accommodations.index')
            ->with('success', 'Alojamiento actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Accommodation $accommodation)
    {
        // Verificar que el usuario sea propietario
        if ($accommodation->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para eliminar este alojamiento.');
        }

        $accommodation->delete();

        return redirect()->route('accommodations.index')
            ->with('success', 'Alojamiento eliminado exitosamente.');
    }

    /**
     * Remove an image from accommodation or room.
     */
    public function destroyImage($imageId)
    {
        try {
            // Buscar la imagen
            $photo = \App\Models\Photo::find($imageId);
            
            if (!$photo) {
                return response()->json(['error' => 'Imagen no encontrada'], 404);
            }

            // Verificar permisos dependiendo del tipo de imagen
            if ($photo->imageable_type === 'App\\Models\\Accommodation') {
                $accommodation = $photo->imageable;
                if ($accommodation->user_id !== Auth::id()) {
                    return response()->json(['error' => 'No autorizado'], 403);
                }
            } elseif ($photo->imageable_type === 'App\\Models\\Room') {
                $room = $photo->imageable;
                if ($room->accommodation->user_id !== Auth::id()) {
                    return response()->json(['error' => 'No autorizado'], 403);
                }
            } else {
                return response()->json(['error' => 'Tipo de imagen no válido'], 400);
            }
            
            // Eliminar archivo físico si existe
            $fullPath = storage_path('app/public/' . $photo->path);
            if (file_exists($fullPath)) {
                unlink($fullPath);
            }
            
            $photo->delete();
            return response()->json(['success' => true]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar imagen: ' . $e->getMessage()], 500);
        }
    }
}
