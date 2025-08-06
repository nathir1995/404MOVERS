<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class FCMController extends Controller
{
    public function index(Request $req)
    {
        $input = $req->all();
        $fcm_token = $input['fcm_token'];
        $user_id = $input['user_id'];

        $user = User::findOrFail($user_id);

        $user->fcm_token = $fcm_token;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User token updated successfully.'
        ]);
    }

    public function sendNotification(Request $req)
    {
        $user_id = $req->user_id;
        $title = $req->title;
        $description = $req->description;
        $meta = $req->meta;

        $data = send_notification($user_id, $title, $description, $meta);

        return response()->json([
            "code" => 200,
            "response" => "success",
            "message" => __("User Retrieved Successfully"),
            "data" => $data,
        ], 200);
    }
}
