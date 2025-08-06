<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Review,Rides,User,Booking};
use Exception;
use Validator;
use Carbon\Carbon;

class UserRatingController extends Controller
{

    public function add_review(Request $request){
        try{
            $data = $request->all();
            $validator = Validator::make($data,[
                'ride_id' => 'required',
                'rating' =>'required',
                'description' => 'required',
                'receiver_id' => 'required',
                'booking_id'  => 'required',
            ]);

            if($validator->fails()){
                return validation_error($validator->messages()->all());
            }else{
                $check_ride_status = Rides::where('id',$data['ride_id'])->first();
                if($check_ride_status['status'] =='2'){ 
                    $review_check = Review::where(['ride_id'=>$data['ride_id'],'giver_id'=>auth()->user()->id])->first();
                    if(empty($review_check) && !empty('booking_id')){
                        Booking::where('id',$data['booking_id'])->update(['review'=>1]);
                        $review  = new Review();
                        $review->receiver_id  = $data['receiver_id'];
                        $review->ride_id  = $data['ride_id'];
                        // $review->review_date = Carbon::now()->format('d F Y');
                        $review->rating  = $data['rating'];
                        $review->description  = $data['description'];
                        $review->giver_id = auth()->user()->id;
                        $review->save();

                        $dataget = Review::where('receiver_id',$data['receiver_id'])->avg('rating');
                        $datarate = number_format($dataget, 1, '.', ',');
                        
                        User::where('id',$data['receiver_id'])->update(['rating'=>(string)$datarate]);
                        return response()->json([ 
                            "code"      => 200,
                            "response"  => "success",
                            "message"   => __("Review successfully done"),
                            "data"      => (object)array()
                        ],200);
                    }else{
                        return response()->json([ 
                            "code"      => 401,
                            "response"  => "error",
                            "message"   => __("You already give review to this ride"),
                            "data"      => (object)array()
                        ],401);
                    }
                }else{
                    return response()->json([ 
                        "code"      => 401,
                        "response"  => "error",
                        "message"   => __("Sorry this ride is not completed"),
                        "data"      => (object)array()
                    ],401);
                }    
            } 
        }catch(Exception $e){
            return response()->json([ 
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ],500);
        }    
    }

    public function showallrating(){
        try{
            $data['my_rating']  =   Review::where('receiver_id',auth()->user()->id)
                                    ->select('giver_id','rating','description','review_date') 
                                    ->with('getallGiver:id,first_name,last_name,avatar')
                                    ->get();

            $data['given_rating']   =     Review::where('giver_id',auth()->user()->id)
                                        ->select('receiver_id','rating','description','review_date') 
                                        ->with('getallReceiver:id,first_name,last_name,avatar')
                                        ->get();
            return response()->json([ 
                "code"      => 200,
                "response"  => "success",
                "message"   => __("Review Fetch Successfully"),
                "data"      => $data
            ],200);

        }catch(Exception $e){
            return response()->json([ 
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ],500);
        }
    }
}
