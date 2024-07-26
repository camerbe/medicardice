<?php

namespace App\Providers;

use App\Repositories\BaseRepository;
use App\Repositories\DoctorRepository;
use App\Repositories\PatientRepository;
use App\Repositories\SpecialiteRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
        $this->app->bind(BaseRepository::class,UserRepository::class);
        $this->app->bind(BaseRepository::class,DoctorRepository::class);
        $this->app->bind(BaseRepository::class,PatientRepository::class);
        $this->app->bind(BaseRepository::class,SpecialiteRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
