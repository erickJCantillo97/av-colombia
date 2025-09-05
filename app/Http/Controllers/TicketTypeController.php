<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketTypeRequest;
use App\Http\Requests\UpdateTicketTypeRequest;
use App\Models\TicketType;
use App\Models\Service;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Exception;

class TicketTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ticketTypes = TicketType::with('services')->get();
        $services = Service::select('id', 'title')->get();
        
        return Inertia::render('Settings/TiquetesType/Index', [
            'ticketTypes' => $ticketTypes,
            'services' => $services
        ]);
    }

    public function getTicketTypes()
    {
        $ticketTypes = TicketType::with('services')->get();
        
        return response()->json([
            'ticketTypes' => $ticketTypes
        ]);
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
    public function store(StoreTicketTypeRequest $request)
    {
        try {
            DB::beginTransaction();
            $data = $request->validated();
            $services = $data["services"];
            unset($data['services']);
            $ticketType = TicketType::create($data);
            $ticketType->services()->attach($services);
            DB::commit();
            
            return back()->with('success', 'Tipo de ticket creado exitosamente');
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al crear el tipo de ticket: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(TicketType $ticketType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TicketType $ticketType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketTypeRequest $request, TicketType $ticketType)
    {
        try {
            DB::beginTransaction();
            $data = $request->validated();
            $services = $data["services"];
            unset($data['services']);
            
            $ticketType->update($data);
            $ticketType->services()->sync($services);
            DB::commit();
            
            return back()->with('success', 'Tipo de ticket actualizado exitosamente');
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al actualizar el tipo de ticket: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TicketType $ticketType)
    {
        try {
            DB::beginTransaction();
            $ticketType->services()->detach();
            $ticketType->delete();
            DB::commit();
            
            return back()->with('success', 'Tipo de ticket eliminado exitosamente');
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al eliminar el tipo de ticket: ' . $e->getMessage()]);
        }
    }
}
