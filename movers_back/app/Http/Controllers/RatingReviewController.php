<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Review; 
use Toastr;

class RatingReviewController extends Controller
{
    //

    public function index(){
        $data = Review::with('getReceiver','getGiver')->get();
        return view('admin.rating.rating_list',compact('data'));
    }

    public function view_rating($id){
        $data = Review::with('getReceiver','getGiver')->find($id);
        return view('admin.rating.rating_review',compact('data'));
    }

    public function delete_rating(Request $request){
        $delete = Review::find($request->id);
        $delete->delete();
        if($delete){
            return response()->json([
                'success' =>true,
                'message' => 'Review delete successfully',
            ]);
        }else{
            return response()->json([
                'error' =>true,
                'message' => 'Something Went Wrong',
            ]);
        }
    }

    public function rating_change_status(Request $request){
        $data = Review::where('id',$request->id)->update(['status' => $request->status]);
        if(!empty($data)){
            return response()->json([
                'success' =>true,
                'message' => 'Status Update successfully',
            ]);
        }
        else{
            return response()->json([
                'error' =>true,
                'message' => 'Something Went Wrong',
            ]);
        }
    }
}
