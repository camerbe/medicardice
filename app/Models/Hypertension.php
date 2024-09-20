<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Hypertension extends Model  implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'hypertension_titre_fr',
        'hypertension_titre_en',
        'hypertension_msg_fr',
        'hypertension_msg_en',
        'hypertension_keyword_en',
        'hypertension_keyword_fr',
        'hypertension_description_en',
        'hypertension_description_fr',
        'hypertension_titre_en_slug',
        'hypertension_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Hypertension::created(function($model){
            Cache::forget('hypertension-list');
            Cache::forget('hypertension-findBySlug');
        });
        Hypertension::deleted(function($model){
            Cache::forget('hypertension-list');
            Cache::forget('hypertension-findBySlug');
        });
        Hypertension::updated(function($model){
            Cache::forget('hypertension-list');
            Cache::forget('hypertension-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('hypertension')
            ->singleFile();

        $this
            ->addMediaCollection('hypertension')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('hypertension')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
