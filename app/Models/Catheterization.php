<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Catheterization extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'catheterization_titre_fr',
        'catheterization_titre_en',
        'catheterization_msg_fr',
        'catheterization_msg_en',
        'catheterization_keyword_en',
        'catheterization_keyword_fr',
        'catheterization_description_en',
        'catheterization_description_fr',
        'catheterization_titre_en_slug',
        'catheterization_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Catheterization::created(function($model){
            Cache::forget('catheterization-list');
            Cache::forget('catheterization-findBySlug');
        });
        Catheterization::deleted(function($model){
            Cache::forget('catheterization-list');
            Cache::forget('catheterization-findBySlug');
        });
        Catheterization::updated(function($model){
            Cache::forget('catheterization-list');
            Cache::forget('catheterization-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('catheterization')
            ->singleFile();

        $this
            ->addMediaCollection('catheterization')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('catheterization')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
