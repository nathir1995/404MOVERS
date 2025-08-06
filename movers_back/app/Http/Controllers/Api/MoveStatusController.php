<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MoveStatus;
use Illuminate\Http\Request;

class MoveStatusController extends Controller
{
    public function moveStatuses()
    {
        try {
            $move_statuses = MoveStatus::get();

            $fetch_data['move_statuses'] = $move_statuses;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move status list"),
                "data" => $fetch_data,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $th->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }
}
