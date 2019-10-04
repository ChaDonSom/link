<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function () {
  Route::get('/old/checks', 'OldController@checks');
  Route::get('/old/bills', 'OldController@bills');
});