<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Builder;
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

    protected static function booted(): void
    {
        static::addGlobalScope('ancient', function (Builder $builder) {
            if (auth()->user() != null && auth()->user()->rol ==  'hotel') {
                $builder->where('user_id', auth()->user()->id);
            }
        });
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

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

    public function payments()
    {
        return $this->hasMany(Payment::class, 'payable_id');
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
        return $this->hasMany(BookingProveedor::class, 'booking_service_id');
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function extras()
    {
        return $this->hasMany(BookingExtras::class, 'booking_service_id');
    }
}
