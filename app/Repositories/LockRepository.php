<?php


namespace App\Repositories;

use App\Interfaces\LockRepositoryInterface;
use App\Models\Lock;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Log;

class LockRepository extends BaseRepository implements LockRepositoryInterface
{
    public function model()
    {
        return Lock::class;
    }

    public function getAll()
    {
        return $this->model->all();
    }
}
