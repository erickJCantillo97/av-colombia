<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Accommodation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'type',
        'address_line_1',
        'city',
        'state',
        'country',
        'postal_code',
        'latitude',
        'longitude',
        'star_rating',
        'contact_email',
        'contact_phone',
        'status',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'star_rating' => 'integer',
    ];

    // Relación con User (propietario del alojamiento)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relación con habitaciones
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    // Relación con reseñas
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    // Relación muchos a muchos con amenities
    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class, 'amenity_accommodation');
    }

    // Relación polimórfica con fotos
    public function photos(): MorphMany
    {
        return $this->morphMany(Photo::class, 'imageable');
    }

    // Scope para filtrar por estado publicado
    public function scopePublished($query)
    {
        return $query->where('status', 'publicado');
    }

    // Scope para filtrar por tipo
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Scope para filtrar por ubicación
    public function scopeInLocation($query, $city = null, $country = null)
    {
        if ($city) {
            $query->where('city', 'like', "%{$city}%");
        }
        if ($country) {
            $query->where('country', 'like', "%{$country}%");
        }

        return $query;
    }

    // Scope para filtrar por rating
    public function scopeWithMinRating($query, $rating)
    {
        return $query->where('star_rating', '>=', $rating);
    }

    // Calcular rating promedio basado en reseñas
    public function getAverageRatingAttribute()
    {
        return $this->reviews()->avg('rating') ?: 0;
    }

    // Obtener precio mínimo de habitación
    public function getMinPriceAttribute()
    {
        return $this->rooms()->where('is_available', true)->min('price_per_night') ?: 0;
    }
}
