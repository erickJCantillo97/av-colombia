<?php

namespace App\Http\Controllers;

use App\Models\PagoEntrada;
use App\Models\TicketType;
use App\Models\Ticket;
use App\Models\BookingService;
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
        $tickets = Ticket::with(['ticketType', 'bookingService'])
            ->latest()
            ->get();

        return Inertia::render("PagoEntradas/Index", [
            'pagoEntradas' => PagoEntrada::with('bookingService', 'user')->get(),
            'ticketTypes' => TicketType::with('services')->get(),
            'tickets' => $tickets,
            // 'bookingServices' => BookingService::select('id', 'client_name')->latest()->get()
        ]);
    }

    /**
     * Store ticket purchase
     */
    public function storeTicket(Request $request)
    {
        $data = $request->validate([
            'ticket_type_id' => 'required|exists:ticket_types,id',
            'booking_service_id' => 'nullable|exists:booking_services,id',
            'cantidad' => 'required|integer|min:1',
            'costo_total' => 'required|numeric|min:0',
        ]);

        $data['tipo_movimiento'] = 'entrada';

        FacadesDB::beginTransaction();
        try {
            Ticket::create($data);
            FacadesDB::commit();
            return back()->with('success', 'Ticket registrado exitosamente.');
        } catch (\Exception $e) {
            FacadesDB::rollBack();
            return back()->with('error', 'Error al registrar el ticket: ' . $e->getMessage());
        }
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
