<?php

namespace App\Interfaces;


interface PaymentRepositoryInterface extends BaseRepositoryInterface
{

    public function createPayment(array $data, $userId);

}
