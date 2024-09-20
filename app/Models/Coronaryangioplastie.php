<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Coronaryangioplastie extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    protected $fillable = [
        'photo',
        'coronaryangioplasty_titre_fr',
        'coronaryangioplasty_titre_en',
        'coronaryangioplasty_msg_fr',
        'coronaryangioplasty_msg_en',
        'coronaryangioplasty_keyword_en',
        'coronaryangioplasty_keyword_fr',
        'coronaryangioplasty_description_en',
        'coronaryangioplasty_description_fr',
        'coronaryangioplasty_titre_en_slug',
        'coronaryangioplasty_titre_fr_slug',

    ];
    protected static function boot(){
        parent::boot();
        Coronaryangioplastie::created(function($model){
            Cache::forget('coronaryangioplasty-list');
            Cache::forget('coronaryangioplasty-findBySlug');
        });
        Coronaryangioplastie::deleted(function($model){
            Cache::forget('coronaryangioplasty-list');
            Cache::forget('coronaryangioplasty-findBySlug');
        });
        Coronaryangioplastie::updated(function($model){
            Cache::forget('coronaryangioplasty-list');
            Cache::forget('coronaryangioplasty-findBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('coronaryangioplasty')
            ->singleFile();

        $this
            ->addMediaCollection('coronaryangioplasty')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('coronaryangioplasty')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }
}
