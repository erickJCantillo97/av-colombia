<?php

namespace App\Http\Controllers;

use App\Models\BookingProveedor;
use App\Models\BookingService;
use App\Models\PaymentProveedor;
use App\Models\Proveedor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContabilidadController extends Controller
{


    private $daysMount = null;

    public function __construct()
    {
        $this->daysMount = [
            Carbon::now()->startOfMonth(),
            Carbon::now()->endOfMonth()
        ];
    }
    public function index()
    {
        return Inertia::render('Contabilidad/Index');
    }


    public function getTotalReservas(Request $request)
    {
        $start = Carbon::parse($request->startDate) ?? Carbon::now();
        $end = Carbon::parse($request->endDate) ?? Carbon::now();
        $bookings = BookingService::whereBetween('date', [
            $start,
            $end
        ])
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->date)->format('d/m/Y');
            });

        $counts = [];
        foreach ($bookings as $date => $booking) {
            $counts[$date] = [
                'date' => $date,
                'cant' => $booking->count()
            ];
        }

        return $counts;
    }


    public function getVentas(Request $request)
    {
        $start = Carbon::parse($request->startDate);
        $end = Carbon::parse($request->endDate);

        $bookings = BookingService::whereBetween('date', [$start, $end])->sum('total_real');
        return $bookings;
        // return $counts;
    }

    public function getVentasProveedores()
    {
        $bookings = BookingService::whereBetween('date', $this->daysMount)
            ->get()
            ->groupBy('proveedzor_id')
            ->map(function ($booking) {
                return [
                    'proveedor' => $booking[0]->proveedor->name,
                    'total' => $booking->sum('total_real')
                ];
            });

        return $bookings;
    }

    public function getCostosProveedores(Request $request)
    {
        $start = Carbon::parse($request->startDate);
        $end = Carbon::parse($request->endDate);

        $bookings = BookingProveedor::with('bookingService')->whereHas('bookingService', function ($query) use ($start, $end) {
            $query->whereBetween('date', [$start, $end]);
        })
            ->get()
            ->groupBy('proveedor_id')
            ->map(function ($booking) {
                return [
                    'ventas' => array_reduce($booking->toArray(), function ($carry, $item) {
                        // dd($item);
                        return $carry + $item['booking_service']['total_real'];
                    }),
                    'proveedor' => $booking[0]->proveedor->nombre,
                    'costos' => $booking->sum('cost'),
                ];
            })->sortByDesc('ventas');
        return $bookings;
    }

    public function pagos()
    {

        $payments = PaymentProveedor::with('user', 'proveedor')->get();
        
        return Inertia::render('Payments/Index', [
            'payments' => $payments
        ]);
    }
}
