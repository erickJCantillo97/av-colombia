<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use App\Models\Amenity;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingAccommodationController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of bookings.
     */
    public function index(Request $request)
    {
        $query = Booking::with(['room.accommodation.photos', 'room.photos'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc');

        // Filtros
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->whereHas('room.accommodation', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%");
            });
        }

        $bookings = $query->paginate(10)->withQueryString();

        return inertia('BookingAccommodations/Index', [
            'bookings' => $bookings,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Show the search form and results.
     */
    public function search(Request $request)
    {
        $accommodations = collect();
        $searchParams = [];

        if ($request->hasAny(['city', 'country', 'type', 'check_in_date', 'check_out_date'])) {
            $query = Accommodation::with(['photos', 'amenities'])
                ->where('is_active', true)
                ->orderBy('name');

            // Filtros de búsqueda
            if ($request->filled('city')) {
                $query->where('city', 'like', "%{$request->city}%");
            }

            if ($request->filled('country')) {
                $query->where('country', 'like', "%{$request->country}%");
            }

            if ($request->filled('type')) {
                $query->where('type', $request->type);
            }

            if ($request->filled('star_rating')) {
                $query->where('star_rating', '>=', $request->star_rating);
            }

            if ($request->filled('min_price')) {
                $query->whereHas('rooms', function ($q) use ($request) {
                    $q->where('price_per_night', '>=', $request->min_price);
                });
            }

            if ($request->filled('max_price')) {
                $query->whereHas('rooms', function ($q) use ($request) {
                    $q->where('price_per_night', '<=', $request->max_price);
                });
            }

            if ($request->filled('amenities') && is_array($request->amenities)) {
                $query->whereHas('amenities', function ($q) use ($request) {
                    $q->whereIn('amenities.id', $request->amenities);
                }, '>=', count($request->amenities));
            }

            // Verificar disponibilidad si se proporcionan fechas
            if ($request->filled(['check_in_date', 'check_out_date'])) {
                $checkIn = $request->check_in_date;
                $checkOut = $request->check_out_date;
                $guestsAdults = $request->guests_adults ?? 1;
                $guestsChildren = $request->guests_children ?? 0;

                $query->whereHas('rooms', function ($q) use ($checkIn, $checkOut, $guestsAdults, $guestsChildren) {
                    $q->where('capacity_adults', '>=', $guestsAdults)
                        ->where('capacity_children', '>=', $guestsChildren)
                        ->whereDoesntHave('bookings', function ($bookingQuery) use ($checkIn, $checkOut) {
                            $bookingQuery->where('status', '!=', 'cancelada')
                                ->where(function ($dateQuery) use ($checkIn, $checkOut) {
                                    $dateQuery->whereBetween('check_in_date', [$checkIn, $checkOut])
                                        ->orWhereBetween('check_out_date', [$checkIn, $checkOut])
                                        ->orWhere(function ($overlapQuery) use ($checkIn, $checkOut) {
                                            $overlapQuery->where('check_in_date', '<=', $checkIn)
                                                ->where('check_out_date', '>=', $checkOut);
                                        });
                                });
                        });
                });
            }

            $accommodations = $query->get();

            // Añadir precio mínimo a cada alojamiento
            $accommodations->each(function ($accommodation) {
                $accommodation->min_price = $accommodation->rooms()->min('price_per_night') ?? 0;
            });

            $searchParams = $request->only([
                'city', 'country', 'type', 'check_in_date', 'check_out_date',
                'guests_adults', 'guests_children', 'min_price', 'max_price',
                'star_rating', 'amenities',
            ]);
        }

        return inertia('BookingAccommodations/Search', [
            'accommodations' => $accommodations,
            'searchParams' => $searchParams,
            'amenities' => Amenity::orderBy('name')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, Accommodation $accommodation)
    {
        $this->authorize('view', $accommodation);

        $rooms = $accommodation->rooms()->where('is_active', true)->get();

        // Si hay parámetros de búsqueda, filtrar habitaciones disponibles
        if ($request->filled(['check_in', 'check_out'])) {
            $checkIn = $request->check_in;
            $checkOut = $request->check_out;
            $guestsAdults = $request->adults ?? 1;
            $guestsChildren = $request->children ?? 0;

            $rooms = $rooms->filter(function ($room) use ($checkIn, $checkOut, $guestsAdults, $guestsChildren) {
                return $room->capacity_adults >= $guestsAdults
                    && $room->capacity_children >= $guestsChildren
                    && $room->isAvailableBetween(Carbon::parse($checkIn), Carbon::parse($checkOut));
            });
        }

        return inertia('BookingAccommodations/Form', [
            'accommodation' => $accommodation->load(['photos', 'amenities']),
            'rooms' => $rooms,
            'searchParams' => $request->only(['check_in', 'check_out', 'adults', 'children']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'accommodation_id' => 'required|exists:accommodations,id',
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'guests_adults' => 'required|integer|min:1',
            'guests_children' => 'required|integer|min:0',
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'required|email|max:255',
            'guest_phone' => 'required|string|max:20',
            'guest_document' => 'required|string|max:50',
            'special_requests' => 'nullable|string|max:1000',
            'total_price' => 'required|numeric|min:0',
        ]);

        $room = Room::findOrFail($validatedData['room_id']);
        $checkIn = Carbon::parse($validatedData['check_in_date']);
        $checkOut = Carbon::parse($validatedData['check_out_date']);

        // Verificar capacidad
        if ($validatedData['guests_adults'] > $room->capacity_adults ||
            $validatedData['guests_children'] > $room->capacity_children) {
            return back()->withErrors([
                'room_id' => 'La habitación no tiene capacidad suficiente para la cantidad de huéspedes.',
            ])->withInput();
        }

        // Verificar disponibilidad
        if (! $room->isAvailableBetween($checkIn, $checkOut)) {
            return back()->withErrors([
                'check_in_date' => 'La habitación no está disponible para las fechas seleccionadas.',
            ])->withInput();
        }

        // Verificar que el precio sea correcto
        $nights = $checkIn->diffInDays($checkOut);
        $expectedPrice = $room->price_per_night * $nights;

        if (abs($validatedData['total_price'] - $expectedPrice) > 1) {
            return back()->withErrors([
                'total_price' => 'El precio total no es correcto.',
            ])->withInput();
        }

        DB::beginTransaction();

        try {
            $booking = Booking::create([
                'user_id' => Auth::id(),
                'room_id' => $room->id,
                'check_in_date' => $checkIn,
                'check_out_date' => $checkOut,
                'guests_adults' => $validatedData['guests_adults'],
                'guests_children' => $validatedData['guests_children'],
                'guest_name' => $validatedData['guest_name'],
                'guest_email' => $validatedData['guest_email'],
                'guest_phone' => $validatedData['guest_phone'],
                'guest_document' => $validatedData['guest_document'],
                'special_requests' => $validatedData['special_requests'],
                'total_price' => $validatedData['total_price'],
                'status' => 'confirmada',
            ]);

            // Verificar conflictos después de crear
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
                    'check_in_date' => 'La habitación ya no está disponible para las fechas seleccionadas.',
                ])->withInput();
            }

            DB::commit();

            return redirect()->route('booking-accommodations.show', $booking->id)
                ->with('success', 'Reserva creada exitosamente.');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors([
                'general' => 'Error al procesar la reserva. Inténtalo nuevamente.',
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $this->authorize('view', $booking);

        $booking->load([
            'room.accommodation.photos',
            'room.photos',
            'user',
        ]);

        return inertia('BookingAccommodations/Show', [
            'booking' => $booking,
        ]);
    }

    /**
     * Cancel the specified booking.
     */
    public function cancel(Booking $booking)
    {
        $this->authorize('update', $booking);

        if ($booking->status !== 'confirmada') {
            return back()->withErrors([
                'status' => 'Solo se pueden cancelar reservas confirmadas.',
            ]);
        }

        // Verificar si la fecha de check-in ya pasó
        if (Carbon::parse($booking->check_in_date)->isPast()) {
            return back()->withErrors([
                'check_in_date' => 'No se pueden cancelar reservas cuya fecha de check-in ya pasó.',
            ]);
        }

        $booking->update(['status' => 'cancelada']);

        return back()->with('success', 'Reserva cancelada exitosamente.');
    }

    /**
     * Generate booking voucher.
     */
    public function voucher(Booking $booking)
    {
        $this->authorize('view', $booking);

        $booking->load([
            'room.accommodation.photos',
            'room.photos',
            'user',
        ]);

        // Aquí puedes implementar la lógica para generar un PDF o vista del comprobante
        return response()->json([
            'message' => 'Voucher generation not implemented yet',
            'booking' => $booking,
        ]);
    }
}
