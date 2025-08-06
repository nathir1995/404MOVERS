<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Userprofile, Settings, Car, User, Checklocation, Childlocation, Locations, Move, Rides};
use URL, Http, Exception, Str;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class GetLocationsController extends Controller
{
    public function get_locations(Request $request)
    {
        try {
            $price = Settings::where(['option_name' => 'per_km', 'option_type' => 'per_km'])->first();
            if (!empty($request->data)) {
                $start_distance = get_distance_start($request->start_lat, $request->start_lang, $request->end_lat, $request->end_lang);
                $route[] = [
                    "point_name" => $request->start_point_name,
                    "lat"        => $request->start_lat,
                    "lang"       => $request->start_lang,
                    "distance"   => 0
                ];

                foreach ($request->data as $key => $value) {
                    $data = get_distance_start($request->start_lat, $request->start_lang, $value['lat'], $value['lang']);

                    $route[] = [
                        "point_name" => $value['point_name'],
                        "lat"        => $value['lat'],
                        "lang"       => $value['lang'],
                        "distance"   => $data,
                    ];
                }
                $route[] = [
                    "point_name" => $request->end_point_name,
                    "lat"        => $request->end_lat,
                    "lang"       => $request->end_lang,
                    "distance"   => $start_distance
                ];

                usort($route, function ($item1, $item2) {
                    return $item1['distance'] <=> $item2['distance'];
                });

                $routeGroup = [];
                foreach ($route as $key => $value) {
                    if ($key == 0) {
                        $distance = get_distance_start($value['lat'], $value['lang'], $route[$key + 1]['lat'], $route[$key + 1]['lang']);
                        $routeGroup[] = [
                            "start" => [
                                "point_name" => $value['point_name'],
                                "lat"        => $value['lat'],
                                "lang"       => $value['lang']
                            ],
                            "end" => [
                                "point_name" => $route[$key + 1]['point_name'],
                                "lat"        => $route[$key + 1]['lat'],
                                "lang"       => $route[$key + 1]['lang']
                            ],
                            'price' => $distance * $price->option_value,
                            'distance' => $distance
                        ];
                    } else {
                        $count = $key + 1;
                        if (isset($route[$count])) {
                            $distance = get_distance_start($value['lat'], $value['lang'], $route[$key + 1]['lat'], $route[$key + 1]['lang']);
                            $routeGroup[] = [
                                "start" => [
                                    "point_name" => $value['point_name'],
                                    "lat"        => $value['lat'],
                                    "lang"       => $value['lang']
                                ],
                                "end" => [
                                    "point_name" => $route[$key + 1]['point_name'],
                                    "lat"        => $route[$key + 1]['lat'],
                                    "lang"       => $route[$key + 1]['lang']
                                ],
                                'price' => $distance * $price->option_value,
                                'distance' => $distance
                            ];
                        }
                    }
                }
            }

            $data = $request->all();
            $validator = Validator::make($data, [
                'start_lat'   => 'required',
                'start_lang'   => 'required',
                'end_lat'   => 'required',
                'end_lang'   => 'required',
            ]);
            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            } else {
                $distance = get_distance_start($request->end_lat, $request->end_lang, $request->start_lat, $request->start_lang);
                $start_to_end =  $distance;
                Session::put('total_distance', $start_to_end);
                $status = 0;
                $user = auth()->user();
                $start_loc = Checklocation::where('user_id', $user->id)->first();
                Checklocation::where('user_id', $user->id)->delete();
                if (empty($start_loca)) {

                    if (!empty($request->data)) {
                        $total_price = 0;
                        foreach ($routeGroup as $data) {
                            $total_price += $data['price'];
                        }
                    } else {
                        $total_price = round((0.075 * $distance) + 0.5) * 1000;
                        // $total_price = $distance * $price->option_value;
                    }
                    $insert = new Checklocation();
                    $insert->user_id           = $user->id;
                    $insert->start_point_name  = $request->start_point_name;
                    $insert->start_lat         = $request->start_lat;
                    $insert->start_lang        = $request->start_lang;
                    $insert->end_point_name    = $request->end_point_name;
                    $insert->end_lat           = $request->end_lat;
                    $insert->end_lang          = $request->end_lang;
                    $insert->price             = $total_price;
                    $insert->save();
                    $id = $insert->id;
                    if (!empty($id) && empty($request->data)) {
                        return response()->json([
                            "code"      =>  200,
                            "response"  =>  "success",
                            "message"   =>  __("Location is in range"),
                            "data"      =>  (object)array()
                        ], 200);
                    }
                    $child_loc = Childlocation::where('checklocation_id', $id)->first();

                    if (empty($child_loc) && !empty($request->data)) {
                        foreach ($routeGroup as $values) {

                            $distance_response = get_distance_start($request->start_lat, $request->start_lang, $values['end']['lat'], $values['end']['lang']);
                            $insert_child                    = new Childlocation();
                            $insert_child->checklocation_id  = $id;
                            $insert_child->start_point_name  = $values['start']['point_name'];
                            $insert_child->start_lat         = $values['start']['lat'];
                            $insert_child->start_lang        = $values['start']['lang'];
                            $insert_child->end_point_name    = $values['end']['point_name'];
                            $insert_child->end_lat           = $values['end']['lat'];
                            $insert_child->end_lang          = $values['end']['lang'];
                            $insert_child->price             = $values['price'];
                            $insert_child->distance          = $distance_response;
                            $insert_child->save();
                        }

                        foreach ($request->data as $key => $value) {
                            $response = get_distance_start($value['lat'], $value['lang'], $request->start_lat, $request->start_lang);
                            $total_distance = Session::get('total_distance');
                            $remaing_distance = $total_distance - $response;

                            if ($total_distance >= $remaing_distance && $remaing_distance > 0) {
                                $status = 1;
                            } else {
                                return response()->json([
                                    "code"      =>  401,
                                    "response"  =>  "error",
                                    "message"   =>  __("Location is out of range"),
                                    "data"      =>  (object)array()
                                ], 401);
                            }
                        }
                        if ($status) {
                            return response()->json([
                                "code"      =>  200,
                                "response"  =>  "success",
                                "message"   =>  __("Location is in range"),
                                "data"      =>  (object)array()
                            ], 200);
                        }
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function get_stops_prices()
    {
        try {
            $location_data = Checklocation::where('user_id', auth()->user()->id)->with('OtherStops')->first();
            $location_data['price'] = number_format($location_data['price']);
            return response()->json([
                "code"      =>  200,
                "response"  =>  "success",
                "message"   =>  "Data fetch successfully",
                "data"      =>   $location_data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make($data, [
                'move_id' => 'required',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric'
            ]);
            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $move_id = $data['move_id'];
            $latitude = $data['latitude'];
            $longitude = $data['longitude'];

            $location = Locations::create([
                'move_id' => $move_id,
                'latitude' => $latitude,
                'longitude' => $longitude,
            ]);

            $move = Move::query()
                ->where('id', $move_id)
                ->first();

            $fetch_data['move'] = $move;
            $fetch_data['user'] = $move->user;
            $fetch_data['movers'] = $move->movers;
            $fetch_data['location'] = $location;

            return response()->json([
                "code"      =>  201,
                "response"  =>  "success",
                "message"   =>  __("Location received successfully"),
                "data"      =>  $fetch_data,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }
}
