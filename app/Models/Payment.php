<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];

    public function payable()
    {
        return $this->belongsTo(BookingService::class, 'payable_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function metohdPayment()
    {
        return $this->belongsTo(PaymentMethod::class, 'method');
    }
    
}
