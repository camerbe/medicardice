<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Electrocardiographie extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'electrocardiography_titre_fr',
        'electrocardiography_titre_en',
        'electrocardiography_msg_fr',
        'electrocardiography_msg_en',
        'electrocardiography_keyword_en',
        'electrocardiography_keyword_fr',
        'electrocardiography_description_en',
        'electrocardiography_description_fr',
        'electrocardiography_titre_en_slug',
        'electrocardiography_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Electrocardiographie::created(function($model){
            Cache::forget('electrocardiography-list');
            Cache::forget('electrocardiography-findBySlug');
        });
        Electrocardiographie::deleted(function($model){
            Cache::forget('electrocardiography-list');
            Cache::forget('electrocardiography-findBySlug');
        });
        Electrocardiographie::updated(function($model){
            Cache::forget('electrocardiography-list');
            Cache::forget('electrocardiography-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('electrocardiographie')
            ->singleFile();

        $this
            ->addMediaCollection('electrocardiographie')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('electrocardiographie')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
