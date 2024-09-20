<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Monitoring extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'monitoring_titre_fr',
        'monitoring_titre_en',
        'monitoring_msg_fr',
        'monitoring_msg_en',
        'monitoring_keyword_en',
        'monitoring_keyword_fr',
        'monitoring_description_en',
        'monitoring_description_fr',
        'monitoring_titre_en_slug',
        'monitoring_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Monitoring::created(function($model){
            Cache::forget('monitoring-list');
            Cache::forget('monitoring-findBySlug');
        });
        Monitoring::deleted(function($model){
            Cache::forget('monitoring-list');
            Cache::forget('monitoring-findBySlug');
        });
        Monitoring::updated(function($model){
            Cache::forget('monitoring-list');
            Cache::forget('monitoring-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('monitoring')
            ->singleFile();

        $this
            ->addMediaCollection('monitoring')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('monitoring')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
