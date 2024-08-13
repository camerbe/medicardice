<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Consultation extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'cons_titre_fr',
        'cons_titre_en',
        'cons_msg_fr',
        'cons_msg_en',
        'cons_keyword_en',
        'cons_keyword_fr',
        'cons_description_en',
        'cons_description_fr',
        'cons_titre_en_slug',
        'cons_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Consultation::created(function($model){
            Cache::forget('consultation-list');
            Cache::forget('consultation-findBySlug');
        });
        Consultation::deleted(function($model){
            Cache::forget('consultation-list');
            Cache::forget('consultation-findBySlug');
        });
        Consultation::updated(function($model){
            Cache::forget('consultation-list');
            Cache::forget('consultation-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('consultation')
            ->singleFile();

        $this
            ->addMediaCollection('consultation')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('consultation')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
