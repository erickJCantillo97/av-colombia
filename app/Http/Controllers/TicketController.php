<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;
use Exception;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreTicketRequest $request)
    {
        try {
            DB::beginTransaction();
            Ticket::create($request->validated());
            DB::commit();
            
            return back()->with('success', 'Ticket creado exitosamente');
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al crear el ticket: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        try {
            DB::beginTransaction();
            $ticket->update($request->validated());
            DB::commit();
            
            return back()->with('success', 'Ticket actualizado exitosamente');
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al actualizar el ticket: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        try {
            DB::beginTransaction();
            $ticket->delete();
            DB::commit();
            
            return back()->with('success', 'Ticket eliminado exitosamente');
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al eliminar el ticket: ' . $e->getMessage()]);
        }
    }
}
