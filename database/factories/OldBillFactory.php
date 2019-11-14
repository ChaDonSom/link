<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Old\Bill;
use Faker\Generator as Faker;

$factory->define(Bill::class, function (Faker $faker) {
    return [
        'date'   => $faker->date,
        'amount' => $faker->randomFloat(2, 1),
        'for'    => function ($post) use ($faker) {
            return $faker->randomElement([
                $faker->word,
                $faker->words($faker->numberBetween(1,3), true),
                $faker->name,
                $faker->company,
                $faker->realText(15)
            ]);
        }
    ];
});
