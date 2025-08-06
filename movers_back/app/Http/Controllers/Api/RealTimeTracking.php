<?php

namespace App\Http\Controllers\Api;

use App\Events\SendLocation;
use App\Http\Controllers\Controller;
use App\Models\Move;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RealTimeTracking extends Controller
{
    function sendLocation(Request $request)
    {
        $this->validate($request, [
            'lat' => 'required',
            'long' => 'required',
            'move_id' => 'required',
        ]);

        $lat = $request->input('lat');
        $long = $request->input('long');
        $move_id = $request->move_id;
        $location = [
            "move_id" => $move_id,
            "lat" => $lat,
            "long" => $long
        ];
        event(new SendLocation($location));
        return response()->json([
            "code" => Response::HTTP_OK,
            "response" => "success",
            "message" => __("Realtime Location"),
            "data" => $location,
        ], Response::HTTP_OK);
    }

    public function location(Request $request)
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

            $auth_user = Auth::user();

            $move_id = $data['move_id'];
            $meta['latitude'] = $data['latitude'];
            $meta['longitude'] = $data['longitude'];
            $meta['type_id'] = $move_id;
            $meta['type'] = 'location';
            $meta['user_info'] = $auth_user;
            $meta['user_role'] = $auth_user->userRole->key;
            $move = Move::query()
                ->where('id', $move_id)
                ->first();
            $user = $move->user;
            $movers = $move->movers;
            $title = 'Move Live Location';
            $description = 'Live location started for move ' . $move_id;

            $fetch_data['user'] = send_notification($user->id, $title, $description, $meta);
            $fetch_data['admin'] = send_notification(1, $title, $description, $meta);

            foreach ($movers as $mover) {
                $fetch_data['mover' . $mover->id] = send_notification($mover->id, $title, $description, $meta);
            }

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
