<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $fillable = [
        'label', 'amount', 'date', 'is_legacy'
    ];
    protected $casts = [
        'date' => 'date',
    ];
}
