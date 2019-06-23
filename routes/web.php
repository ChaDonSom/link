<?php

Route::get('/', function () {
    return view('budget');
});

Auth::routes();
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
