<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Stress extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $table = 'stress';

    protected $fillable = [
        'photo',
        'stress_titre_fr',
        'stress_titre_en',
        'stress_msg_fr',
        'stress_msg_en',
        'stress_keyword_en',
        'stress_keyword_fr',
        'stress_description_en',
        'stress_description_fr',
        'stress_titre_en_slug',
        'stress_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Stress::created(function($model){
            Cache::forget('stress-list');
            Cache::forget('stress-findBySlug');
        });
        Stress::deleted(function($model){
            Cache::forget('stress-list');
            Cache::forget('stress-findBySlug');
        });
        Stress::updated(function($model){
            Cache::forget('stress-list');
            Cache::forget('stress-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('stress')
            ->singleFile();

        $this
            ->addMediaCollection('stress')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('stress')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
