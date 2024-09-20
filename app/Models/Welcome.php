<?php

namespace App\Models;

use App\Repositories\WelcomeRepository;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 *
 */
class Welcome extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia;

    /**
     * @var string[]
     */
    protected $fillable = [
        'photo',
        'welcome_titre_fr',
        'welcome_titre_en',
        'welcome_msg_fr',
        'welcome_msg_en',
        'welcome_keyword_en',
        'welcome_keyword_fr',
        'welcome_description_en',
        'welcome_description_fr',
        'welcome_titre_en_slug',
        'welcome_titre_fr_slug',
    ];


    /**
     * @return void
     */
    protected static function boot(){
        parent::boot();
        Welcome::created(function($model){
            Cache::forget('welcome-list');
            Cache::forget('getWelcomeBySlug');
        });
        Welcome::deleted(function($model){
            Cache::forget('welcome-list');
            Cache::forget('getWelcomeBySlug');
        });
        Welcome::updated(function($model){
            Cache::forget('welcome-list');
            Cache::forget('getWelcomeBySlug');
        });
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('welcome')
            ->singleFile();

        $this
            ->addMediaCollection('welcome')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this
            ->addMediaCollection('welcome')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::all()->last();
    }

}
