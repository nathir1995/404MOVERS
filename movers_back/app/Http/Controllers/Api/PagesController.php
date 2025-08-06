<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Help;
use App\Models\Pages;
use Exception;

class PagesController extends Controller
{
    public function get_pages(Request $request){
        try{
            $data = $request->all();
            $validator = Validator::make($data,[
                'slug'   => 'required',
            ]);
            if($validator->fails()){
                return validation_error($validator->messages()->all());
            }else{
                $header = $request->header('X-localization');

                if($header=='en'){
                    $result = Pages::where('slug',$request->slug)->where('status','1')->first();
                    $data['id']= $result->id;
                    $data['title']= $result->title;
                    $data['slug']= $result->slug;
                    $data['content']= $result->content;
                    $data['status']= $result->status;
                    $data['created_at']= $result->created_at;
                    $data['updated_at']= $result->updated_at;


                }elseif($header=='ar'){
                    $result = Pages::where('slug',$request->slug)->where('status','1')->first();
                    $data['id']= $result->id;
                    $data['title']= $result->title;
                    $data['slug']= $result->slug;
                    $data['content']= $result->content_ar;
                    $data['status']= $result->status;
                    $data['created_at']= $result->created_at;
                    $data['updated_at']= $result->updated_at;

                }elseif($header=='ku'){
                    $result = Pages::where('slug',$request->slug)->where('status','1')->first();
                    $data['id']= $result->id;
                    $data['title']= $result->title;
                    $data['slug']= $result->slug;
                    $data['content']= $result->content_ku;
                    $data['status']= $result->status;
                    $data['created_at']= $result->created_at;
                    $data['updated_at']= $result->updated_at;
                }


                
                if($data){
                    return response()->json([ 
                        "code"=> 200,
                        "response"=> "success",
                        "message"=> __("Data Fetch Successfully"),
                        'data'=>$data
                    ],200);
                }
                else{
                    return response()->json([ 
                        "code"=> 401,
                        "response"=> "error",
                        "message"=> __("Page is not available"),
                      
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
}
