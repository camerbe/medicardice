<?php

namespace App\Repositories;

use App\Models\Welcome;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

/**
 *
 */
class FrontEndRepository
{
    /**
     * @param $slug
     * @return mixed
     */
    public function getWelcomeBySlug($slug){
        if($welcome=Cache::get('getWelcomeBySlug')) return $welcome;

        $welcome= Welcome::where('welcome_titre_en_slug',$slug)
            ->orWhere('welcome_titre_fr_slug',$slug)
            ->get();
        $welcome->getgetFirstMedia()->getUrl();

        Cache::set('getWelcomeBySlug',$welcome,Carbon::now()->hour(24));
        return $welcome;
    }
}
