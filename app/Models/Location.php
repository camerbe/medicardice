<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Location extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'location_titre_fr',
        'location_titre_en',
        'location_msg_fr',
        'location_msg_en',
        'location_keyword_en',
        'location_keyword_fr',
        'location_description_en',
        'location_description_fr',
        'location_titre_en_slug',
        'location_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Location::created(function($model){
            Cache::forget('location-list');
            Cache::forget('location-findBySlug');
        });
        Location::deleted(function($model){
            Cache::forget('location-list');
            Cache::forget('location-findBySlug');
        });
        Location::updated(function($model){
            Cache::forget('location-list');
            Cache::forget('location-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('location')
            ->singleFile();

        $this
            ->addMediaCollection('location')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('location')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
