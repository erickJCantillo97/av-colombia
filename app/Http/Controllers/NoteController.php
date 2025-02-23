<?php

namespace App\Http\Controllers;

use App\Models\BookingService;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Note::with('user')->where('booking_service_id', request('booking_service_id'))->get();
        return response()->json(['notes' => $notes], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'note' => 'required',
            'booking_service_id' => 'required',
        ]);
        try {
            $validated['user_id'] = auth()->id();
            Note::create($validated);
            return response()->json(['message' => 'Note created successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating note'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        $note->update([
            'note' => $request->note
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        //
    }
}
