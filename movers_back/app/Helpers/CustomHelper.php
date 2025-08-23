<?php

use App\Models\Settings;
use App\Models\User;
use App\Models\Notifications;
use App\Helpers\CustomHelper;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Config;

function notfound_error()
{
    return response()->json([
        "message" => __('Not Found'),
        "code" => Response::HTTP_NOT_FOUND,
        "data" => null,
        "response" => 'error'
    ], Response::HTTP_NOT_FOUND);
}

function validation_error($message)
{
    $d = (object)(array());
    return response()->json([
        "message" => $message[0],
        "code" => 422,
        "data" => $d,
        "response" => 'error'
    ], 400);
}

// function custom_error($code, $msg, $dumy_data = false)
// {
//     if ($dumy_data != false) {
//         $info = $dumy_data;
//         array_walk_recursive($info, function (&$item) {
//             $item = strval($item);
//         });
//     } else {
//         $info = new \stdClass();
//     }
//     return response([
//         'code' => $code,
//         'response' => 'success',
//         'message' => $msg,
//         'data' => $info
//     ], $code);
// }

function error_500()
{
    return response()->json([
        'code' => Response::HTTP_INTERNAL_SERVER_ERROR,
        'response' => 'error',
        'message' => __('Something went wrong'),
        'data' => null
    ], Response::HTTP_INTERNAL_SERVER_ERROR);
}

function get_logo()
{
    $logo = Settings::where('option_type', 'logo')->first();
    return $logo;
}

function get_fevicon()
{
    $favicon = Settings::where('option_type', 'favicon')->first();
    return $favicon;
}

function remove_url($data)
{
    return  Str::replace(url('/') . '/storage/', '', $data);
}

function count_notification()
{
    $user_count = Notifications::where('read', 0)->count();
    return $user_count;
}

function send_notification($user_id, $title, $description, $meta)
{
    $user_token = User::where('id', $user_id)->first();

    $serverKey = env('FCM_SERVER_KEY');

    $deviceToken = $user_token->fcm_token;
    $title = $title;
    $body = $description;
    $customData = [
        'title' => $title,
        'description' => $description,
        'user_id' => $user_id,
        'meta' => $meta,
    ];

    $url = 'https://fcm.googleapis.com/fcm/send';

    $response = Http::withHeaders([
        'Authorization' => 'key=' . $serverKey,
        'Content-Type' => 'application/json',
    ])->post($url, [
        'to' => $deviceToken,
        'notification' => [
            'title' => $title,
            'body' => $body,
        ],
        'data' => $customData,
    ]);

    $notification = [];

    if ($response->successful()) {
        if ($meta['type'] != 'location') {
            $notification = Notifications::create([
                'user_id' => $user_token->id,
                'title' => $title,
                'notification' => $description,
                'status' => $response->successful(),
                'meta' => $meta
            ]);
        }
    }

    $data['response'] = json_decode($response->getBody()->getContents());
    $data['notification'] = $notification;
    $data['status_code'] = $response->getStatusCode();

    return $data;
}

function send_otp($otp, $mobile_number)
{
    try {
        $get = Settings::where('option_type', 'sms_key')->first();
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://us.sms.api.sinch.com/xms/v1/3a96e95faf92400d94dd89d121149c54/batches',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => '
        {
            "from": "Wayyak",
            "to": [
                "' . $mobile_number . '"
            ],
            "body": "Welcome to carpool Your OTP is ' . $otp . '"
        }',
            CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer ' . $get->option_value . '',
                'Content-Type: application/json'
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        return '1';
    } catch (Exception $e) {
        return '0';
    }
}

function send_sms($otp, $mobile_number)
{
    try {
        $service_plan_id = env('SMS_SERVICE_PLAN_ID'); //"YOUR_servicePlanId"
        $bearer_token = env('SMS_API_TOKEN'); //"YOUR_API_token";

        //Any phone number assigned to your API
        $send_from = "Wayyak";
        //May be several, separate with a comma ,
        $recipient_phone_numbers = Str::after($mobile_number, '+');
        $message = "Welcome to Wayyak Your OTP is: {$otp}.";

        $content = [
            'to' => ["{$recipient_phone_numbers}"],
            'from' => $send_from,
            'body' => $message
        ];

        $data = json_encode($content);

        $ch = curl_init("https://us.sms.api.sinch.com/xms/v1/{$service_plan_id}/batches");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BEARER);
        curl_setopt($ch, CURLOPT_XOAUTH2_BEARER, $bearer_token);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $result = curl_exec($ch);

        if (curl_errno($ch)) {
            Log::info('---------Send SMS Error-----------');
            Log::info('Curl error: ' . curl_error($ch));
            Log::info('----------------------------------');
        } else {
            Log::info('---------Send SMS Result-----------');
            Log::info($result);
            Log::info('----------------------------------');
        }
        curl_close($ch);
        return '1';
    } catch (Exception $e) {
        return '0';
    }
}

function get_distance_start($lat, $lang, $start_lat, $start_lang)
{
    try {
        $apiKey = Config::get('services.google.maps_key');
        $res = Http::get("https://maps.googleapis.com/maps/api/distancematrix/json?destinations={$lat},{$lang}&origins={$start_lat},{$start_lang}&key={$apiKey}");
        $data = $res->json();
        $distance = $data['rows'][0]['elements'][0]['distance']['value'];
        $distance_get = (float)($distance / 1000);
        return (int) $distance_get;
    } catch (\Throwable $th) {
        return 0;
    }
}

function get_distance_time($lat, $lang, $start_lat, $start_lang)
{
    try {
        $apiKey = Config::get('services.google.maps_key');
        $res = Http::get("https://maps.googleapis.com/maps/api/distancematrix/json?destinations={$lat},{$lang}&origins={$start_lat},{$start_lang}&key={$apiKey}");
        $data = $res->json();
        return  $data;
    } catch (\Throwable $th) {
        return 0;
    }
}

function distanceBetweenTowPoints($lat1, $lon1, $lat2, $lon2)
{
    $theta = $lon1 - $lon2;
    $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
    $dist = acos($dist);
    $dist = rad2deg($dist);
    $miles = $dist * 60 * 1.1515;
    return ($miles * 1.609344);
}

function get_directions($end_lat, $end_lang, $start_lat, $start_lang)
{
    try {
        $apiKey = Config::get('services.google.maps_key');
        $res = Http::get("https://maps.googleapis.com/maps/api/directions/json?destination={$end_lat},{$end_lang}&origin={$start_lat},{$start_lang}&key={$apiKey}");
        $data = $res->json();
        return $data;
    } catch (\Throwable $th) {
        return 0;
    }
}

function users_search($fetch_users, $search)
{

    $fetch_users = $fetch_users->where('first_name', 'LIKE', '%' . $search . '%')
        ->orWhere('last_name', 'LIKE', '%' . $search . '%')
        ->orWhere('email', 'LIKE', '%' . $search . '%')
        ->orWhere('phone_number', 'LIKE', '%' . $search . '%');


    return $fetch_users;
}
