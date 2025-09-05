<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'booking_service_id',
        'ticket_type_id',
        'cantidad',
        'costo_total',
        'tipo_movimiento'
    ];

    public function bookingService()
    {
        return $this->belongsTo(BookingService::class);
    }

    public function ticketType()
    {
        return $this->belongsTo(TicketType::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'services_tickets');
    }
}
