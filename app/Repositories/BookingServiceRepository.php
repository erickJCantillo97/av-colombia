<?php

namespace App\Repositories;

use App\Interfaces\BookingServiceRepositoryInterface;
use App\Interfaces\NoteRepositoryInterface;
use App\Interfaces\ServiceRepositoryInterface;
use App\Models\BookingService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class BookingServiceRepository extends BaseRepository implements BookingServiceRepositoryInterface
{
    public function __construct(

        private ServiceRepositoryInterface $service,
        private NoteRepositoryInterface $noteRepository,
        private StateRepository $stateRepository,
    ) {
        parent::__construct();
    }

    public function model()
    {
        return BookingService::class;
    }

    public function getRecentAll()
    {
        $booking = $this->model
            ->with([
                'service:id,title,type',
                'extras:id,booking_service_id', // Replace ... with needed columns
                'user:id,name,email', // Only select needed columns
                'payments:id,booking_service_id',
                'payments.metohdPayment:id,name', // Only select needed columns
                'proveedors:id,booking_service_id,proveedor_id,cost,concept',
                'proveedors.proveedor:id,nombre',
                'channel:id,name',
                'notes:id,booking_service_id',
                'changes:id,booking_service_id',
            ])
            ->orderByDesc('created_at')
            ->where('created_at', '>=', now()->subDays(15));

        if (Auth::user()->rol === 'vendedor') {
            $booking->where('user_id', Auth::id());
        }

        return $booking->get()->map(fn ($booking) => $this->map($booking));
    }

    public function getAll()
    {
        $booking = $this->model
            ->with([
                'service:id,title,type',
                'extras:id,booking_service_id', // Add specific columns you need
                'user:id,name,email',
                // 'payments:id', // Add specific columns you need
                'payments.metohdPayment:id,name',
                'proveedors:id,booking_service_id,proveedor_id,cost,concept',
                'proveedors.proveedor:id,nombre',
                'channel:id,name',
                'notes:id,booking_service_id',
                'changes:id,booking_service_id',
            ])
            ->orderByDesc('created_at');

        return $booking->get()->map(fn ($booking) => $this->map($booking));
    }

    public function getAllByDate($dates)
    {
        $star_date = Carbon::parse($dates[0])->format('Y-m-d');
        $end_date =    Carbon::parse($dates[1])->addDay()->format('Y-m-d');
        $booking = $this->model->whereBetween('created_at', [
            $star_date,
            $end_date
        ])->with('service', 'extras', 'user', 'payments', 'payments.metohdPayment', 'proveedors', 'proveedors.proveedor', 'channel', 'notes')
            ->orderBy('date', 'DESC');
        
        if (Auth::user()->rol === 'vendedor') {
            $booking->where('user_id', Auth::id());
        }

        return $booking->get()->map(fn ($booking) => $this->map($booking));
    }

    public function getAllByDateCreated($dates)
    {
        $star_date = Carbon::parse($dates[0])->format('Y-m-d');
        $end_date =    Carbon::parse($dates[1])->format('Y-m-d');
        $booking = $this->model->whereBetween('created_at', [
            $star_date,
            $end_date
        ])->with('service', 'extras', 'user', 'payments', 'payments.metohdPayment', 'proveedors', 'proveedors.proveedor', 'channel', 'notes')
            ->orderBy('created_at', 'DESC');
        
        if (Auth::user()->rol === 'vendedor') {
            $booking->where('user_id', Auth::id());
        }

        return $booking->get()->map(fn ($booking) => $this->map($booking));
    }

    public function create(array $data)
    {
        $data['hour'] = explode(',', $data['date'])[1];
        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d');
        $service = $this->service->getById($data['service_id']);
        $data['boys'] = $data['boys'] ?? 0;
        $data['service'] = $service->title;
        $data['adults_price'] = $service->adults_price;
        $data['adult_tarifa'] = $service->adult_tarifa;
        $data['boys_price'] = $service->boys_price;
        $data['boys_tarifa'] = $service->boy_tarifa;
        $status = Auth::user()->rol == 'vendedor' ? 'SIN CONFIRMAR' : 'reservado';

        return $this->store($data, $status);

    }

    public function update($id, array $data): bool
    {
        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d');
        $service = $this->service->getById($data['service_id']);
        $data['boys'] = $data['boys'] ?? 0;
        $data['hour'] = explode(',', request('date'))[1];
        $data['user_id'] = request('user_id') ?? Auth::id();
        $data['service'] = $service->title;
        $data['adults_price'] = $service->adults_price;
        $data['adult_tarifa'] = $service->adult_tarifa;
        $data['boys_price'] = $service->boys_price;
        $data['boys_tarifa'] = $service->boy_tarifa;
        $bookingService = $this->getById($id);
        $bookingService->fill($data);
        $changes = $bookingService->getDirty();
        $original = $bookingService->getOriginal();
        foreach ($changes as $key => $newValue) {
            $oldValue = $original[$key] ?? null;
            addChanges(
                $bookingService,
                [
                    'field' => $key,
                    'before' => $oldValue,
                    'after' => $newValue,
                ]
            );
        }

        return $bookingService->save();
    }

    public function store(array $data, string $status = 'reservado', $userId = null): BookingService
    {
        $userId = $userId ?? Auth::id();
        $data['user_id'] = $userId;
        $bookingService = $this->model->create($data);
        $this->noteRepository->create([
            'booking_service_id' => $bookingService->id,
            'note' => $data['observations'] ?? '',
        ]);
        storeState($bookingService, $status, $userId);

        return $bookingService;
    }

    private function map(BookingService $booking): array
    {
        return [
            'id' => $booking->id,
            'method_id' => $booking->method_id,
            'service_id' => $booking->service_id,
            'channel_id' => $booking->channel_id,
            'service' => $booking->service,
            'user' => $booking->user,
            'channel' => $booking->channel,
            'date' => $booking->date,
            'hour' => $booking->hour,
            'adults' => $booking->adults,
            'boys' => $booking->boys,
            'status' => strtoupper($booking->status),
            'cliente_name' => $booking->cliente_name,
            'created_at' => $booking->created_at,
            'cliente_email' => $booking->cliente_email,
            'cliente_phone' => $booking->cliente_phone,
            'cliente_building' => $booking->cliente_building,
            'cliente_city' => $booking->cliente_city,
            'notes' => $booking->notes->count(),
            'fecha_cancelacion' => $booking->fecha_cancelacion,
            'time_service' => $booking->time_service,
            'observations' => $booking->observations,
            'total_real' => $booking->total_real,
            'saldo' => $booking->saldo,
            'file' => $booking->file,
            'conductor' => $booking->conductor,
            'placa' => $booking->placa,
            'total_pago_proveedor' => $booking->total_pago_proveedor,
            'total' => $booking->total,
            'total_price_sales' => $booking->total_price_sales,
            // 'service_type' => $booking->service->type,
            'proveedors_names' => $booking->proveedors->map(function ($proveedor) {
                return $proveedor->proveedor->nombre;
            })->implode(', '),
            'problematic' => $booking->problematic,
            'proveedors' => $booking->proveedors->map(function ($proveedor) {
                return [
                    'id' => $proveedor->id,
                    'proveedor_id' => $proveedor->proveedor->id,
                    'proveedor' => $proveedor,
                    'cost' => $proveedor->cost,
                    'concept' => $proveedor->concept,
                ];
            }),
            'extras' => $booking->extras,
        ];
    }

    public function delete($id)
    {
        $bookingService = $this->getById($id);
        $bookingService->notes()->delete();
        $bookingService->changes()->delete();
        $bookingService->payments()->delete();
        $bookingService->extras()->delete();
        $bookingService->proveedors()->delete();
        $bookingService->delete();
    }
}
