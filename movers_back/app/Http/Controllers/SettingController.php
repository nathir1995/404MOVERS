<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Settings;
use Exception;
use Toastr;
use Illuminate\Support\Str;

class SettingController extends Controller
{
    //
    public function logo_favicon()
    {
        $logo = Settings::where('option_type', 'logo')->first();
        $favicon = Settings::where('option_type', 'favicon')->first();
        return view('admin.setting.site-logo', compact('logo', 'favicon'));
    }

    public function add_favicon(Request $request)
    {
        try {
            if ($_FILES['logo']['name'] != '') {

                $logo = time() . '-' . Str::of(md5(time() . $request->file('logo')->getClientOriginalName()))->substr(0, 50) . '.' . $request->file('logo')->extension();
                $logo_image = $request->file('logo')->storeAs('public/uploads/logo', $logo);
                $logo_name = str_replace('public/', '', $logo_image);
                $logo_status = Settings::where('option_type', 'logo')->update(['option_value' => $logo_name]);
            }

            if ($_FILES['favicon']['name'] != '') {

                $favicon = time() . '-' . Str::of(md5(time() . $request->file('favicon')->getClientOriginalName()))->substr(0, 50) . '.' . $request->file('favicon')->extension();
                $favicon_image = $request->file('favicon')->storeAs('public/uploads/logo', $favicon);
                $favicon_name = str_replace('public/', '', $favicon_image);
                $favicon_status = Settings::where('option_type', 'favicon')->update(['option_value' => $favicon_name]);
            }
            if (!empty($logo_status) || !empty($favicon_status)) {
                Toastr::success('Data Update Successfully', 'Success');
                return redirect()->back();
            }
        } catch (Exception $e) {
            Toastr::error('Something Went Wrong ', 'Error');
            return redirect()->back();
        }
    }

    public function admin_setting()
    {
        $admin_percentage = Settings::where('option_type', 'admin_percentage')->first();
        $smskey = Settings::where('option_type', 'sms_key')->first();
        $per_km = Settings::where('option_type', 'per_km')->first();
        $search_radius = Settings::where('option_type', 'search_radius')->first();
        return view('admin.setting.admin_percentage', compact('admin_percentage', 'smskey', 'per_km', 'search_radius'));
    }

    public function submit_admin_per(Request $request)
    {
        $request->validate([
            'admin_percentage' => 'required|integer|between:1,100',
        ], ['admin_percentage.required' => 'Admin Percentage is required']);

        $data = Settings::where('option_type', 'admin_percentage')->update(['option_value' => $request->admin_percentage]);
        if ($data) {
            Toastr::success('Data Update Successfully', 'Success');
            return redirect()->back();
        } else {
            Toastr::error('Something Went Wrong Try Again', 'Error');
            return redirect()->back();
        }
    }

    public function update_sms_key(Request $request)
    {
        $request->validate([
            'key' => 'required',
        ], ['key.required' => 'Admin Percentage is required']);

        $data = Settings::where('option_type', 'sms_key')->update(['option_value' => $request->key]);
        if ($data) {
            Toastr::success('Data Update Successfully', 'Success');
            return redirect()->back();
        } else {
            Toastr::error('Something Went Wrong Try Again', 'Error');
            return redirect()->back();
        }
    }

    public function update_search_radius(Request $request)
    {
        $request->validate([
            'search_radius' => 'required',
        ], ['search_radius.required' => 'Search Radius is required']);

        $data = Settings::where('option_type', 'search_radius')->update(['option_value' => $request->search_radius]);
        if ($data) {
            Toastr::success('Data Update Successfully', 'Success');
            return redirect()->back();
        } else {
            Toastr::error('Something Went Wrong Try Again', 'Error');
            return redirect()->back();
        }
    }

    public function submit_per_km(Request $request)
    {
        $request->validate([
            'price' => 'required',
        ], ['price.required' => 'Kilometer price is required']);

        $data = Settings::where('option_type', 'per_km')->update(['option_value' => $request->price]);
        if ($data) {
            Toastr::success('Data Update Successfully', 'Success');
            return redirect()->back();
        } else {
            Toastr::error('Something Went Wrong Try Again', 'Error');
            return redirect()->back();
        }
    }
}
