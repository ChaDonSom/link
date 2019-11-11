<?php

namespace App\Old;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Check extends Model
{
    // Columns: date, amount, created_at, updated_at, deleted_at
    protected $connection = 'tld';
    protected $table = 'budget_checks';
    protected $casts = [
        'date' => 'date',
    ];
    protected $appends = [
        'is_old'
    ];
    
    public function getIsOldAttribute() { return true; }
}
