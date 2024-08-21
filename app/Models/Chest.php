<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Chest extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'chest_titre_fr',
        'chest_titre_en',
        'chest_msg_fr',
        'chest_msg_en',
        'chest_keyword_en',
        'chest_keyword_fr',
        'chest_description_en',
        'chest_description_fr',
        'chest_titre_en_slug',
        'chest_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Chest::created(function($model){
            Cache::forget('chest-list');
            Cache::forget('chest-findBySlug');
        });
        Chest::deleted(function($model){
            Cache::forget('chest-list');
            Cache::forget('chest-findBySlug');
        });
        Chest::updated(function($model){
            Cache::forget('chest-list');
            Cache::forget('chest-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('chest')
            ->singleFile();

        $this
            ->addMediaCollection('chest')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('chest')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
