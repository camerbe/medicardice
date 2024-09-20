<?php

use App\Http\Controllers\AngularController;
use Illuminate\Support\Facades\Route;

/*Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web']], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});
Route::any('/any',[AngularController::class,'index'])
    ->where('any','^(?!api).*$');*/

Route::get('/{any}', function () {
    return view('angular');
})->where('any', '^(?!api).*$');


