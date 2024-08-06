<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Service extends Model
{

    use Sluggable;
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'title',
        'title_en',
        'slug',
        'description',
        'description_en',
        'price',
        'custom_price',
    ];

    public function getRouteKeyName(): string {
        return 'slug';
    }

    public function sluggable(): array {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }
    
  
    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

}
