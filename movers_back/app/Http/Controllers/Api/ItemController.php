<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function items()
    {
        try {
            $items = Item::with('itemCategory')->get();

            $fetch_data['items'] = $items;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Item list"),
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
