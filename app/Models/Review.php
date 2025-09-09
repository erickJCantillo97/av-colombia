<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'accommodation_id',
        'booking_id',
        'rating',
        'comment',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    // Relación con User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relación con Accommodation
    public function accommodation(): BelongsTo
    {
        return $this->belongsTo(Accommodation::class);
    }

    // Relación con Booking
    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    // Scope para filtrar por rating
    public function scopeWithMinRating($query, $rating)
    {
        return $query->where('rating', '>=', $rating);
    }

    // Scope para ordenar por más recientes
    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
