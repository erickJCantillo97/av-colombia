<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Precie extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];


    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
