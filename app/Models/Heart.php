<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Heart extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'heart_titre_fr',
        'heart_titre_en',
        'heart_msg_fr',
        'heart_msg_en',
        'heart_keyword_en',
        'heart_keyword_fr',
        'heart_description_en',
        'heart_description_fr',
        'heart_titre_en_slug',
        'heart_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Heart::created(function($model){
            Cache::forget('heart-list');
            Cache::forget('heart-findBySlug');
        });
        Heart::deleted(function($model){
            Cache::forget('heart-list');
            Cache::forget('heart-findBySlug');
        });
        Heart::updated(function($model){
            Cache::forget('heart-list');
            Cache::forget('heart-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('heart')
            ->singleFile();

        $this
            ->addMediaCollection('heart')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('heart')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
