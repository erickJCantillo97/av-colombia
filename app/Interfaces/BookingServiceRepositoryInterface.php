<?php

namespace App\Interfaces;

interface BookingServiceRepositoryInterface extends BaseRepositoryInterface
{
    public function getRecentAll();
}
