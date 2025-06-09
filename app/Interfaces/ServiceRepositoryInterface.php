<?php

namespace App\Interfaces;


interface ServiceRepositoryInterface extends BaseRepositoryInterface
{
    public function getAll($type = 'TOUR');
    public function search(array $data);
    public function getProveedors($id);
    public function setPortada($id, $image);

}
