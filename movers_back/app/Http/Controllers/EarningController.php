<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EarningController extends Controller
{
    //

    public function earninglist(){
        return view('admin.earning.earning-list');
    }
}
