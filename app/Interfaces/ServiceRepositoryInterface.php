<?php

namespace App\Interfaces;


interface ServiceRepositoryInterface extends BaseRepositoryInterface
{
    public function getAll();
    public function getAllByType($type);
    public function search(array $data);
    public function getProveedors($id);
    public function setPortada($id, $image);

}
