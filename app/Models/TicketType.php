<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketType extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = ['name'];

    protected $appends = ['disponibles'];

    public function services()
    {
        return $this->belongsToMany(Service::class, 'services_ticket_types');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function getDisponiblesAttribute()
    {
        return $this->tickets->where('tipo_movimiento', 'entrada')->sum('cantidad') - $this->tickets->where('tipo_movimiento', 'salida')->sum('cantidad');
    }
}
