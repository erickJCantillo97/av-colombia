<?php

namespace App\Interfaces;


interface ServiceRepositoryInterface extends BaseRepositoryInterface
{
    public function search(array $data);
    public function getProveedors($id);

}
