<?php

use App\Http\Controllers\Api\AngioController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CatheterizationController;
use App\Http\Controllers\Api\ChestController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\CoronaryangioplastyController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\EchocardiographieController;
use App\Http\Controllers\Api\ElectrocardiographieController;
use App\Http\Controllers\Api\HeartController;
use App\Http\Controllers\Api\HolterController;
use App\Http\Controllers\Api\HypertensionController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\MedecinController;
use App\Http\Controllers\Api\MedicalRecordController;
use App\Http\Controllers\Api\MonitoringController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\SlotController;
use App\Http\Controllers\Api\SpecialiteController;
use App\Http\Controllers\Api\StressController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WelcomeController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\VerificationApiController;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/
Route::post('users/register', [UserController::class, 'register']);
Route::post('patients/register', [PatientController::class, 'register']);

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
//
Route::get('angios/slug/{angios}', [AngioController::class, 'getAngioBySlug']);
Route::get('angios/last', [AngioController::class, 'getLastAngioBySlug']);

Route::get('hypertensions/slug/{hypertensions}', [HypertensionController::class, 'getHypertensionBySlug']);
Route::get('hypertensions/last', [HypertensionController::class, 'getLastHypertensionBySlug']);

Route::get('chests/slug/{chests}', [ChestController::class, 'getChestBySlug']);
Route::get('chests/last', [ChestController::class, 'getLastChestBySlug']);

Route::get('hearts/slug/{hearts}', [HeartController::class, 'getHeartBySlug']);
Route::get('hearts/last', [HeartController::class, 'getLastHeartBySlug']);

Route::get('locations/slug/{locations}', [LocationController::class, 'getLocationBySlug']);
Route::get('locations/last', [LocationController::class, 'getLastLocationBySlug']);

Route::post('password/forgot', [PasswordController::class, 'forgot']);
Route::post('password/reset', [PasswordController::class, 'reset']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('auth/profile', [AuthController::class, 'profile']);
    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::get('patients/appointment/{patients}', [PatientController::class, 'findAppointementByPatient']);
    Route::get('patients/login/{patients}', [PatientController::class, 'getPatientId']);

    Route::get('doctors/appointment/{doctors}', [DoctorController::class, 'findAppointementByDoctor']);
    Route::get('doctors/login/{doctors}', [DoctorController::class, 'getDoctorId']);

    Route::get('appointments/slot', [AppointmentController::class, 'getSlots']);
    Route::get('appointments/doctor', [AppointmentController::class, 'getDoctors']);

    Route::get('medicalrecords/patient/{patient}', [MedicalRecordController::class, 'getMedicalRecordsByPatient']);

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
        "angios"=> AngioController::class,
        "hypertensions"=> HypertensionController::class,
        "chests"=> ChestController::class,
        "hearts"=> HeartController::class,
        "locations"=> LocationController::class,
        "slots"=> SlotController::class,
        "appointments"=> AppointmentController::class,
        "medicalrecords"=> MedicalRecordController::class,

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


