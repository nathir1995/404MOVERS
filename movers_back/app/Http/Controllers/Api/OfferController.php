<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Exception;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function offers()
    {
        try {
            $offers = Offer::where('status', 2)->get();
            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Data Fetch Successfully"),
                "data" => $offers
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                'data'      =>  (object)array()
            ], 500);
        }
    }
}
