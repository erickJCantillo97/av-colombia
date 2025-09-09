<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Accommodation;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookingAccommodationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::with(['room.accommodation.photos', 'room.photos'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('BookingAccommodations/Index', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $room = Room::with(['accommodation.amenities', 'accommodation.photos', 'photos'])
            ->findOrFail($request->room_id);

        return Inertia::render('BookingAccommodations/Form', [
            'room' => $room,
            'checkIn' => $request->check_in,
            'checkOut' => $request->check_out,
            'adults' => $request->adults ?? 1,
            'children' => $request->children ?? 0,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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
            return back()->withErrors([
                'capacity' => 'La habitación no tiene capacidad suficiente para la cantidad de huéspedes solicitada.',
            ])->withInput();
        }

        // Verificar disponibilidad de la habitación
        if (! $room->isAvailableBetween($checkIn, $checkOut)) {
            return back()->withErrors([
                'availability' => 'La habitación no está disponible para las fechas seleccionadas.',
            ])->withInput();
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
                DB::rollBack();

                return back()->withErrors([
                    'availability' => 'La habitación ya no está disponible para las fechas seleccionadas.',
                ])->withInput();
            }

            DB::commit();

            return redirect()->route('booking-accommodations.show', $booking)
                ->with('success', 'Reserva creada exitosamente.');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors([
                'error' => 'Error al procesar la reserva. Por favor, inténtalo de nuevo.',
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $bookingAccommodation)
    {
        // Verificar que el usuario sea propietario de la reserva
        if ($bookingAccommodation->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para ver esta reserva.');
        }

        $bookingAccommodation->load([
            'room.accommodation.photos',
            'room.accommodation.amenities',
            'room.photos',
            'user',
        ]);

        return Inertia::render('BookingAccommodations/Show', [
            'booking' => $bookingAccommodation,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $bookingAccommodation)
    {
        // Verificar que el usuario sea propietario de la reserva
        if ($bookingAccommodation->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para editar esta reserva.');
        }

        // Solo permitir edición si la reserva no ha comenzado
        if ($bookingAccommodation->check_in_date <= now()) {
            return redirect()->route('booking-accommodations.show', $bookingAccommodation)
                ->with('error', 'No puedes editar una reserva que ya ha comenzado.');
        }

        $bookingAccommodation->load(['room.accommodation']);

        return Inertia::render('BookingAccommodations/Edit', [
            'booking' => $bookingAccommodation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $bookingAccommodation)
    {
        // Verificar que el usuario sea propietario de la reserva
        if ($bookingAccommodation->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para editar esta reserva.');
        }

        // Solo permitir edición si la reserva no ha comenzado
        if ($bookingAccommodation->check_in_date <= now()) {
            return redirect()->route('booking-accommodations.show', $bookingAccommodation)
                ->with('error', 'No puedes editar una reserva que ya ha comenzado.');
        }

        $validatedData = $request->validate([
            'status' => 'required|in:confirmada,cancelada',
        ]);

        $bookingAccommodation->update($validatedData);

        return redirect()->route('booking-accommodations.show', $bookingAccommodation)
            ->with('success', 'Reserva actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $bookingAccommodation)
    {
        // Verificar que el usuario sea propietario de la reserva
        if ($bookingAccommodation->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para eliminar esta reserva.');
        }

        // En lugar de eliminar, cancelar la reserva
        $bookingAccommodation->update(['status' => 'cancelada']);

        return redirect()->route('booking-accommodations.index')
            ->with('success', 'Reserva cancelada exitosamente.');
    }

    /**
     * Método para buscar disponibilidad
     */
    public function search(Request $request)
    {
        $validatedData = $request->validate([
            'city' => 'nullable|string',
            'country' => 'nullable|string',
            'type' => 'nullable|in:hotel,apartamento,casa,hostal,villa',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'guests_adults' => 'required|integer|min:1',
            'guests_children' => 'integer|min:0',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'star_rating' => 'nullable|integer|min:1|max:5',
            'amenities' => 'nullable|array',
            'amenities.*' => 'exists:amenities,id',
        ]);

        $query = Accommodation::with(['rooms', 'amenities', 'photos'])
            ->published();

        // Aplicar filtros
        if ($validatedData['city'] ?? false) {
            $query->inLocation($validatedData['city']);
        }

        if ($validatedData['country'] ?? false) {
            $query->inLocation(null, $validatedData['country']);
        }

        if ($validatedData['type'] ?? false) {
            $query->ofType($validatedData['type']);
        }

        if ($validatedData['star_rating'] ?? false) {
            $query->withMinRating($validatedData['star_rating']);
        }

        // Filtrar por amenidades
        if ($validatedData['amenities'] ?? false) {
            $query->whereHas('amenities', function ($amenityQuery) use ($validatedData) {
                $amenityQuery->whereIn('amenities.id', $validatedData['amenities']);
            }, '=', count($validatedData['amenities']));
        }

        // Filtrar por habitaciones disponibles con capacidad y precio
        $checkIn = Carbon::parse($validatedData['check_in_date']);
        $checkOut = Carbon::parse($validatedData['check_out_date']);
        $adults = $validatedData['guests_adults'];
        $children = $validatedData['guests_children'] ?? 0;

        $query->whereHas('rooms', function ($roomQuery) use ($checkIn, $checkOut, $adults, $children, $validatedData) {
            $roomQuery->withCapacity($adults, $children)
                ->where('is_available', true);

            if (isset($validatedData['min_price'])) {
                $roomQuery->where('price_per_night', '>=', $validatedData['min_price']);
            }

            if (isset($validatedData['max_price'])) {
                $roomQuery->where('price_per_night', '<=', $validatedData['max_price']);
            }

            // Verificar disponibilidad en las fechas
            $roomQuery->whereDoesntHave('bookings', function ($bookingQuery) use ($checkIn, $checkOut) {
                $bookingQuery->where('status', '!=', 'cancelada')
                    ->where(function ($query) use ($checkIn, $checkOut) {
                        $query->whereBetween('check_in_date', [$checkIn, $checkOut])
                            ->orWhereBetween('check_out_date', [$checkIn, $checkOut])
                            ->orWhere(function ($subQuery) use ($checkIn, $checkOut) {
                                $subQuery->where('check_in_date', '<=', $checkIn)
                                    ->where('check_out_date', '>=', $checkOut);
                            });
                    });
            });
        });

        $accommodations = $query->get();

        return Inertia::render('BookingAccommodations/Search', [
            'accommodations' => $accommodations,
            'searchParams' => $validatedData,
            'amenities' => \App\Models\Amenity::orderBy('name')->get(),
        ]);
    }
}
