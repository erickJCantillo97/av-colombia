<?php

namespace App\Exports;

use App\Models\BookingService;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class BookingServicesExport implements FromQuery, ShouldAutoSize, WithHeadings, WithMapping, WithStyles, WithTitle
{
    public function __construct(
        private ?string $type = null,
        private ?array $dates = null,
        private ?string $search = null,
        private array $columnFilters = [],
        private ?string $status = null,
    ) {}

    public function query()
    {
        $query = BookingService::query()
            ->with([
                'vendedor:id,name',
                'channel:id,name',
                'payments:id,payable_id,amount',
            ])
            ->orderByDesc('created_at');

        if ($this->type) {
            $query->whereHas('service', fn ($q) => $q->where('type', $this->type));
        }

        if ($this->dates && count($this->dates) === 2) {
            $startDate = Carbon::parse($this->dates[0])->format('Y-m-d');
            $endDate = Carbon::parse($this->dates[1])->format('Y-m-d');
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        if ($this->search) {
            $query->where(function ($q) {
                $q->where('cliente_name', 'like', "%{$this->search}%")
                    ->orWhere('service', 'like', "%{$this->search}%")
                    ->orWhere('id', 'like', "%{$this->search}%")
                    ->orWhere('code_booking_platform', 'like', "%{$this->search}%");
            });
        }

        if (! empty($this->columnFilters)) {
            foreach ($this->columnFilters as $field => $value) {
                if (empty($value)) {
                    continue;
                }

                if (str_contains($field, '.')) {
                    [$relation, $column] = explode('.', $field);
                    $query->whereHas($relation, fn ($q) => $q->where($column, 'like', "%{$value}%"));
                } else {
                    $query->where($field, 'like', "%{$value}%");
                }
            }
        }

        if ($this->status) {
            $query->whereHas('states', function ($q) {
                $q->whereIn('id', function ($sub) {
                    $sub->selectRaw('MAX(id)')
                        ->from('states')
                        ->whereColumn('statable_id', 'booking_services.id')
                        ->where('statable_type', 'App\Models\BookingService')
                        ->groupBy('statable_id');
                })->where('state', $this->status);
            });
        }

        return $query;
    }

    public function headings(): array
    {
        return [
            'Número de Reserva',
            'Fecha de Reserva',
            'Nombre Pasajero',
            'Tour',
            'Fecha de Actividad',
            'Número de Pasajeros',
            'Valor por Pasajero',
            'Valor Total Reserva',
            'Vendedor',
            'Canal de Venta',
            'Abono',
            'Saldo',
        ];
    }

    /**
     * @param  BookingService  $booking
     */
    public function map($booking): array
    {
        $totalPasajeros = $booking->adults + $booking->boys;
        $abono = $booking->payments->sum('amount');
        $canal = $booking->channel?->name ?? 'N/A';
        $vendedor = $canal == 'Vendedor' ? ($booking->vendedor?->name ?? 'N/A') : 'N/A';
        $fechaReserva = Carbon::parse($booking->created_at)->format('d/m/Y H:i');
        $fechaActividad = Carbon::parse($booking->date)->format('d/m/Y');

        return [
            $booking->code,
            $fechaReserva,
            $booking->cliente_name,
            $booking->service,
            $fechaActividad,
            $totalPasajeros,
            $booking->adults_price,
            $booking->total,
            $vendedor,
            $canal,
            $abono,
            $booking->saldo,
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => [
                'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
                'fill' => ['fillType' => 'solid', 'startColor' => ['rgb' => '2563EB']],
            ],
        ];
    }

    public function title(): string
    {
        return 'Reservas';
    }
}
