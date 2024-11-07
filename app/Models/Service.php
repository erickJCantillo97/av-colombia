<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
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
        'notIncludes'
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
}
