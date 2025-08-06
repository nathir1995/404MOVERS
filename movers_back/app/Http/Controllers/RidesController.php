<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Rides, Locations, Car, Reason, Cancel, User, Booking};

class RidesController extends Controller
{

    public function index(Request $request)
    {
        // if(!empty($request->first_name) || !empty($request->email) || !empty($request->phone_number)){

        //     $userdata = User::where('status', '1');

        //     if (!empty($request->first_name)) {
        //         $typeQuery = $userdata->where('first_name','like', '%'.$request->first_name.'%');
        //     }

        //     if (!empty($request->email)) {
        //         $typeQuery = $userdata->where('email','like', '%'.$request->email.'%');
        //     }

        //     if (!empty($request->phone_number)) {
        //         $typeQuery = $userdata->where('phone_number','like', '%'.$request->phone_number.'%');
        //     }

        //     @$user_id = $typeQuery->first();

        //     $ride = Rides::with('GetUserInfo','GetCarInfo')->where('user_id',@$user_id->id)->orderBy("id", "DESC")->get();

        // }else{
        $ride = Rides::with('GetUserInfo', 'GetCarInfo')->orderBy("id", "DESC")->get();
        /*       } */
        return view('admin.rides.rides-list', compact('ride'));
    }

    public function view_ride($id)
    {
        $ride = Rides::with('GetUserInfo', 'GetCarInfo', 'GetOtherLocation')->where('id', $id)->first();
        $booking = Booking::with('GetallBookedUser')->where('ride_id', $id)->get();
        return view('admin.rides.view-ride', compact('ride', 'booking'));
    }

    public function rides_route(Request $request)
    {
        $data =   get_directions($request->end_lat, $request->end_lang, $request->start_lat, $request->start_lang);
        $polyline = $data['routes'][0]['overview_polyline']['points'];
        return $polyline;
    }
}
