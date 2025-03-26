<?php

use App\Models\BookingService;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;

function createNote(BookingService $bookingService, $note = ''): Note
{
    if (empty($note)) {
        throw new InvalidArgumentException('Note content cannot be empty.');
    }
    $note = Note::create([
        'booking_service_id' => $bookingService->id,
        'note' => $note,
        'user_id' => Auth::id(),
    ]);

    return $note;
}
