<?php

namespace App\Providers;

use App\Repositories\BaseRepository;
use App\Repositories\ConsultationRepository;
use App\Repositories\DoctorRepository;
use App\Repositories\MedecinRepository;
use App\Repositories\PatientRepository;
use App\Repositories\SpecialiteRepository;
use App\Repositories\UserRepository;
use App\Repositories\WelcomeRepository;
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
        $this->app->bind(BaseRepository::class,MedecinRepository::class);
        $this->app->bind(BaseRepository::class,WelcomeRepository::class);
        $this->app->bind(BaseRepository::class,ConsultationRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
