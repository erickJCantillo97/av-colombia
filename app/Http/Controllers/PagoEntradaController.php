<?php

namespace App\Http\Controllers;

use App\Models\PagoEntrada;
use Illuminate\Container\Attributes\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB as FacadesDB;
use Inertia\Inertia;

class PagoEntradaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("PagoEntradas/Index", [
            'pagoEntradas' => PagoEntrada::with('bookingService', 'user')->get()
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
    public function store(Request $request)
    {
        $data = $request->validate([
            'booking_service_id' => 'required|exists:booking_services,id',
            'total_cost' => 'required|numeric|min:0',
            'cant' => 'required|numeric|min:0',
        ]);
        FacadesDB::beginTransaction();
        try {
            PagoEntrada::create($data);
            FacadesDB::commit();
            return back()->with('success','Pago registrado exitosamente.');
        } catch (\Exception $e) {
            FacadesDB::rollBack();
            return back()->with('error','Error al registrar el pago.'); 
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(PagoEntrada $pagoEntrada)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PagoEntrada $pagoEntrada)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PagoEntrada $pagoEntrada)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PagoEntrada $pagoEntrada)
    {
        //
    }
}
