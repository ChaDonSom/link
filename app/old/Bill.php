<?php

namespace App\Old;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    // Columns: date, amount, for, created_at, updated_at, deleted_at
    protected $connection = 'tld';
    protected $table = 'budget_bills';
    protected $appends = [ 'label', 'is_old' ];
    protected $casts = [
        'date' => 'date',
    ];
    
    public function getLabelAttribute() { return $this->for; }
    
    public function getIsOldAttribute() { return true; }
}
