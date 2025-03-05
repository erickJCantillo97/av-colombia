<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Service extends Model
{

    use Sluggable;
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'title',
        'title_en',
        'slug',
        'days',
        'adults_price',
        'boys_price',
        'description',
        'description_en',
        'custom_price',
        'includes',
        'notIncludes',
        'type',
        'city',
        'portada',
        'code',
        'destinations',
        'duration_type',
        'duration',
        'duration_unit',
        'capacidad_min',
        'capacidad_max',
        'availability_type',
        'price_type',
        'recogidas',
        'puntos'
    ];

    protected $appends = ['adult_tarifa', 'boy_tarifa', 'is_locked'];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }


    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function features(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class);
    }

    public function bookingServices(): HasMany
    {
        return $this->hasMany(BookingService::class);
    }

    public function getAdultTarifaAttribute()
    {
        if (auth()->user() == null) {
            return $this->adults_price;
        } else if (auth()->user()->role == 'admin') {
            return $this->adults_price;
        }

        return CustomProductUser::where('user_id', auth()->user()->id)->where('service_id', $this->id)->first()->adult_tarifa ?? $this->adults_price;
    }
    public function getBoyTarifaAttribute()
    {
        if (auth()->user() == null) {
            return $this->boys_price;
        } else if (auth()->user()->role == 'admin') {
            return $this->boys_price;
        }
        return CustomProductUser::where('user_id', auth()->user()->id)->where('service_id', $this->id)->first()->boys_tarifa ?? $this->boys_price;
    }

    public function locks()
    {
        return $this->morphMany(Lock::class, 'lockable');
    }

    public function scopeUnlocked()
    {
        return $this->whereDoesntHave('locks', function ($query) {
            $query->where('end_date', '>=', now());
        });
    }

    public function getIsLockedAttribute()
    {
        // dd(now());
        return $this->locks()->where('end_date', '>=', now()->format("Y-m-d"))->exists();
    }

    public function getCurrentStateAttribute()
    {
        return $this->states()->latest()->first();
    }

    public function states()
    {
        return $this->morphMany(State::class, 'statable');
    }

    public function proveedors()
    {
        return $this->belongsToMany(Proveedor::class, 'service_proveedor', 'service_id', 'proveedor_id')->withPivot('value', 'concept');
    }

    public function CustomProductUsers()
    {
        return $this->hasMany(CustomProductUser::class);
    }

    protected function portada(): Attribute
    {
        return Attribute::make(
            get: fn($value) => '/laravel/public/' . str_replace('//', '/', $value),
            set: fn($value) => $value,
        );
    }
    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class);
    }

    public function precies(): HasMany
    {
        return $this->hasMany(Precie::class);
    }
}
