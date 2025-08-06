<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{Complaint,User,Reason,Booking};
use Mail;
use Exception;

class UserReportController extends Controller
{
    public function add_complaint(Request $request){
        try{ 
            $data = $request->all();
            $user = auth()->user();
            $validator = Validator::make($data,[
                'reason_id' => 'required',
                'complaint' =>'required',
                'ride_id' =>'required',
                'booking_id' => 'required',
            ],[
                'reason_id.required'=>__('Reason is required'),
                'complaint.required'=>__('Complaint description is required'),
                'ride_id.required' =>__('Ride is required'),
                'booking_id.required'=>__('Booking is required'),
            ]);

            if($validator->fails()){
                return validation_error($validator->messages()->all());
            }else{
                $user_data = Complaint::where(['user_id'=>$user->id,'ride_id'=>$data['ride_id']])->first();
                if(empty($user_data)){
                    Booking::where('ride_id',$data['booking_id'])->update(['report'=>1]);
                    $data = array(
                        'user_id'   => auth()->user()->id,
                        'reason_id' => $data['reason_id'],
                        'complaints' => $data['complaint'],
                        'ride_id' => $data['ride_id'],
                        'booking_id' => $data['booking_id'],
                        'created_at'=>date('Y-m-d h:i:s'),
                        'updated_at'=>date('Y-m-d h:i:s')
                    );

                    Complaint::insert($data);
                    return response()->json([ 
                        "code"=> 200,     
                        "response"=> "success",
                        "message"=> __("Complaint Send Successfully"),
                        "data"=>(object)array(),
                    ],200);
                    
                }else{
                    // $subject = 'Complaint';
                    // $to = $user_data->email;
                    return response()->json([ 
                        "code"=> 401,
                        "response"=> "error",
                        "message"=> __("You already report this rider"),
                        "data"=>(object)array(),
                    ],401);
      
                // $data['description'] = $request->complaint;
                // $data['type'] = 'Complaint';
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


    /******************Get all report list**********************/

    public function report_list(){
        try{
            $reasons =  Reason::where('reason_type','2')
                        ->where('status','1')
                        ->select('id','reason')
                        ->get();
                        
            return response()->json([
                "code"=>200,
                "response"=>"success",
                "message" =>__("Cancel reason fetch successfully"),
                "data" =>$reasons,

            ],200);

        }catch(Exception $e){
            return response()->json([
                "code" =>500,
                "response" => "error",
                "message" => $e->getMessage(),
                "data"    => (object)array()
            ],500);
        }
    }

}

  
