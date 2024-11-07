<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'documentable_id',
        'documentable_type',
        'filepath',
        'filename',
        'extension',
        'size',
    ];

    public function imageable()
    {
        return $this->morphTo();
    }

    protected function filepath(): Attribute
    {
        return Attribute::make(
            get: fn($value) => '/laravel/public/' . str_replace('//', '/', $value),
            set: fn($value) => $value,
        );
    }
}
