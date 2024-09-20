<?php

namespace App\Providers;

use App\Models\Electrocardiographie;
use App\Repositories\AngioRepository;
use App\Repositories\AppointmentRepository;
use App\Repositories\BaseRepository;
use App\Repositories\CatheterizationRepository;
use App\Repositories\ChestRepository;
use App\Repositories\ConsultationRepository;
use App\Repositories\CoronaryangioplastyRepository;
use App\Repositories\DoctorRepository;
use App\Repositories\EchocardiographieRepository;
use App\Repositories\ElectrocardiographieRepository;
use App\Repositories\HeartRepository;
use App\Repositories\HolterRepository;
use App\Repositories\HypertensionRepository;
use App\Repositories\LocationRepository;
use App\Repositories\MedecinRepository;
use App\Repositories\MonitoringRepository;
use App\Repositories\PatientRepository;
use App\Repositories\SlotRepository;
use App\Repositories\SpecialiteRepository;
use App\Repositories\StressRepository;
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
        $this->app->bind(BaseRepository::class,ElectrocardiographieRepository::class);
        $this->app->bind(BaseRepository::class,EchocardiographieRepository::class);
        $this->app->bind(BaseRepository::class,StressRepository::class);
        $this->app->bind(BaseRepository::class,HolterRepository::class);
        $this->app->bind(BaseRepository::class,MonitoringRepository::class);
        $this->app->bind(BaseRepository::class,CatheterizationRepository::class);
        $this->app->bind(BaseRepository::class,CoronaryangioplastyRepository::class);
        $this->app->bind(BaseRepository::class,AngioRepository::class);
        $this->app->bind(BaseRepository::class,HypertensionRepository::class);
        $this->app->bind(BaseRepository::class,ChestRepository::class);
        $this->app->bind(BaseRepository::class,HeartRepository::class);
        $this->app->bind(BaseRepository::class,LocationRepository::class);
        $this->app->bind(BaseRepository::class,SlotRepository::class);
        $this->app->bind(BaseRepository::class,AppointmentRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
