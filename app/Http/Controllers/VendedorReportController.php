<?php

namespace App\Http\Controllers;

use App\Models\BookingService;
use App\Models\PagoSaldos;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendedorReportController extends Controller
{
    /**
     * Mostrar el formulario del informe de vendedores
     */
    public function index()
    {
        $vendedores = User::where('rol', 'vendedor')
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        return Inertia::render('Reports/VendedorReport', [
            'vendedores' => $vendedores,
        ]);
    }

    /**
     * Obtener el informe de un vendedor específico
     */
    public function show(Request $request, $vendedorId)
    {
        $request->validate([
            'fecha_inicio' => 'nullable|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
        ]);

        $vendedor = User::findOrFail($vendedorId);

        $query = BookingService::with(['service:id,title', 'payments.metohdPayment'])
            ->where('user_id', $vendedorId);

        if ($request->fecha_inicio) {
            $query->where('date', '>=', $request->fecha_inicio);
        }

        if ($request->fecha_fin) {
            $query->where('date', '<=', $request->fecha_fin);
        }

        $bookingServices = $query->get();

        // Calcular totales
        $totalVendido = 0;
        $totalRecaudo = 0;
        $totalPagado = 0;

        $detalles = $bookingServices->map(function ($booking) use (&$totalVendido, &$totalRecaudo, &$totalPagado) {
            // Total vendido (precio total)
            $precioTotal = ($booking->adults * $booking->adults_price) +
                          ($booking->boys * $booking->boys_price);

            // Recaudo (precio - tarifa)
            $recaudoAdultos = $booking->adults * ($booking->adults_price - $booking->adult_tarifa);
            $recaudoBoys = $booking->boys * ($booking->boys_price - $booking->boys_tarifa);
            $recaudo = $recaudoAdultos + $recaudoBoys;

            // Pagos realizados al vendedor
            $pagado = PagoSaldos::whereHas('bookingService', function ($query) use ($booking) {
                $query->where('id', $booking->id);
            })->sum('amount');

            $totalVendido += $precioTotal;
            $totalRecaudo += $recaudo;
            $totalPagado += $pagado;

            return [
                'id' => $booking->id,
                'servicio' => $booking->service,
                'fecha' => $booking->date,
                'cliente' => $booking->cliente_name,
                'adultos' => $booking->adults,
                'ninos' => $booking->boys,
                'precio_total' => $precioTotal,
                'recaudo' => $recaudo,
                'pagado' => $pagado,
                'saldo_pendiente' => $recaudo - $pagado,
                'status' => $booking->status,
            ];
        });

        return response()->json([
            'vendedor' => [
                'id' => $vendedor->id,
                'name' => $vendedor->name,
                'email' => $vendedor->email,
            ],
            'totales' => [
                'total_vendido' => round($totalVendido, 2),
                'total_recaudo' => round($totalRecaudo, 2),
                'total_pagado' => round($totalPagado, 2),
                'saldo_pendiente' => round($totalRecaudo - $totalPagado, 2),
            ],
            'detalles' => $detalles,
        ]);
    }
}
