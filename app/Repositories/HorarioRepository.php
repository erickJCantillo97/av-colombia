<?php

namespace App\Repositories;

use App\Interfaces\HorarioRepositoryInterface;
use App\Models\Horario;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\DB;

class HorarioRepository extends BaseRepository implements HorarioRepositoryInterface
{

    public function model()
    {

        return Horario::class;
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $dataStore = [
                'day' => $data['day'],
                'day_number' => $data['day_number'],
                'availability_id' => $data['availability_id'],
            ];
            $this->model
                ->where('availability_id', $data['availability_id'])
                ->where('day', $data['day'])
                ->delete();

            foreach ($data['times'] as $time) {
                $dataStore['start'] = $time['start'];
                $dataStore['end'] = $time['end'] ?? null;
                $this->model->create($dataStore);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
