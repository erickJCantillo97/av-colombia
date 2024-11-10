<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];
    
    public function Bookings(){
        return $this->hasMany(BookingService::class, 'booking_proveedor', 'proveedor_id', 'booking_service_id');
    }
}
