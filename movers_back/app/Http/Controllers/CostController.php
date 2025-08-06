<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CostController extends Controller
{
    //
    public function cost_list(){
        return view('admin.cost.cost-list');
    }
}
