<?php

namespace App\Repositories;

use App\Interfaces\BookingServiceRepositoryInterface;
use App\Interfaces\StateRepositoryInterface;
use App\Models\State;
use Illuminate\Support\Facades\Auth;

class StateRepository extends BaseRepository implements StateRepositoryInterface
{
    public function __construct(
    ) {
        parent::__construct();
    }
    public function model()
    {
        return State::class;
    }

    public function create(array $data): State
    {
        $data['user_id'] = Auth::user()->id;
        $data['statable_type'] = $data['statable_type'] ?? 'App\Models\BookingService';
        $data['terminated']  = $data['terminated'] ?? false;
        return $this->model->create($data);
    }
}
