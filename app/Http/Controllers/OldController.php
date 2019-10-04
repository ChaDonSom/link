<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Old\Bill;
use App\Old\Check;

class OldController extends Controller
{
    public function checks() { return Check::all(); }
    public function bills()  { return  Bill::all(); }
}
