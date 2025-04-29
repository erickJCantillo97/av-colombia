<?php

namespace App\Repositories;

use App\Interfaces\NoteRepositoryInterface;
use App\Models\Note;

use App\Models\Service;

use App\Models\User;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpSpreadsheet\Calculation\Logical\Boolean;

class NoteRepository extends BaseRepository implements NoteRepositoryInterface
{
    public function model()
    {
        return Note::class;
    }

    public function create(array $data): Note | bool
    {
        if (!empty($data['note'])) {
            $data['user_id'] = Auth::user()->id;
            return $this->model->create($data);
        }
        return false;
    }
}
