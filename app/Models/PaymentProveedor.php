<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentProveedor extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function comprobante(): Attribute
    {
        return Attribute::make(
            get: fn($value) => '/laravel/public/' . str_replace('//', '/', $value),
            set: fn($value) => $value,
        );
    }
}
