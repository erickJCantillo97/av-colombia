<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingService extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];

    protected $appends = ['total_price', 'total_price_sales'];

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
}
