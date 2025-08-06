<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Reason; 
use App\Models\Complaint; 
use App\Models\Enquiry; 
use App\Models\Cancel;
use Toastr;
use Exception;
use Mail;

class ReportController extends Controller
{
    // 
    public function compalint_list(){
        $data = Complaint::with('getComplaintUser')->with('getComplaintReason')->get();
        return view('admin.report.complaint',compact('data'));
    }

    public function view_complaint($id){
        $data = Complaint::with('getComplaintUser','getComplaintReason','getRideInformation')->where('id',$id)->first();
     
        if($data->status !='2' && $data->status !='3'){
            Complaint::where('id',$id)->update(['status'=>'2']);
        }
        return view('admin.report.view-complaint',compact('data')); 
    }

    public function complaint_reply(Request $request){
        try{
            $email = Complaint::with('getComplaintUser')->where('id',$request->id)->first();
            $subject = 'Complaint Reply';
            $to = $email->getComplaintUser->email;
            $data['title'] = $request->title;
            $data['summary'] =  $request->summary;
            $data['description'] = $request->description;
            $data['type'] = 'Complaint Reply';
            Complaint::where('id',$request->id)->update(['status'=>'3']);
            Mail::send('emails.QueryReply',$data, function ($message) use ($subject, $to) {
                $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'));
                $message->to($to);
                $message->subject($subject . ' :Welcome to ' . env('APP_NAME'));
            });
            return response()->json([
                'success' =>true,
                'message' =>'Reply Send Successfully',
            ]);
        }
        catch(Exception $e){
            return response()->json([
                'error' =>true,
                'message' =>'Something went wrong',
            ]);
        }
    }

    public function delete_complaint(Request $request){
        $delete = Complaint::find($request->id);
        $delete->delete();
        if($delete){
            return response()->json([
                'success' =>true,
                'message' => 'Complaint delete successfully',
            ]);
        }
        else{
            return response()->json([
                'error' =>true,
                'message' => 'Something went worng',
            ]);
        }
    } 

    public function enquiry_list(){
        $data = Enquiry::with('getEnquiryReason')->with('getEnquiryUser')->get();
        return  view('admin.report.enquiry',compact('data'));
    }

    public function view_enquiry($id){
        $data = Enquiry::with('getEnquiryReason')->with('getEnquiryUser')->where('id',$id)->first();
        if($data->status !='2' && $data->status !='3'){
            Enquiry::where('id',$id)->update(['status'=>'2']);
        }
        return view('admin.report.view-enquiry',compact('data')); 
    }

    public function enquiry_reply(Request $request){
        try{
            $email = Enquiry::with('getEnquiryUser')->where('id',$request->id)->first();
            $subject = 'Enquiry Reply';
            $to = $email->enquiry_user->email;
            $data['title'] = $request->title;
            $data['summary'] =  $request->summary;
            $data['description'] = $request->description;
            $data['type'] = 'Enquiry Reply';
            Enquiry::where('id',$request->id)->update(['status'=>'3']);
            Mail::send('emails.QueryReply',$data, function ($message) use ($subject, $to) {
                $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'));
                $message->to($to);
                $message->subject($subject . ' :Welcome to ' . env('APP_NAME'));
            });
            return response()->json([
                'success' =>true,
                'message' =>'Reply Send Successfully',
            ]);
        }
        catch(Exception $e){
            return response()->json([
                'error' =>true,
                'message' =>'Something went wrong',
            ]);
        }
    }

    public function delete_enquiry(Request $request){
        $delete = Enquiry::find($request->id);
        $delete->delete();
        if($delete){
            return response()->json([
                'success' =>true,
                'message' => 'Enquiry delete successfully',
            ]);
        }
        else{
            return response()->json([
                'error' =>true,
                'message' => 'Something went wrong',
            ]);
        }
    }

    public function reasons_list(){
        $data = Reason::get();
        return view('admin.report.reasons-list',compact('data'));
    }

    public function add_reason(){
        return view('admin.report.add-reason');
    }

    public function submit_reason(Request $request){
        $request->validate([
            'reason' => 'required',
            'reason_type' => 'required',
            'status' => 'required',
        ],[
           'reason.required' =>'Reason is required',
           'reason_type.required' => 'Reason type is required',
           'status.required' =>'Status is required',
        ]);
        $input = $request->all();
        $insert = new Reason;
        $insert->reason = $input['reason'];
        $insert->reason_type = $input['reason_type'];
        $insert->status = $input['status'];
        $insert->save();
        if(!empty($insert)){
            Toastr::success('Reason Add Successfully', 'Success');
            return redirect('admin/report/reasons');
        }else{
            Toastr::error('Something went worng', 'Error');
            return redirect()->back()->withInput($request->all());
        }
    }

    public function edit_reason($id){
       $data = Reason::where('id','=',$id)->first();
       return view('admin/report/edit-reason',compact('data'));
    }

    public function submit_edit_reason(Request $request,$id){
        $request->validate([
            'reason' => 'required',
            'reason_type' => 'required',
            'status' => 'required',
        ],[
           'reason.required' =>'Reason is required',
           'reason_type.required' => 'Reason type is required',
           'status.required' =>'Status is required',
        ]);

       $input = $request->all();
       $update = Reason::find($id);
       $update->reason = $input['reason'];
       $update->reason_type = $input['reason_type'];
       $update->status = $input['status'];
       $update->update();
       if(!empty($update)){
        Toastr::success('Reason Update Successfully', 'Success');
        return redirect('admin/report/reasons');
        }else{
            Toastr::error('Something went worng', 'Error');
            return redirect()->back()->withInput($request->all());
        }
    }

    public function delete_reason(Request $request){
        $delete = Reason::find($request->id);
        $delete->delete();
        if(!empty($delete)){
            return response()->json([
                'success' =>true,
                'message' => 'Reason Delete successfully',
            ]);
        }
        else{
            return response()->json([
                'error' =>true,
                'message' => 'Something Went Wrong',
            ]);
        }
    
    }

    public function reason_change_status(Request $request){
        $data = Reason::where('id',$request->id)->update(['status' => $request->status]);
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

     public function cancel_reasons(){
        $cancel = Cancel::with('getCanceluser','getCancelReason','getCancelRideInformation')->get();
    /* s */
        return view('admin.report.cancel',compact('cancel'));
    }

    public function delete_cancel_reason(Request $request){
        $delete = Cancel::find($request->id);
        $delete->delete();
        if(!empty($delete)){
            return response()->json([
                'success' =>true,
                'message' => 'Reason Delete successfully',
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
