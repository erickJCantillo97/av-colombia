<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Included extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];


    public function name(){
        return Attribute::make(
            get: fn($value) => strtolower(trim($value)),
            set: fn($value) => $value,
        );
    }
    
}
