<?php

namespace App\Old;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $connection = 'tld';
    protected $table = 'budget_bills';
}
