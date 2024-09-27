<?php

namespace App\Providers;


use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AngularSSRServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
        Route::get('/{any}', 'AngularSSRController@index')->where('any', '.*');
    }
}
