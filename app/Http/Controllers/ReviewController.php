<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Review::with(['user', 'accommodation'])
            ->recent();

        // Filtrar por alojamiento si se especifica
        if ($request->filled('accommodation_id')) {
            $query->where('accommodation_id', $request->accommodation_id);
        }

        // Filtrar por rating mínimo
        if ($request->filled('min_rating')) {
            $query->withMinRating($request->min_rating);
        }

        $reviews = $query->paginate($request->get('per_page', 15));

        return response()->json($reviews);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'accommodation_id' => 'required|exists:accommodations,id',
            'booking_id' => 'required|exists:bookings,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10|max:1000',
        ]);

        $booking = Booking::findOrFail($validatedData['booking_id']);

        // Verificar que el usuario sea propietario de la reserva
        if ($booking->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'No tienes permiso para reseñar esta reserva.',
            ], 403);
        }

        // Verificar que la reserva haya sido completada
        if ($booking->status !== 'confirmada' || $booking->check_out_date > now()) {
            return response()->json([
                'message' => 'Solo puedes reseñar después de completar tu estadía.',
                'errors' => [
                    'booking' => ['Reserva no completada'],
                ],
            ], 422);
        }

        // Verificar que no exista ya una reseña para esta reserva
        $existingReview = Review::where('user_id', Auth::id())
            ->where('booking_id', $booking->id)
            ->first();

        if ($existingReview) {
            return response()->json([
                'message' => 'Ya has reseñado esta reserva.',
                'errors' => [
                    'review' => ['Reseña ya existe'],
                ],
            ], 422);
        }

        $review = Review::create([
            'user_id' => Auth::id(),
            'accommodation_id' => $validatedData['accommodation_id'],
            'booking_id' => $validatedData['booking_id'],
            'rating' => $validatedData['rating'],
            'comment' => $validatedData['comment'],
        ]);

        $review->load(['user', 'accommodation']);

        return response()->json([
            'message' => 'Reseña creada exitosamente.',
            'data' => $review,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review): JsonResponse
    {
        $review->load(['user', 'accommodation', 'booking']);

        return response()->json([
            'data' => $review,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review): JsonResponse
    {
        // Verificar que el usuario sea propietario de la reseña
        if ($review->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'No tienes permiso para editar esta reseña.',
            ], 403);
        }

        $validatedData = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10|max:1000',
        ]);

        $review->update($validatedData);

        $review->load(['user', 'accommodation']);

        return response()->json([
            'message' => 'Reseña actualizada exitosamente.',
            'data' => $review,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review): JsonResponse
    {
        // Verificar que el usuario sea propietario de la reseña
        if ($review->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'No tienes permiso para eliminar esta reseña.',
            ], 403);
        }

        $review->delete();

        return response()->json([
            'message' => 'Reseña eliminada exitosamente.',
        ]);
    }
}
