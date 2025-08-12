<?php

namespace App\Interfaces;

use App\Models\BookingService;

interface BookingServiceRepositoryInterface extends BaseRepositoryInterface
{
    public function getRecentAll();
    public function getAllByDate($date);
    public function store(array $data, string $status, $userId): BookingService;
}
