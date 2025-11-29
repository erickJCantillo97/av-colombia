<?php

namespace App\Interfaces;

use App\Models\BookingService;

interface BookingServiceRepositoryInterface extends BaseRepositoryInterface
{
    public function getRecentAll();

    public function getAllByDate($date, ?string $type = null);

    public function store(array $data, string $status, $userId): BookingService;

    public function getAllByDateCreated($date, ?string $type = null);
}
