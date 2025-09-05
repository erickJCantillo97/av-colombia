<?php
namespace App\Repositories;

use App\Interfaces\TicketTypeInterface;
use App\Models\TicketType;

class TicketTypeRepository extends BaseRepository implements TicketTypeInterface
{
    public function model(){
        return TicketType::class;
    }

}
