<?php

namespace App\Old;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Old\Bill;

class Check extends Model
{
    // Columns: date, amount, created_at, updated_at, deleted_at
    protected $connection = 'tld';
    protected $table = 'budget_paychecks';
    protected $casts = [
        'date' => 'date',
    ];
    protected $appends = [
        'is_old',
        'bills'
    ];
    
    public function getIsOldAttribute() { return true; }
    
    public function getBillsAttribute() {
        $minDate = $this->date;
        $maxDate = optional($this->next_check)->date ?? $this->date->clone()->addDays(30);
        return Bill::where('date', '>=', $minDate)
            ->where('date', '<', $maxDate)
            ->get();
    }
    
    public function getPreviousCheckAttriboute() {
        // check whose date is < this date,
        // AND whose date is > all other dates
        return Check::where('date', '<', $this->date)
            ->orderBy('date', 'desc')
            ->first();
    }
    
    public function getNextCheckAttribute() {
        // check whose date is > this date,
        // AND whose date is < all other dates
        return Check::where('date', '>', $this->date)
            ->orderBy('date', 'asc')
            ->first();
    }
}
