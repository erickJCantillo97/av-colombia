<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingProveedor extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];

    protected $appends = [
        'cost_total',
    ];
    public function bookingService()
    {
        return $this->belongsTo(BookingService::class);
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }

    public function getCostTotalAttribute($value)
    {
        if($this->discount == 0){
            return $this->cost;
        }
        $pax = $this->bookingService->adults;
        return  $this->cost - ($this->discount * $pax);
    }
}
