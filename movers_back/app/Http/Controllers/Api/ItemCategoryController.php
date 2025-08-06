<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ItemCategory;
use Illuminate\Http\Request;

class ItemCategoryController extends Controller
{
    public function itemCategories()
    {
        try {
            $item_categories = ItemCategory::with('items')->get();

            $fetch_data['item_categories'] = $item_categories;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Item category list"),
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
