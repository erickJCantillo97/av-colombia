<?php


namespace App\Repositories;


use App\Interfaces\BookingExtrasRepositoryInterface;
use App\Models\BookingExtras;

class BookingExtrasRepository extends BaseRepository implements BookingExtrasRepositoryInterface
{
    public function model()
    {
        return BookingExtras::class;
    }

    public function create(array $data): BookingExtras
    {
        $data['total_price'] = $data['cantidad'] * $data['unit_price'];
        return $this->model->create($data);
    }

    public function update($id, array $data): BookingExtras
    {
        $data['total_price'] = $data['cantidad'] * $data['unit_price'];
        return $this->find($id)->update($data);
    }
}
