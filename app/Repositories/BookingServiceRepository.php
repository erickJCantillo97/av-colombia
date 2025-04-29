<?php


namespace App\Repositories;

use App\Interfaces\BookingServiceRepositoryInterface;
use App\Interfaces\NoteRepositoryInterface;
use App\Interfaces\ServiceRepositoryInterface;
use App\Models\BookingService;
use App\Models\State;
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
        $booking = $this->model->with('service', 'extras', 'user', 'payments', 'payments.metohdPayment', 'proveedors', 'proveedors.proveedor', 'channel', 'notes', 'changes')
            ->orderBy('created_at', 'DESC')->where('created_at', '>=', now()->subDays(90));

        if (Auth::user()->rol == 'vendedor') {
            $booking = $booking->where('user_id', Auth::user()->id);
        }

        return $booking->get()->map(function ($booking) {
            return $this->map($booking);
        });
    }

    public function getAll()
    {
        $booking = $this->model->with('service', 'extras', 'user', 'payments', 'payments.metohdPayment', 'proveedors', 'proveedors.proveedor', 'channel', 'notes')
            ->orderBy('created_at', 'DESC');

        if (Auth::user()->rol == 'vendedor') {
            $booking = $booking->where('user_id', Auth::user()->id);
        }

        return $booking->get()->map(function ($booking) {
            return $this->map($booking);
        });
    }

    public function create(array $data)
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

        $bookingService =  BookingService::create($data);
        $this->createNote($bookingService, $data);
        $this->stateRepository->create([
            'statable_id' => $bookingService->id,
            'state' => 'reservado',
        ]);
        $this->addChange(
            $bookingService,
            [
                'description' => 'Reserva creada',
            ]
        );
        return $bookingService;
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
        $bookingService =  $this->getById($id);
        $bookingService->fill($data);
        $changes = $bookingService->getDirty();
        $original = $bookingService->getOriginal();
        foreach ($changes as $key => $newValue) {
            $oldValue = $original[$key] ?? null;
            $this->addChange(
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



    private function createNote(BookingService $booking, array $data): void
    {
        $this->noteRepository->create([
            'booking_service_id' => $booking->id,
            'note' => $data['observations'] ?? '',
        ]);
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
            'channel' => $booking->channel,
            'total_price_sales' => $booking->total_price_sales,
            'service_type' => $booking->service()->get()->first()->type,
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

    private function addChange(BookingService $bookingService, $data)
    {

        addChanges($bookingService, $data);
    }
}
