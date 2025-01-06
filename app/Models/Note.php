<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];


    public function bookingService()
    {
        return $this->belongsTo(BookingService::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
