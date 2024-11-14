<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingService extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];

    protected $appends = ['total_price', 'total_price_sales'];

    protected $casts = [
        'problematic' => 'boolean',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getTotalPriceAttribute()
    {
        return $this->adults * $this->adults_price + $this->boys * $this->boys_price;
    }

    public function getTotalPriceSalesAttribute()
    {
        return $this->adults * $this->adult_tarifa + $this->boys * $this->boy_tarifa;
    }

    public function payment()
    {
        return $this->morphMany(Payment::class, 'payable');
    }

    public function states()
    {
        return $this->morphMany(State::class, 'statable');
    }

    public function status(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->states()->latest()->first()->state ?? 'reservado',
            set: fn($value) => $value,
        );
    }

    public function proveedors()
    {
        return $this->hasMany(Proveedor::class, 'booking_proveedor', 'booking_service_id', 'proveedor_id');
    }
}
