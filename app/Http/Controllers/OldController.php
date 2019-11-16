<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Old\Bill;
use App\Old\Check;

class OldController extends Controller
{
    public function checks() {
        $checks = Check::all();
        return response($checks, 200);
    }
    public function bills()  {
        $bills = Bill::all();
        return response($bills, 200);
    }
}
