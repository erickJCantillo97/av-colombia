<?php

namespace App\Http\Controllers;

use App\Models\BookingProveedor;
use App\Models\BookingService;
use App\Models\PaymentProveedor;
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
            Carbon::now()->endOfMonth(),
        ];
    }

    public function index()
    {
        return Inertia::render('Contabilidad/Index');
    }

    public function getTotalReservas(Request $request)
    {
        // Calcular rango de fechas: últimos 6 meses + próximos 15 días
        $hoy = Carbon::now();
        $start = $hoy->copy()->subMonths(6)->startOfDay();
        $end = $hoy->copy()->addDays(15)->endOfDay();

        $bookings = BookingService::whereBetween('date', [
            $start,
            $end,
        ])
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->date)->format('Y-m-d');
            });

        // Generar todos los días en el rango para tener continuidad en la gráfica
        $counts = [];
        $currentDate = $start->copy();

        while ($currentDate <= $end) {
            $dateKey = $currentDate->format('Y-m-d');
            $dateLabel = $currentDate->format('d/m/Y');
            $isFuture = $currentDate->isAfter($hoy);

            $counts[$dateKey] = [
                'date' => $dateLabel,
                'cant' => isset($bookings[$dateKey]) ? $bookings[$dateKey]->count() : 0,
                'isFuture' => $isFuture,
            ];

            $currentDate->addDay();
        }

        return array_values($counts);
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
                    'total' => $booking->sum('total_real'),
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
            })
            ->sortByDesc('ventas')
            ->take(10)
            ->values();

        return $bookings;
    }

    public function pagos()
    {

        $payments = PaymentProveedor::with('user', 'proveedor')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Payments/Index', [
            'payments' => $payments,
        ]);
    }

    public function getPagosProveedores(Request $request)
    {
        // Calcular fecha de inicio (hace 12 meses) y fecha de fin (hoy)
        $endDate = Carbon::now();
        $startDate = Carbon::now()->subMonths(12);

        // Obtener pagos de los últimos 12 meses
        $pagosPorMes = PaymentProveedor::whereBetween('date', [$startDate, $endDate])
            ->get()
            ->groupBy(function ($payment) {
                return Carbon::parse($payment->date)->format('Y-m');
            })
            ->map(function ($payments, $yearMonth) {
                return [
                    'year_month' => $yearMonth,
                    'total_pagado' => $payments->sum('amount'),
                ];
            });

        // Obtener ventas/recaudado de los últimos 12 meses
        $ventasPorMes = BookingService::whereBetween('date', [$startDate, $endDate])
            ->get()
            ->groupBy(function ($booking) {
                return Carbon::parse($booking->date)->format('Y-m');
            })
            ->map(function ($bookings, $yearMonth) {
                return [
                    'year_month' => $yearMonth,
                    'total_recaudado' => $bookings->sum('total_real'),
                ];
            });

        // Generar los últimos 12 meses
        $resultado = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $yearMonth = $date->format('Y-m');
            $monthName = $date->translatedFormat('F Y');

            $resultado[] = [
                'month' => $monthName,
                'total_pagado' => $pagosPorMes->get($yearMonth)['total_pagado'] ?? 0,
                'total_recaudado' => $ventasPorMes->get($yearMonth)['total_recaudado'] ?? 0,
            ];
        }

        return $resultado;
    }

    public function getReservasPorTipoServicio(Request $request)
    {
        $start = Carbon::parse($request->startDate);
        $end = Carbon::parse($request->endDate);

        $reservas = BookingService::with('service')
            ->whereBetween('date', [$start, $end])
            ->join('services', 'booking_services.service_id', '=', 'services.id')
            ->groupBy('services.type')
            ->select('services.type')
            ->selectRaw('COUNT(booking_services.id) as cantidad')
            ->selectRaw(
                'SUM(booking_services.total_real) as ventas'
            )
            ->get()
            ->map(function ($bookings) {
                return [
                    'service' => $bookings->type ?? 'Sin Tipo',
                    'cantidad' => $bookings->cantidad,
                    'ventas' => $bookings->ventas,
                ];
            })
            ->sortByDesc('cantidad')
            ->values();

        return $reservas;
    }

    public function getTopServicios(Request $request)
    {
        $start = Carbon::parse($request->startDate);
        $end = Carbon::parse($request->endDate);

        $servicios = BookingService::with('service')
            ->whereBetween('date', [$start, $end])
            ->get()
            ->groupBy('service_id')
            ->map(function ($bookings) {
                return [
                    'service_id' => $bookings[0]->service_id,
                    'service_name' => $bookings[0]->service ?? 'Sin nombre',
                    'cantidad' => $bookings->count(),
                    'ventas' => $bookings->sum('total_real'),
                ];
            })
            ->sortByDesc('cantidad');

        return [
            'top5' => $servicios->take(5)->values(),
            'bottom5' => $servicios->reverse()->take(5)->values(),
        ];
    }

    public function getProveedorTopReservas(Request $request)
    {
        $start = Carbon::parse($request->startDate);
        $end = Carbon::parse($request->endDate);

        $topProveedor = BookingProveedor::with('proveedor', 'bookingService')
            ->whereHas('bookingService', function ($query) use ($start, $end) {
                $query->whereBetween('date', [$start, $end]);
            })
            ->get()
            ->groupBy('proveedor_id')
            ->map(function ($bookings) {
                return [
                    'proveedor_id' => $bookings[0]->proveedor_id,
                    'proveedor' => $bookings[0]->proveedor->nombre ?? 'Sin nombre',
                    'cantidad' => $bookings->count(),
                    'costos' => $bookings->sum('cost'),
                ];
            })
            ->sortByDesc('cantidad')
            ->first();

        return $topProveedor;
    }

    public function getVendedorTopReservas(Request $request)
    {
        $start = Carbon::parse($request->startDate);
        $end = Carbon::parse($request->endDate);

        $topVendedor = BookingService::with('user')
            ->whereBetween('date', [$start, $end])
            ->get()
            ->groupBy('user_id')
            ->map(function ($bookings) {
                return [
                    'user_id' => $bookings[0]->user_id,
                    'vendedor' => $bookings[0]->user->name ?? 'Sin nombre',
                    'cantidad' => $bookings->count(),
                    'ventas' => $bookings->sum('total_real'),
                ];
            })
            ->sortByDesc('cantidad')
            ->first();

        return $topVendedor;
    }

    public function getEstadisticasEstados(Request $request)
    {
        $start = Carbon::parse($request->startDate);
        $end = Carbon::parse($request->endDate);

        $reservas = BookingService::with(['states', 'proveedors.proveedor'])
            ->whereBetween('date', [$start, $end])
            ->get();

        $estadisticas = [
            'reservado' => ['cantidad' => 0, 'recaudado' => 0, 'pagado' => 0],
            'cancelado' => ['cantidad' => 0, 'recaudado' => 0, 'pagado' => 0],
            'no_show' => ['cantidad' => 0, 'recaudado' => 0, 'pagado' => 0],
        ];

        $totalReservas = $reservas->count();

        // Obtener todos los pagos a proveedores en el rango de fechas
        $pagosProveedores = PaymentProveedor::whereBetween('date', [$start, $end])
            ->get()
            ->groupBy('proveedor_id');

        foreach ($reservas as $reserva) {
            $estado = $reserva->status ?? 'reservado';

            // Calcular costos a proveedores para esta reserva
            $totalPagado = 0;
            foreach ($reserva->proveedors as $bookingProveedor) {
                // Sumar el costo del proveedor (cost_total es un accessor que incluye descuentos)
                $totalPagado += $bookingProveedor->cost_total ?? 0;
            }

            // Clasificar según el estado
            if ($estado === 'CANCELADA') {
                $estadisticas['cancelado']['cantidad']++;
                $estadisticas['cancelado']['recaudado'] += $reserva->total_real ?? 0;
                $estadisticas['cancelado']['pagado'] += $totalPagado;
            } elseif ($estado === 'NO SHOW') {
                $estadisticas['no_show']['cantidad']++;
                $estadisticas['no_show']['recaudado'] += $reserva->total_real ?? 0;
                $estadisticas['no_show']['pagado'] += $totalPagado;
            } else {
                $estadisticas['reservado']['cantidad']++;
                $estadisticas['reservado']['recaudado'] += $reserva->total_real ?? 0;
                $estadisticas['reservado']['pagado'] += $totalPagado;
            }
        }

        // Calcular porcentajes
        foreach ($estadisticas as $estado => &$data) {
            $data['porcentaje'] = $totalReservas > 0 ? round(($data['cantidad'] / $totalReservas) * 100, 1) : 0;
        }

        return $estadisticas;
    }

    public function getReservasAdelantadas(Request $request)
    {

        $hoy = Carbon::now()->format('Y-m-d');

        $reservasAdelantadas = BookingService::where('date', '>', $hoy)
            ->count();

        return $reservasAdelantadas;
    }

    public function getProveedorMasPagado(Request $request)
    {
        $start = Carbon::parse($request->startDate);
        $end = Carbon::parse($request->endDate);

        $topProveedoresPagados = PaymentProveedor::with('proveedor')
            ->whereBetween('date', [$start, $end])
            ->get()
            ->groupBy('proveedor_id')
            ->map(function ($payments) {

                return [
                    'proveedor_id' => $payments[0]->proveedor_id,
                    'proveedor' => $payments[0]->proveedor->nombre ?? 'Sin nombre',
                    'total_pagado' => $payments->sum('amount'),
                    'cantidad_pagos' => $payments->count(),
                ];
            })
            ->sortByDesc('total_pagado')
            ->take(2)
            ->values();

        return $topProveedoresPagados;
    }

    public function getReservasPorCanal(Request $request)
    {
        $start = Carbon::parse($request->startDate);
        $end = Carbon::parse($request->endDate);

        $reservasPorCanal = BookingService::with('channel')
            ->whereBetween('date', [$start, $end])
            ->get()
            ->groupBy('channel_id')
            ->map(function ($bookings) {
                return [
                    'channel_id' => $bookings[0]->channel_id,
                    'channel' => $bookings[0]->channel->name ?? 'Sin canal',
                    'cantidad' => $bookings->count(),
                    'ventas' => $bookings->sum('total_real'),
                ];
            })
            ->sortByDesc('ventas')
            ->values();

        return $reservasPorCanal;
    }
}
