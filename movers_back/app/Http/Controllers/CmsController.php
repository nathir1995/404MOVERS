<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Pages; 
use App\Models\Help; 
use Illuminate\Support\Str;
use Storage;
use Toastr;
use Exception;

class CmsController extends Controller
{
    public function index(){
        $data = Pages::get();
        return view('admin.cmspages.pages-list',compact('data'));
    }
     
    public function view_add_page(){
        return view('admin.cmspages.add-page');
    }

    public function add_page(Request $request){
        $request->validate([
            'title' => 'required',
            'content' =>'required',
            'status' =>'required',
        ],[
            'title.required' =>'Page title is required',
            'content.required' =>'Content is required',
            'status.required'  =>'Status is required',
        ]);
          
        $requests= $request->input();
        $data = array(
            'title' =>$requests['title'],
            'content' =>$requests['content'],
            'status'  =>$requests['status'],
        );

        try{
            $page = Pages::create($data);
            Toastr::success('Page inserted successfully','Success');
            return redirect('admin/cms/pages/pages-list');      
        }catch(Exception $e){
            Toastr::error('Something went wrong please try again','Error');
            return redirect()->back();
        }
    }

    public function redirect_page($slug){
        if(!empty($slug)){
            $page = Pages::where('status','=','1')->where('slug',$slug)->first();
            if(!empty($page)){
                return view('admin.cmspages.slug-pages',compact('page'));
            }else{
                Toastr::error('Something went wrong please try again','Error');
                return redirect()->back();
            }
        }
    }

    public function edit_cms_page($slug){
        $data = Pages::where('slug',$slug)->first();
        return view('admin.cmspages.edit-page',compact('data'));
    }
    
    public function submit_edited_page(Request $request , $slug){
        $request->validate([
            'title' => 'required',
            'content' =>'required',
            'status' =>'required',
            'content_ar'=>'required',
            'content_ku'=>'required',
        ],[
            'title.required' => 'Page title is required',
            'content.required' => 'Content is required',
            'status' =>'Status is required',
            'content_ar.required'=> 'Content in arabic is required',
            'content_ku.required'=> 'Content in kurdish is required',
        ]);
        
        $inputs = $request->input();
      
        $data= array(
            'title' => $inputs['title'],
            'content' => $inputs['content'],
            'status' => $inputs['status'],
            'content_ar' => $inputs['content_ar'],
            'content_ku' => $inputs['content_ku'],
        );

        $page_update = Pages::where('slug','=',$slug)->update($data);
        if(!empty($page_update)){
            Toastr::success('Data Updated Successfully', 'Success');
            return redirect('admin/cms/pages/pages-list');
        }else{
            Toastr::success('Something Went Wrong', 'Success');
            return redirect()->back();
        }   
    }

    public function delete_page(Request $request){
        $data = Pages::where('id',$request->id)->delete();
        if(!empty($data)){
            return response()->json([
                'success' =>true,
                'message' => 'Page delete successfully',
            ]);
        }
        else{
            return response()->json([
                'error' =>true,
                'message' => 'Something went worng try again',
            ]);
        }
    }

    public function change_page_status(Request $request){
        $data = Pages::where('id',$request->id)->update(['status' => $request->status]);
        if(!empty($data)){
            return response()->json([
                'success' =>true,
                'message' => 'Page Status Update successfully',
            ]);
        }
        else{
            return response()->json([
                'error' =>true,
                'message' => 'Something Went Wrong try again',
            ]);
        }
    }


    public function help_list(){
        $data = Help::get();
        return view('admin.cmspages.help-list',compact('data'));
    }

    public function add_help(){
        return view('admin.cmspages.add-help');
    }

    public function submit_help(Request $request){
        try{
            $request->validate([
            'title'       => 'required',
            'description' => 'required',
            'status'      => 'required',
            ],['title.required' => 'Help title is required',
                'description.required' =>'Help Description is required',
                'status.required' => 'Help Status is required',  
            ]);
            $data = $request->all();

            $help_data = new Help();
            $help_data->title = $data['title'];
            $help_data->description = $data['description'];
            $help_data->status = $data['status'];
            $help_data->save();
            if($help_data){
                Toastr::success('Help add successfully','Success');
                return redirect('admin/cms/help/help-list');
            }
        }catch(Exception $e){
            Toastr::error('Something went wrong please try again','Error');
            return redirect()->back();
        }    
    }

    public function delete_help(Request $request){
        $data = Help::where('id',$request->id)->delete();
        if(!empty($data)){
            return response()->json([
                'success' =>true,
                'message' => 'Help delete successfully',
            ]);
        }
        else{
            return response()->json([
                'error' =>true,
                'message' => 'Something went worng try again',
            ]);
        }
    }

    public function edit_help(Request $request,$id){
        $data = Help::where('id',$request->id)->first();
        return view('admin.cmspages.edit-help',compact('data'));
    }

    public function submit_edit_help(Request $request ,$id){
        try{
            $request->validate([
            'title'       => 'required',
            'description' => 'required',
            'status'      => 'required',
            ],['title.required' => 'Help title is required',
                'description.required' =>'Help Description is required',
                'status.required' => 'Help Status is required',  
            ]);
            $data = $request->all();
            $help_data = Help::find($id);
            $help_data->title = $data['title'];
            $help_data->description = $data['description'];
            $help_data->status = $data['status'];
            $help_data->update();
            if($help_data){
                Toastr::success('Help Edit successfully','Success');
                return redirect('admin/cms/help/help-list');
            }
        }catch(Exception $e){
            Toastr::error('Something went wrong please try again','Error');
            return redirect()->back();
        }    
    }

    public function change_help_status(Request $request){
        $data = Help::where('id',$request->help_id)->update(['status' => $request->status]);
        if(!empty($data)){
            return response()->json([
                'success' =>true,
                'message' => 'Page Status Update successfully',
            ]);
        }
        else{
            return response()->json([
                'error' =>true,
                'message' => 'Something Went Wrong try again',
            ]);
        }
    }


}
