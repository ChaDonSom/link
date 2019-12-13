<?php

Auth::routes();


Route::get('/', 'HomeController@index')->name('home');

Route::get('/nodes/{slug}', 'NodeController@showBySlug');

Route::get('/refresh_token', function () {
  return response()->json([ "token" => csrf_token() ], 200);
});
