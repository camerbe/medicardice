<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Angio extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'angio_titre_fr',
        'angio_titre_en',
        'angio_msg_fr',
        'angio_msg_en',
        'angio_keyword_en',
        'angio_keyword_fr',
        'angio_description_en',
        'angio_description_fr',
        'angio_titre_en_slug',
        'angio_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Angio::created(function($model){
            Cache::forget('angio-list');
            Cache::forget('angio-findBySlug');
        });
        Angio::deleted(function($model){
            Cache::forget('angio-list');
            Cache::forget('angio-findBySlug');
        });
        Angio::updated(function($model){
            Cache::forget('angio-list');
            Cache::forget('angio-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('angio')
            ->singleFile();

        $this
            ->addMediaCollection('angio')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('angio')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
