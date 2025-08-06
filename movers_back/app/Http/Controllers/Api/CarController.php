<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\CarMultipleDocs;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Support\Facades\Storage;
use File;
use Illuminate\Support\Facades\Log;
use Mail;

class CarController extends Controller
{
    /******************Add a car************************/
    public function add_car(REQUEST $request){
        try{
            $data = $request->all();
            $user = auth()->user();
            $validator = Validator::make($data,[
                // 'car_name'   => 'required',
                // 'car_model'  => 'required',
                // 'car_color'  => 'required',
                'driving_license' =>'required',
                'car_img' =>'required',
                'car_docs' =>'required',
                // 'car_number' =>'required',
                // 'total_seat' =>'required',
            ],['driving_license.required'=>__("Driving license is required"),
                'car_img.required'=>__("Car image is required"),
                'car_docs.required'=>__("Car documents is required"),
                /* 'car_number.required' => __("Car number is required"),
                'total_seat.required' => __("Total number of seat avaliablity in car is required"),
                'car_name.required' => __("Car name is required"),
                'car_model.required' => __("Car model is required"),
                'car_color.required' => __("Car color is required"), */
            ]);
            if($validator->fails()){
                return validation_error($validator->messages()->all());
            }else{
                $data = array(
                    'car_name'   => $request->car_name,
                    'car_model'  => $request->car_model,
                    'car_color'  => $request->car_color,
                );
                if($_FILES['driving_license']['name']!=''){
                    $driving_license = time() . '-' . Str::of(md5(time() . $request->file('driving_license')->getClientOriginalName()))->substr(0, 50) . '.' . $request->file('driving_license')->extension();
                    $driving_file = $request->file('driving_license')->storeAs('public/uploads/Car',$driving_license);
                    $driving_main = str_replace('public/','',$driving_file);
                }

                if($_FILES['car_img']['name']!=''){
                    $car_img = time() . '-' . Str::of(md5(time() . $request->file('car_img')->getClientOriginalName()))->substr(0,50) . '.'. $request->file('car_img')->extension();
                    $car_imgmain = $request->file('car_img')->storeAs('public/uploads/Car',$car_img);
                    $car_img_name = str_replace('public/','',$car_imgmain);
                }
                $car  = Car::where('user_id',auth()->user()->id)->first();

                if(empty($car)){
                    $primary = "0";
                }
                else{
                    $primary = "1";
                }
                $data = new Car();
                $data->user_id  = $user->id;
                $data->car_name = $request->car_name;
                $data->car_model = $request->car_model;
                $data->car_color = $request->car_color;
                $data->car_img = $car_img_name;
                $data->driving_license = $driving_main;
                $data->car_number = $request->car_number;
                $data->total_seat = $request->total_seat;
                $data->primary_car = $primary;
                $data->save();
                $last_car = $data->id;

                if($data){

                    $user_data['name'] = auth()->user()->first_name;
                    $user_data['car_name'] = auth()->user()->car_name;


                    $to = 'jackjhon@mailinator.com';
                    $subject = "Car add";

                    // Mail::send('emails.AddCarNotification',$user_data, function ($message) use ($subject, $to) {
                    //     $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'));
                    //     $message->to($to);
                    //     $message->subject($subject . ' :Welcome to ' . env('APP_NAME'));
                    // });
                }

                if($request['car_docs']){
                    foreach ($request['car_docs'] as $documents) {
                        $documents_name = time().'-'.Str::of(md5(time().$documents->getClientOriginalName()))->substr(0, 50).'.'.$documents->extension();
                        $path = $documents->storeAs('public/uploads/Car', $documents_name);
                        $current_path = str_replace('public/','', $path);
                        $datas = new CarMultipleDocs();
                        $datas->user_id  = $user->id;
                        $datas->car_id   =  $last_car;
                        $datas->document = $current_path;
                        $datas->save();
                    }
                }

                $info['car_info'] = Car::where('id',$last_car)->with('getCarDocument')->first();

                return response()->json([
                    "code"=> 200,
                    "response"=> "success",
                    "message"=> __("Car Add Successfully"),
                    "data" => $info,

                ],200);
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

    /**************Delete a  car *************************************/
    public function delete_car(Request $request){
        try{
            $user = auth()->user();
            $data = $request->all();
            $validator= Validator::make($data,[
                'id'=>'required',
            ],['id'=>__("Car Id is required")]);

            if($validator->fails()){
                return validation_error($validator->messages()->all());
            }else{
                $car= Car::where('user_id',auth()->user()->id)->get();

                $cardata= Car::find($data['id']);
                // dd($cardata);
                if(empty($cardata)){
                    return response()->json([
                        "code"      =>  401,
                        "response"  =>  "error",
                        "message"   =>  __("No car for delete found"),
                    ],500);
                }else{
                    if(count($car)=='1'){
                        return response()->json([
                            "code"      =>  401,
                            "response"  =>  "error",
                            "message"   =>  __("You need to add car first for remove this primary car"),

                        ],401);
                    }else{
                        if($cardata->primary_car=='0'){
                            $data = Car::where('user_id',auth()->user()->id)->where('id','!=',$data['id'])->get();
                            Car::where('user_id',auth()->user()->id)->where('id',$data[0]->id)->update(['primary_car'=>'0']);
                            Car::where('id',$cardata->id)->update(['status'=>'0']);
                            // $cardata->delete();
                            return response()->json([
                                    "code"=> 200,
                                    "response"=> "success",
                                    "message"=> __("Car Delete Successfully"),

                                ],200);
                        }else{
                            Car::where('id',$cardata->id)->update(['status'=>'0']);
                            // $cardata->delete();
                            return response()->json([
                                    "code"=> 200,
                                    "response"=> "success",
                                    "message"=> __("Car Delete Successfully"),

                                ],200);
                        }
                    }
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


    public function remove_multiple(Request $request){
        try{
            $data = $request->all();
            $validator = Validator::make($data,[
                'doc_id' => 'required',
            ]);
            if($validator->fails()){
                return validation_error($validator->messages()->all());
            }else{
                $delete = CarMultipleDocs::find($data['doc_id']);

                if(!empty($delete)){
                    unlink(storage_path('app/public/'.remove_url($delete->document)));
                }
                $delete->delete();
                return response()->json([
                    "code"=> 200,
                    "response"=> "success",
                    "message"=> __("Document Delete Successfully"),

                ],200);
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

    // public function edit_car(REQUEST $request){
    //     try{
    //         $data = $request->all();
    //         $user = auth()->user();
    //         $validator = Validator::make($data,[
    //             'car_name'   => 'required',
    //             'car_model'  => 'required',
    //             'car_color'  => 'required',
    //         ]);
    //         if($validator->fails()){
    //             return validation_error($validator->messages()->all());
    //         }else{

    //             $car_data = array(
    //                 'car_name'   => $request->car_name,
    //                 'car_model'  => $request->car_model,
    //                 'car_color'  => $request->car_color,
    //             );

    //             $car_info =Car::find($request->car_id);

    //             if($_FILES['driving_license']['name']!=''){

    //                 unlink(storage_path('app/public/'.remove_url($car_info->driving_license)));
    //                 $driving_license = time() . '-' . Str::of(md5(time() . $request->file('driving_license')->getClientOriginalName()))->substr(0, 50) . '.' . $request->file('driving_license')->extension();
    //                 $driving_file = $request->file('driving_license')->storeAs('public/uploads/Car',$driving_license);
    //                 $car_data['driving_license'] = str_replace('public/','',$driving_file);
    //             }

    //             if($_FILES['car_img']['name']!=''){

    //                 unlink(storage_path('app/public/'.remove_url($car_info->car_img)));
    //                 $car_img = time() . '-' . Str::of(md5(time() . $request->file('car_img')->getClientOriginalName()))->substr(0,50) . '.'. $request->file('car_img')->extension();
    //                 $car_imgmain = $request->file('car_img')->storeAs('public/uploads/Car',$car_img);
    //                 $car_data['car_img'] = str_replace('public/','',$car_imgmain);
    //             }

    //             Car::where('id',$request->car_id)->update($car_data);
    //             if($request['car_docs']){
    //                 foreach ($request['car_docs'] as $documents) {
    //                     $documents_name = time().'-'.Str::of(md5(time().$documents->getClientOriginalName()))->substr(0, 50).'.'.$documents->extension();
    //                     $path = $documents->storeAs('public/uploads/Car', $documents_name);
    //                     $current_path = str_replace('public/','', $path);
    //                     $datas = new CarMultipleDocs();
    //                     $datas->user_id  = $user->id;
    //                     $datas->car_id   =  $car_info->id;
    //                     $datas->document = $current_path;
    //                     $datas->save();
    //                 }
    //             }

    //             return response()->json([
    //                 "code"=> 200,
    //                 "response"=> "success",
    //                 "message"=> "Car Add Successfully",

    //             ],200);
    //         }
    //     }catch(Exception $e){

    //         return response()->json([
    //             "code"      =>  500,
    //             "response"  =>  "error",
    //             "message"   =>  $e->getMessage(),
    //             "data"      =>  (object)array()
    //         ],500);
    //     }
    // }


    /****************************Make car primary*****************************/

    public function make_car_primary(Request $request){
        try{
           $data =  Car::where('user_id',auth()->user()->id)->where('primary_car','0')->update(['primary_car'=>'1']);
           if($data){
            Car::where('id',$request->car_id)->update(['primary_car'=> '0' ]);
           }

            return response()->json([
                "code"=> 200,
                "response"=> "success",
                "message"=> __("Car Status Change Successfully"),

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
