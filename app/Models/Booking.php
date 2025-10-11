<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'room_id',
        'check_in_date',
        'check_out_date',
        'guests_adults',
        'guests_children',
        'guest_name',
        'guest_email',
        'guest_phone',
        'guest_document',
        'special_requests',
        'total_price',
        'status',
    ];

    protected $casts = [
        'check_in_date' => 'date',
        'check_out_date' => 'date',
        'guests_adults' => 'integer',
        'guests_children' => 'integer',
        'total_price' => 'decimal:2',
    ];

    // Relación con User
    public function user(): BelongsTo
    {
        $column = isset($this->vendedor_id) ? 'vendedor_id' : 'user_id';
        return $this->belongsTo(User::class, $column);
    }

    // Relación con Room
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    // Relación con Reviews
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    // Scope para reservas confirmadas
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmada');
    }

    // Scope para reservas activas (no canceladas)
    public function scopeActive($query)
    {
        return $query->where('status', '!=', 'cancelada');
    }
}
