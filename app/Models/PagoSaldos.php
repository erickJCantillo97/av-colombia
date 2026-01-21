<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PagoSaldos extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    /**
     * Relación con BookingService
     */
    public function bookingService(): BelongsTo
    {
        return $this->belongsTo(BookingService::class, 'booking_service_id');
    }

    /**
     * Relación con BookingProveedor (tabla pivote)
     */
    public function proveedor(): BelongsTo
    {
        return $this->belongsTo(BookingProveedor::class, 'proveedor_id');
    }
}
