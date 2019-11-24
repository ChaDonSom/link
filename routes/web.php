<?php

Auth::routes();


Route::get('/', 'HomeController@index')->name('home');


Route::resource('/bills', 'BillController');
Route::resource('/checks', 'CheckController');

Route::get('/refresh_token', function () {
  return response()->json([ "token" => csrf_token() ], 200);
});