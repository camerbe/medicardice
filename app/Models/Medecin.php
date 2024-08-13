<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Medecin extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;
    protected $fillable = [
        'photo',
        'doc_titre_fr',
        'doc_titre_en',
        'doc_msg_fr',
        'doc_msg_en',
        'doc_keyword_en',
        'doc_keyword_fr',
        'doc_description_en',
        'doc_description_fr',
        'doc_titre_en_slug',
        'doc_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Medecin::created(function($model){
            Cache::forget('medecin-list');
            Cache::forget('medecin-findBySlug');
        });
        Medecin::deleted(function($model){
            Cache::forget('medecin-list');
            Cache::forget('medecin-findBySlug');
        });
        Medecin::updated(function($model){
            Cache::forget('medecin-list');
            Cache::forget('medecin-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('medecin')
            ->singleFile();

        $this
            ->addMediaCollection('medecin')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('medecin')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
