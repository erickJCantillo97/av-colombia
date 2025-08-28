<?php
namespace App\Repositories;

use App\Interfaces\TicketInterface;
use App\Models\Ticket;

class TicketRepository extends BaseRepository implements TicketInterface
{
    public function model(){
        return Ticket::class;
    }

}
