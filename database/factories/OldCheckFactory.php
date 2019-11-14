<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Old\Check;
use Faker\Generator as Faker;

$factory->define(Check::class, function (Faker $faker) {
    return [
        'date' => $faker->date,
        'amount' => $faker->randomFloat(2,1000)
    ];
});
