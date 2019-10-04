<?php

namespace App\Old;

use Illuminate\Database\Eloquent\Model;

class Check extends Model
{
    protected $connection = 'tld';
    protected $table = 'budget_checks';
}
