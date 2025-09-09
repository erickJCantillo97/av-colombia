<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'accommodation_id',
        'name',
        'description',
        'capacity_adults',
        'capacity_children',
        'price_per_night',
        'is_available',
    ];

    protected $casts = [
        'capacity_adults' => 'integer',
        'capacity_children' => 'integer',
        'price_per_night' => 'decimal:2',
        'is_available' => 'boolean',
    ];

    // Relación con Accommodation
    public function accommodation(): BelongsTo
    {
        return $this->belongsTo(Accommodation::class);
    }

    // Relación con reservas
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    // Relación polimórfica con fotos
    public function photos(): MorphMany
    {
        return $this->morphMany(Photo::class, 'imageable');
    }

    // Scope para habitaciones disponibles
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    // Scope para filtrar por capacidad
    public function scopeWithCapacity($query, $adults, $children = 0)
    {
        return $query->where('capacity_adults', '>=', $adults)
            ->where('capacity_children', '>=', $children);
    }

    // Scope para filtrar por rango de precio
    public function scopeInPriceRange($query, $minPrice = null, $maxPrice = null)
    {
        if ($minPrice) {
            $query->where('price_per_night', '>=', $minPrice);
        }
        if ($maxPrice) {
            $query->where('price_per_night', '<=', $maxPrice);
        }

        return $query;
    }

    // Verificar disponibilidad en fechas específicas
    public function isAvailableBetween($checkIn, $checkOut)
    {
        if (! $this->is_available) {
            return false;
        }

        // Verificar si existe alguna reserva confirmada que se solape con las fechas
        $conflictingBookings = $this->bookings()
            ->where('status', '!=', 'cancelada')
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('check_in_date', [$checkIn, $checkOut])
                    ->orWhereBetween('check_out_date', [$checkIn, $checkOut])
                    ->orWhere(function ($subQuery) use ($checkIn, $checkOut) {
                        $subQuery->where('check_in_date', '<=', $checkIn)
                            ->where('check_out_date', '>=', $checkOut);
                    });
            })
            ->exists();

        return ! $conflictingBookings;
    }
}
