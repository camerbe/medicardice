<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\MedecinController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\SpecialiteController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WelcomeController;
use App\Http\Controllers\ElectrocardiographieController;
use App\Http\Controllers\VerificationApiController;
use Illuminate\Http\Request;
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

Route::get('electrocardiographies/slug/{electrocardiographies}', [ElectrocardiographieController::class, 'getConsultationBySlug']);
Route::get('electrocardiographies/last', [ElectrocardiographieController::class, 'getLastConsultationBySlug']);
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


