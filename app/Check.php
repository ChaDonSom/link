<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Check extends Model
{
    protected $fillable = [
        'date', 'amount', 'is_legacy'
    ];
    protected $casts = [
        'date' => 'date',
    ];
    protected $appends = [
        'bills',
        'leftover',
        'end_date',
    ];
    
    public function getLeftoverAttribute() {
        $total = $this->amount;
        $bills = $this->bills;
        foreach ($this->bills as $bill) {
            $total -= $bill->amount;
        }
        return $total;
    }
    
    public function getBillsAttribute() {
        $minDate = $this->date;
        $maxDate = optional($this->next_check)->date ?? $this->date->clone()->addDays(14);
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
    
    public function getEndDateAttribute() {
        return optional($this->next_check)->date ?? $this->date->clone()->addDays(14);
    }
}
