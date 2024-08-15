<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CatheterizationController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\CoronaryangioplastyController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\EchocardiographieController;
use App\Http\Controllers\Api\ElectrocardiographieController;
use App\Http\Controllers\Api\HolterController;
use App\Http\Controllers\Api\MedecinController;
use App\Http\Controllers\Api\MonitoringController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\SpecialiteController;
use App\Http\Controllers\Api\StressController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WelcomeController;
use App\Http\Controllers\VerificationApiController;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/
Route::post('users/register', [UserController::class, 'register']);
Route::put('users/changepassword/{changepassword}', [UserController::class, 'changePassword']);
Route::post('auth/login', [AuthController::class, 'login']);
Route::get('welcomes/slug/{welcomes}', [WelcomeController::class, 'getWelcomeBySlug']);
Route::get('welcomes/last', [WelcomeController::class, 'getLastBySlug']);

Route::get('medecins/slug/{medecins}', [MedecinController::class, 'getMedecinBySlug']);
Route::get('medecins/last', [MedecinController::class, 'getLastMedecinBySlug']);

Route::get('consultations/slug/{consultations}', [ConsultationController::class, 'getConsultationBySlug']);
Route::get('consultations/last', [ConsultationController::class, 'getLastConsultationBySlug']);

Route::get('electrocardiographies/slug/{electrocardiographies}', [ElectrocardiographieController::class, 'getElectrocardiographieBySlug']);
Route::get('electrocardiographies/last', [ElectrocardiographieController::class, 'getLastElectrocardiographieBySlug']);

Route::get('echocardiographies/slug/{echocardiographies}', [EchocardiographieController::class, 'getEchocardiographieBySlug']);
Route::get('echocardiographies/last', [EchocardiographieController::class, 'getLastEchocardiographieBySlug']);

Route::get('stress/slug/{stress}', [StressController::class, 'getStressBySlug']);
Route::get('stress/last', [StressController::class, 'getLastStressBySlug']);

Route::get('holters/slug/{holters}', [HolterController::class, 'getHolterBySlug']);
Route::get('holters/last', [HolterController::class, 'getLastHolterBySlug']);

Route::get('monitorings/slug/{monitorings}', [MonitoringController::class, 'getMonitoringBySlug']);
Route::get('monitorings/last', [MonitoringController::class, 'getLastMonitoringBySlug']);

Route::get('catheterizations/slug/{catheterizations}', [CatheterizationController::class, 'getCatheterizationBySlug']);
Route::get('catheterizations/last', [CatheterizationController::class, 'getLastCatheterizationBySlug']);

Route::get('coronaryangioplasties/slug/{coronaryangioplasties}', [CoronaryangioplastyController::class, 'getCoronaryangioplastyBySlug']);
Route::get('coronaryangioplasties/last', [CoronaryangioplastyController::class, 'getLastCoronaryangioplastyBySlug']);
//Route::post('users/login', [UserController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('auth/profile', [AuthController::class, 'profile']);
    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::apiResources([
        "users"=> UserController::class,
        "patients"=> PatientController::class,
        "doctors"=> DoctorController::class,
        "specialites"=> SpecialiteController::class,
        "welcomes"=> WelcomeController::class,
        "medecins"=> MedecinController::class,
        "consultations"=> ConsultationController::class,
        "electrocardiographies"=> ElectrocardiographieController::class,
        "echocardiographies"=> EchocardiographieController::class,
        "stress"=> StressController::class,
        "holters"=> HolterController::class,
        "monitorings"=> MonitoringController::class,
        "catheterizations"=> CatheterizationController::class,
        "coronaryangioplasties"=> CoronaryangioplastyController::class,
    ]);

});
/*Route::apiResources([
    "users"=> UserController::class,
    "patients"=> PatientController::class,
]);*/

Route::get('email/verify/{id}', [VerificationApiController::class,'verify'])
    ->name('verify');
Route::get('email/resend', [VerificationApiController::class,'resend'])
    ->name('resend');


