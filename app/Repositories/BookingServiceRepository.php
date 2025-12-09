<?php

namespace App\Repositories;

use App\Interfaces\BookingServiceRepositoryInterface;
use App\Interfaces\NoteRepositoryInterface;
use App\Interfaces\ServiceRepositoryInterface;
use App\Models\BookingService;
use App\Models\Service;
use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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

    public function getAllByDate($dates, ?string $type = null)
    {
        $star_date = Carbon::parse($dates[0])->format('Y-m-d');
        $end_date = Carbon::parse($dates[1])->format('Y-m-d');
        $booking = $this->model->whereBetween('date', [
            $star_date,
            $end_date,
        ])->with('service', 'extras', 'user', 'payments', 'payments.metohdPayment', 'proveedors', 'proveedors.proveedor', 'channel', 'notes')
            ->orderBy('date', 'DESC');

        if (Auth::user()->rol === 'vendedor') {
            $booking->where('user_id', Auth::id());
        }

        if ($type) {
            $booking->whereHas('service', function ($query) use ($type) {
                $query->where('type', $type);
            });
        }

        return $booking->get()->map(fn ($booking) => $this->map($booking));
    }

    public function getAllByDateCreated($dates, ?string $type = null)
    {
        $star_date = Carbon::parse($dates[0])->format('Y-m-d');
        $end_date = Carbon::parse($dates[1])->format('Y-m-d');
        $booking = $this->model->whereBetween('created_at', [
            $star_date,
            $end_date,
        ])->with('service', 'extras', 'user', 'payments', 'payments.metohdPayment', 'proveedors', 'proveedors.proveedor', 'channel', 'notes')
            ->orderBy('created_at', 'DESC');

        if (Auth::user()->rol === 'vendedor') {
            $booking->where('user_id', Auth::id());
        }

        if ($type) {
            $booking->whereHas('service', function ($query) use ($type) {
                $query->where('type', $type);
            });
        }

        return $booking->get()->map(fn ($booking) => $this->map($booking));
    }

    public function getPaginated(?string $type = null, ?string $search = null, int $perPage = 100, ?array $dates = null, array $columnFilters = [], ?string $status = null)
    {
        $query = $this->model
            ->with([
                'service:id,title,type',
                'extras',
                'user:id,name,email',
                'payments',
                'payments.metohdPayment:id,name',
                'proveedors',
                'proveedors.proveedor:id,nombre',
                'channel:id,name',
                'notes',
                'changes',
            ])
            ->orderBy('created_at', 'DESC');

        // Filter by user role
        if (Auth::user()->rol != 'superadmin' && Auth::user()->rol != 'admin' && Auth::user()->rol != 'cordinador') {
            $query->where('user_id', Auth::id());
        }

        // Filter by service type
        if ($type) {
            $query->whereHas('service', function ($q) use ($type) {
                $q->where('type', $type);
            });
        }

        // Filter by date range if provided
        if ($dates && is_array($dates) && count($dates) === 2) {
            $startDate = Carbon::parse($dates[0])->format('Y-m-d');
            $endDate = Carbon::parse($dates[1])->format('Y-m-d');
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        // Global search
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('cliente_name', 'like', "%{$search}%")
                    ->orWhere('cliente_phone', 'like', "%{$search}%")
                    ->orWhere('cliente_city', 'like', "%{$search}%")
                    ->orWhere('cliente_building', 'like', "%{$search}%")
                    ->orWhere('service', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%");
            });
        }

        // Column-specific filters
        if (!empty($columnFilters)) {
            foreach ($columnFilters as $field => $value) {
                if (empty($value)) {
                    continue;
                }

                // Handle nested relationships (e.g., 'channel.name')
                if (str_contains($field, '.')) {
                    $parts = explode('.', $field);
                    $relation = $parts[0];
                    $column = $parts[1];
                    
                    $query->whereHas($relation, function ($q) use ($column, $value) {
                        $q->where($column, 'like', "%{$value}%");
                    });
                } elseif ($field === 'proveedors_names') {
                    // Special handling for proveedors_names (computed field)
                    $query->whereHas('proveedors.proveedor', function ($q) use ($value) {
                        $q->where('nombre', 'like', "%{$value}%");
                    });
                
                }
                 else {
                    // Direct column filter
                    $query->where($field, 'like', "%{$value}%");
                }
            }
        }

        // Status filter - Verifica que el último estado coincida
        if ($status) {
            $query->whereHas('states', function ($q) use ($status) {
                $q->whereIn('id', function ($subQuery) {
                    $subQuery->select(DB::raw('MAX(id)'))
                        ->from('states')
                        ->whereColumn('statable_id', 'booking_services.id')
                        ->where('statable_type', 'App\Models\BookingService')
                        ->groupBy('statable_id');
                })
                ->where('state', $status);
            });
        }

        $paginated = $query->paginate($perPage)->withQueryString();

        return [
            'data' => $paginated->map(fn ($booking) => $this->map($booking)),
            'current_page' => $paginated->currentPage(),
            'last_page' => $paginated->lastPage(),
            'per_page' => $paginated->perPage(),
            'total' => $paginated->total(),
            'from' => $paginated->firstItem(),
            'to' => $paginated->lastItem(),
        ];
    }

    public function getAllFromStoredProcedure(?string $type = null)
    {
        $userId = Auth::id();
        $userRol = Auth::user()->rol;

        $results = DB::select('CALL get_all_booking_services(?, ?, ?)', [
            $userId,
            $userRol,
            $type,
        ]);

        // Convertir los resultados en una colección y cargar las relaciones necesarias
        $bookingIds = collect($results)->pluck('id')->toArray();

        $bookings = $this->model
            ->whereIn('id', $bookingIds)
            ->with([
                'service:id,title,type',
                'extras:id,booking_service_id',
                'user:id,name,email',
                'payments:id,booking_service_id',
                'payments.metohdPayment:id,name',
                'proveedors:id,booking_service_id,proveedor_id,cost,concept',
                'proveedors.proveedor:id,nombre',
                'channel:id,name',
                'notes:id,booking_service_id',
                'changes:id,booking_service_id',
            ])
            ->orderByDesc('created_at')
            ->get();

        return $bookings->map(fn ($booking) => $this->map($booking));
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

        $bookingService = $this->store($data, $status);

        $this->createTickets($bookingService);

        return $bookingService;
    }

    public function update($id, array $data): bool
    {
        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d');
        $service = $this->service->getById($data['service_id']);
        $data['boys'] = $data['boys'] ?? 0;
        $data['hour'] = explode(',', request('date'))[1];
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
            'vendedor_id' => $booking->vendedor_id,
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
            'service_type' => $booking->service->type ?? null,
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

    private function createTickets(BookingService $bookingService)
    {

        $ticktTypes = $bookingService->service()->first()->ticketTypes()->get();
        // dd($ticktTypes);
        if ($ticktTypes->isEmpty()) {
            return;
        }
        if ($bookingService->adults > 0) {
            if ($bookingService->adults_nacionales > 0) {
                $ticktAdultNacional = $ticktTypes
                    ->filter(function ($item) {
                        return str_contains(strtoupper($item->name), 'ADULTO') && str_contains(strtoupper($item->name), 'NACIONAL');
                    })
                    ->first();
                //  dd($ticktAdultNacional);

                if ($ticktAdultNacional) {

                    Ticket::create([
                        'booking_service_id' => $bookingService->id,
                        'ticket_type_id' => $ticktAdultNacional->id,
                        'cantidad' => $bookingService->adults_nacionales,
                        'costo_total' => $ticktAdultNacional->price * $bookingService->adults_nacionales,
                        'tipo_movimiento' => 'salida',
                    ]);
                }
            }
            if ($bookingService->adults_extranjeros > 0) {
                $ticktAdultExtranjero = $ticktTypes
                    ->filter(function ($item) {
                        return str_contains(strtoupper($item->name), 'ADULTO') && str_contains(strtoupper($item->name), 'EXTRANJERO');
                    })
                    ->first();
                if ($ticktAdultExtranjero) {
                    Ticket::create([
                        'booking_service_id' => $bookingService->id,
                        'ticket_type_id' => $ticktAdultExtranjero->id,
                        'cantidad' => $bookingService->adults_extranjeros,
                        'costo_total' => $ticktAdultExtranjero->price * $bookingService->adults_extranjeros,
                        'tipo_movimiento' => 'salida',
                    ]);
                }
            }
            if ($bookingService->boys_nacionales > 0) {
                $ticktboyNacional = $ticktTypes
                    ->filter(function ($item) {
                        return str_contains(strtoupper($item->name), 'NIÑO') && str_contains(strtoupper($item->name), 'NACIONAL');
                    })
                    ->first();
                if ($ticktboyNacional) {
                    Ticket::create([
                        'booking_service_id' => $bookingService->id,
                        'ticket_type_id' => $ticktboyNacional->id,
                        'cantidad' => $bookingService->boys_nacionales,
                        'costo_total' => $ticktboyNacional->price * $bookingService->boys_nacionales,
                        'tipo_movimiento' => 'salida',
                    ]);
                }
            }
            if ($bookingService->boys_extranjeros > 0) {
                // Crear tickets para niños extranjeros
                $ticktboyExtranjero = $ticktTypes
                    ->filter(function ($item) {
                        return str_contains(strtoupper($item->name), 'NIÑO') && str_contains(strtoupper($item->name), 'EXTRANJERO');
                    })
                    ->first();
                if ($ticktboyExtranjero) {
                    Ticket::create([
                        'booking_service_id' => $bookingService->id,
                        'ticket_type_id' => $ticktboyExtranjero->id,
                        'cantidad' => $bookingService->boys_extranjeros,
                        'costo_total' => $ticktboyExtranjero->price * $bookingService->boys_extranjeros,
                        'tipo_movimiento' => 'salida',
                    ]);
                }
            }
        }
    }

    public function getPendingActivitiesCount(): array
    {
        $query = $this->model
            ->whereHas('states', function ($q) {
                $q->where('state', 'SIN CONFIRMAR')
                    ->whereRaw('id = (SELECT MAX(id) FROM states WHERE statable_id = booking_services.id AND statable_type = ?)', ['App\Models\BookingService']);
            })
            ->with('service:id,type');

        if (Auth::user()->rol === 'vendedor') {
            $query->where('user_id', Auth::id());
        }

        $bookings = $query->get();
        

        $activities = $bookings->groupBy('service.type')->map(function ($group, $type) {
         
            return [
                'type' => $type,
                'count' => $group->count(),
            ];
        })->values()->toArray();

        return $activities;
    }
}
