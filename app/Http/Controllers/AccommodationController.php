<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccommodationController extends Controller
{
    /**
     * Display a listing of the resource with filters.
     *
     * Permite filtrar por city, country, type, star_rating y rango de precios.
     * Devuelve resultados paginados.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Accommodation::with(['rooms', 'amenities', 'photos', 'reviews'])
            ->published(); // Solo alojamientos publicados

        // Filtrar por ciudad
        if ($request->filled('city')) {
            $query->inLocation($request->city);
        }

        // Filtrar por país
        if ($request->filled('country')) {
            $query->inLocation(null, $request->country);
        }

        // Filtrar por tipo de alojamiento
        if ($request->filled('type')) {
            $query->ofType($request->type);
        }

        // Filtrar por rating mínimo
        if ($request->filled('star_rating')) {
            $query->withMinRating($request->star_rating);
        }

        // Filtrar por rango de precios (basado en el precio mínimo de habitaciones)
        if ($request->filled('min_price') || $request->filled('max_price')) {
            $query->whereHas('rooms', function ($roomQuery) use ($request) {
                if ($request->filled('min_price')) {
                    $roomQuery->where('price_per_night', '>=', $request->min_price);
                }
                if ($request->filled('max_price')) {
                    $roomQuery->where('price_per_night', '<=', $request->max_price);
                }
                $roomQuery->where('is_available', true);
            });
        }

        // Filtrar por capacidad de huéspedes
        if ($request->filled('guests_adults') || $request->filled('guests_children')) {
            $adults = $request->guests_adults ?? 1;
            $children = $request->guests_children ?? 0;

            $query->whereHas('rooms', function ($roomQuery) use ($adults, $children) {
                $roomQuery->withCapacity($adults, $children);
            });
        }

        // Filtrar por amenidades
        if ($request->filled('amenities')) {
            $amenityIds = is_array($request->amenities)
                ? $request->amenities
                : explode(',', $request->amenities);

            $query->whereHas('amenities', function ($amenityQuery) use ($amenityIds) {
                $amenityQuery->whereIn('amenities.id', $amenityIds);
            }, '=', count($amenityIds)); // Debe tener TODAS las amenidades solicitadas
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        if ($sortBy === 'price') {
            // Ordenar por precio mínimo de habitación
            $query->leftJoin('rooms', 'accommodations.id', '=', 'rooms.accommodation_id')
                ->where('rooms.is_available', true)
                ->groupBy('accommodations.id')
                ->orderByRaw('MIN(rooms.price_per_night) '.$sortOrder);
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $perPage = $request->get('per_page', 15);
        $accommodations = $query->paginate($perPage);

        return response()->json($accommodations);
    }

    /**
     * Display the specified resource.
     *
     * Devuelve los detalles de un alojamiento específico incluyendo
     * habitaciones, reseñas, servicios y fotos.
     */
    public function show(Accommodation $accommodation): JsonResponse
    {
        // Cargar todas las relaciones necesarias
        $accommodation->load([
            'rooms.photos',
            'amenities',
            'photos',
            'reviews.user',
            'user',
        ]);

        // Agregar datos calculados
        $accommodation->append(['average_rating', 'min_price']);

        return response()->json([
            'data' => $accommodation,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Este método puede implementarse más adelante para crear alojamientos
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Este método puede implementarse más adelante para actualizar alojamientos
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Este método puede implementarse más adelante para eliminar alojamientos
    }

    /**
     * Check availability for an accommodation.
     */
    public function checkAvailability(Request $request, Accommodation $accommodation): JsonResponse
    {
        $request->validate([
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'guests' => 'integer|min:1',
        ]);

        $checkIn = $request->check_in;
        $checkOut = $request->check_out;
        $guests = $request->guests ?? 1;

        // Obtener habitaciones disponibles
        $availableRooms = $accommodation->rooms()
            ->where('is_available', true)
            ->where('capacity_adults', '>=', $guests)
            ->whereDoesntHave('bookings', function ($query) use ($checkIn, $checkOut) {
                $query->where('status', '!=', 'cancelada')
                    ->where(function ($dateQuery) use ($checkIn, $checkOut) {
                        $dateQuery->whereBetween('check_in_date', [$checkIn, $checkOut])
                            ->orWhereBetween('check_out_date', [$checkIn, $checkOut])
                            ->orWhere(function ($overlapQuery) use ($checkIn, $checkOut) {
                                $overlapQuery->where('check_in_date', '<=', $checkIn)
                                    ->where('check_out_date', '>=', $checkOut);
                            });
                    });
            })
            ->get();

        return response()->json([
            'available_rooms' => $availableRooms,
            'total_available' => $availableRooms->count(),
            'check_in' => $checkIn,
            'check_out' => $checkOut,
            'guests' => $guests,
        ]);
    }
}
