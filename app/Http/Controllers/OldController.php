<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Old\Bill;
use App\Old\Check;

class OldController extends Controller
{
    public function checks() {
        $x = 0;
        if (config('app.env') !== 'production') {
            $checks = factory(Check::class, rand(10, 20))->make();
            foreach ($checks as $check) { $check->id = ++$x; }
        }
        else $checks = Check::all();
        return response($checks, 200);
    }
    public function bills()  {
        $x = 0;
        if (config('app.env') === 'local') {
            $bills = factory(Bill::class, rand(100, 200))->make();
            foreach ($bills as $bill) { $bill->id = ++$x; }
        } else $bills = Bill::all();
        return response($bills, 200);
    }
}
