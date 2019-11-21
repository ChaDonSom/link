<?php

Auth::routes();


Route::get('/', 'HomeController@index')->name('home');


Route::resource('/bills', 'BillController');
Route::resource('/checks', 'CheckController');
