<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Echocardiographie extends Model  implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'echocardiography_titre_fr',
        'echocardiography_titre_en',
        'echocardiography_msg_fr',
        'echocardiography_msg_en',
        'echocardiography_keyword_en',
        'echocardiography_keyword_fr',
        'echocardiography_description_en',
        'echocardiography_description_fr',
        'echocardiography_titre_en_slug',
        'echocardiography_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Electrocardiographie::created(function($model){
            Cache::forget('electrocardiography-list');
            Cache::forget('electrocardiography-findBySlug');
        });
        Electrocardiographie::deleted(function($model){
            Cache::forget('echocardiographie-list');
            Cache::forget('echocardiographie-findBySlug');
        });
        Electrocardiographie::updated(function($model){
            Cache::forget('echocardiographie-list');
            Cache::forget('echocardiographie-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('echocardiographie')
            ->singleFile();

        $this
            ->addMediaCollection('echocardiographie')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('echocardiographie')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
