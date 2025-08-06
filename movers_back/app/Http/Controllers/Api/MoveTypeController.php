<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MoveType;
use Illuminate\Http\Request;

class MoveTypeController extends Controller
{
    public function moveTypes(): \Illuminate\Http\JsonResponse
    {
        try {
            $move_types = MoveType::query();
            $move_types = $move_types->get();

            $fetch_data['move_types'] = $move_types;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move Type list"),
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
