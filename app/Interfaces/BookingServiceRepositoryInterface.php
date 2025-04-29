<?php

namespace App\Interfaces;

interface BookingServiceRepositoryInterface extends BaseRepositoryInterface
{
    public function getRecentAll();
    public function getAllByDate($date);
}
