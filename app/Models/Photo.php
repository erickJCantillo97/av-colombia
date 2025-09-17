<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'imageable_id',
        'imageable_type',
    ];

    // Relación polimórfica
    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }

    // Accessor para obtener la URL completa de la imagen
    public function getUrlAttribute()
    {
        return asset('storage/'.$this->path);
    }

     protected function path(): Attribute
    {
        return Attribute::make(
            get: fn($value) => '/laravel/public/' . str_replace('//', '/', $value),
            set: fn($value) => $value,
        );
    }
}
