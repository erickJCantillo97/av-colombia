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


        $bookings = BookingService::whereBetween('date', $this->daysMount)
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->date)->format('Y-m-d');
            });

        $counts = [];
        foreach ($bookings as $date => $booking) {
            $counts[$date] = [
                'date' => $date,
                'cant' => $booking->count()
            ];
        }

        // return $counts;
        return Inertia::render('Contabilidad/Index', [
            'bookings' => $counts
        ]);
    }


    public function getVentasMouth()
    {
        $bookings = BookingService::whereBetween('date', $this->daysMount)->sum('total_real');
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

    public function getCostosProveedores()
    {
        $bookings = BookingProveedor::with('bookingService')->whereHas('bookingService', function ($query) {
            $query->whereBetween('date', $this->daysMount);
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
