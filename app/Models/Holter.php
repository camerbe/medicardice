<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Holter extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'holter_titre_fr',
        'holter_titre_en',
        'holter_msg_fr',
        'holter_msg_en',
        'holter_keyword_en',
        'holter_keyword_fr',
        'holter_description_en',
        'holter_description_fr',
        'holter_titre_en_slug',
        'holter_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Holter::created(function($model){
            Cache::forget('holter-list');
            Cache::forget('holter-findBySlug');
        });
        Holter::deleted(function($model){
            Cache::forget('holter-list');
            Cache::forget('holter-findBySlug');
        });
        Holter::updated(function($model){
            Cache::forget('holter-list');
            Cache::forget('holter-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('holter')
            ->singleFile();

        $this
            ->addMediaCollection('holter')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('holter')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
