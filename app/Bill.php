<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $fillable = [
        'label', 'amount', 'date', 'is_legacy', 'owner_ref'
    ];
    protected $casts = [
        'date' => 'date',
    ];
    
    public function owner() { return $this->belongsTo('App\User', 'owner_ref'); }
}
