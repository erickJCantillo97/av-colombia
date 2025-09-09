<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();

        $bookings = Booking::with(['room.accommodation', 'room.photos'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($bookings);
    }

    /**
     * Store a newly created resource in storage.
     *
     * Lógica principal para crear una reserva con validación de disponibilidad.
     */
    public function store(Request $request): JsonResponse
    {
        // Validar los datos de entrada
        $validatedData = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'guests_adults' => 'required|integer|min:1',
            'guests_children' => 'integer|min:0',
        ]);

        $room = Room::findOrFail($validatedData['room_id']);
        $checkIn = Carbon::parse($validatedData['check_in_date']);
        $checkOut = Carbon::parse($validatedData['check_out_date']);
        $guestsAdults = $validatedData['guests_adults'];
        $guestsChildren = $validatedData['guests_children'] ?? 0;

        // Verificar capacidad de la habitación
        if ($guestsAdults > $room->capacity_adults || $guestsChildren > $room->capacity_children) {
            return response()->json([
                'message' => 'La habitación no tiene capacidad suficiente para la cantidad de huéspedes solicitada.',
                'errors' => [
                    'capacity' => ['Capacidad excedida'],
                ],
            ], 422);
        }

        // Verificar disponibilidad de la habitación
        if (! $room->isAvailableBetween($checkIn, $checkOut)) {
            return response()->json([
                'message' => 'La habitación no está disponible para las fechas seleccionadas.',
                'errors' => [
                    'availability' => ['Habitación no disponible'],
                ],
            ], 409); // Conflict
        }

        // Calcular el número de noches y el precio total
        $nights = $checkIn->diffInDays($checkOut);
        $totalPrice = $room->price_per_night * $nights;

        // Crear la reserva en una transacción
        DB::beginTransaction();

        try {
            $booking = Booking::create([
                'user_id' => Auth::id(),
                'room_id' => $room->id,
                'check_in_date' => $checkIn,
                'check_out_date' => $checkOut,
                'guests_adults' => $guestsAdults,
                'guests_children' => $guestsChildren,
                'total_price' => $totalPrice,
                'status' => 'confirmada',
            ]);

            // Verificar una vez más la disponibilidad después de crear la reserva
            // para evitar condiciones de carrera
            $conflictingBookings = Booking::where('room_id', $room->id)
                ->where('id', '!=', $booking->id)
                ->where('status', '!=', 'cancelada')
                ->where(function ($query) use ($checkIn, $checkOut) {
                    $query->whereBetween('check_in_date', [$checkIn, $checkOut])
                        ->orWhereBetween('check_out_date', [$checkIn, $checkOut])
                        ->orWhere(function ($subQuery) use ($checkIn, $checkOut) {
                            $subQuery->where('check_in_date', '<=', $checkIn)
                                ->where('check_out_date', '>=', $checkOut);
                        });
                })
                ->exists();

            if ($conflictingBookings) {
                // Si hay conflicto, cancelar la transacción
                DB::rollBack();

                return response()->json([
                    'message' => 'La habitación ya no está disponible para las fechas seleccionadas.',
                    'errors' => [
                        'availability' => ['Habitación reservada por otro usuario'],
                    ],
                ], 409);
            }

            DB::commit();

            // Cargar las relaciones para la respuesta
            $booking->load(['room.accommodation', 'user']);

            return response()->json([
                'message' => 'Reserva creada exitosamente.',
                'data' => $booking,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error al procesar la reserva.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking): JsonResponse
    {
        // Verificar que el usuario sea propietario de la reserva
        if ($booking->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'No tienes permiso para ver esta reserva.',
            ], 403);
        }

        $booking->load(['room.accommodation.photos', 'room.photos', 'user']);

        return response()->json([
            'data' => $booking,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking): JsonResponse
    {
        // Verificar que el usuario sea propietario de la reserva
        if ($booking->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'No tienes permiso para modificar esta reserva.',
            ], 403);
        }

        // Solo permitir cambio de estado (por ejemplo, para cancelar)
        $request->validate([
            'status' => 'required|in:confirmada,cancelada',
        ]);

        $booking->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Reserva actualizada exitosamente.',
            'data' => $booking,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking): JsonResponse
    {
        // Verificar que el usuario sea propietario de la reserva
        if ($booking->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'No tienes permiso para eliminar esta reserva.',
            ], 403);
        }

        // En lugar de eliminar, cancelar la reserva
        $booking->update(['status' => 'cancelada']);

        return response()->json([
            'message' => 'Reserva cancelada exitosamente.',
        ]);
    }
}
