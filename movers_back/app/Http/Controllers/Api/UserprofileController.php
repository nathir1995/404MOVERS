<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\MoverAccountStatus;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Userdetails;
use App\Models\User;
use App\Models\UserRole;
use File;
use Exception;
use Illuminate\Support\Facades\Auth;

class UserprofileController extends Controller
{
    function uploadDocuments(Request $request)
    {
        try {
            $user = Auth::user();
            $user = User::where('email', $user->email)
                ->with(['userRole', 'moverAccountStatus'])
                ->first();

            if ($user == null) {
                return response()->json([
                    "code"      =>  401,
                    "response"  =>  "error",
                    "message"   =>  "User not found",
                    "data"      =>  []
                ], 401);
            }

            if ($user->user_role_id == UserRole::where('key', 'user')->first()->id) {
                return response()->json([
                    "code"      =>  401,
                    "response"  =>  "error",
                    "message"   =>  "User not allowed to upload documents",
                    "data"      =>  $user
                ], 401);
            }

            if ($user->mover_account_status_id == MoverAccountStatus::where('key', 'DOCUMENTS_UPLOAD_PENDING')->first()->id || $user->mover_account_status_id == MoverAccountStatus::where('key', 'DOCUMENTS_REJECTED')->first()->id) {
                if ($request->hasFile('driver_licenses')) {
                    foreach ($request->driver_licenses as $driver_license) {
                        $user->addMedia($driver_license)->toMediaCollection('driver-license');
                    }
                }

                if ($request->hasFile('wcbs')) {
                    foreach ($request->wcbs as $wcb) {
                        $user->addMedia($wcb)->toMediaCollection('wcb');
                    }
                }

                if ($request->hasFile('vehicles')) {
                    foreach ($request->vehicles as $vehicle) {
                        $user->addMedia($vehicle)->toMediaCollection('vehicle');
                    }
                }

                if ($request->hasFile('proof_of_registrations')) {
                    foreach ($request->proof_of_registrations as $proof_of_registration) {
                        $user->addMedia($proof_of_registration)->toMediaCollection('proof-of-registration');
                    }
                }

                if ($request->hasFile('license_plate_numbers')) {
                    foreach ($request->license_plate_numbers as $license_plate_number) {
                        $user->addMedia($license_plate_number)->toMediaCollection('license-plate-number');
                    }
                }

                $user->mover_account_status_id = MoverAccountStatus::where('key', 'DOCUMENTS_REVIEW_PENDING')->first()->id;
                $user->save();

                $user = User::where('email', $user->email)->first();
                $user->getMedia("*");

                return response()->json([
                    "code"      =>  200,
                    "response"  =>  "success",
                    "message"   =>  "User Documents Uploaded Successfully",
                    "data"      =>  [
                        'user' => $user,
                        'mover_account_status' => $user->moverAccountStatus->value,
                    ]
                ], 401);
            } else {
                return response()->json([
                    "code"      =>  401,
                    "response"  =>  "error",
                    "message"   =>  "Your account status is " . $user->moverAccountStatus->value . ", please contact to admin",
                    "data"      =>  [
                        'user' => $user,
                        'mover_account_status' => $user->moverAccountStatus->value,
                    ]
                ], 401);
            }
        } catch (\Throwable $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }
    //
    public function update_preference(Request $request)
    {
        try {
            $datas = $request->all();
            $validator = Validator::make($datas, [

                'preferences' => 'required',
            ], [
                'preferences.required' => 'Preference is required',
            ]);

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            } else {
                $user = auth()->user();
                $data = Userprofile::where('user_id', $user->id)->first();
                $userdata = array(
                    'user_id' => $user->id,
                    'preferences' => $datas['preferences'],
                    'created_at' => date('y-m-d h:i:s'),
                );
                if (empty($data)) {
                    $update = Userprofile::insert($userdata);
                } else {
                    $update = Userprofile::where('user_id', $user->id)->update($userdata);
                }

                return response()->json([
                    "code" => 200,
                    "response" => "success",
                    "message" => __("Data Successfully Update"),

                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function update_profile_picture(Request $request)
    {
        try {
            $data = $request->all();
            $user = auth()->user();
            // $validator = Validator::make($data,[
            //     'avatar'=>'mimes:jpeg,png,jpg,',
            // ],['avatar.mimes'=>'Profile image formate is only jpeg, png, jpg']);

            // if($validator->fails()){
            //     return validation_error($validator->messages()->all());
            // }else{
            $file_check = User::where('id', $user->id)->first();

            if ($_FILES['avatar']['name'] != '') {
                // if(!empty($file_check->avatar)){
                //     unlink(storage_path('app/public/'.remove_url($file_check->avatar)));
                // }
                $avatar = time() . '-' . Str::of(md5(time() . $request->file('avatar')->getClientOriginalName()))->substr(0, 50) . '.' . $request->file('avatar')->extension();
                $avatar_file = $request->file('avatar')->storeAs('public/uploads/User', $avatar);
                $avatar_name = str_replace('public/', '', $avatar_file);
            }
            $update = User::where('id', $user->id)->update(['avatar' => $avatar_name]);
            $user = User::where('id', $user->id)->first();
            $fetch_data['user_info']  = $this->replaceNullwithEmptyString($user->toArray());
            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Data Successfully Update"),
                "data"   =>   $fetch_data,

            ], 200);
            // }
        } catch (\Throwable $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function replaceNullWithEmptyString($array)
    {
        foreach ($array as $key => $value) {
            if (is_array($value))
                $array[$key] = $this->replace_null_with_empty_string($value);
            else {
                if (is_null($value))
                    $array[$key] = "";
            }
        }
        return $array;
    }

    public function add_account(Request $request)
    {
        try {
            $datas = $request->all();
            $validator = Validator::make($datas, [
                'bank_name' => 'required',
                'holder_name' => 'required',
                'ifsc_code' => 'required',
                'account_number' => 'required',
            ], [
                'bank_name.required' => __("Bank name is required"),
                'holder_name.required' => __("Account Holder Name is required"),
                'ifsc_code.required' => __("Ifsc code is required"),
                'account_number' => __("Account Number is required"),
            ]);
            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            } else {
                $check_user = Userdetails::where('user_id', auth()->user()->id)->first();
                if (empty($check_user)) {
                    $data = array(
                        'bank_name' => $datas['bank_name'],
                        'user_id' => auth()->user()->id,
                        'holder_name' => $datas['holder_name'],
                        'ifsc_code' => $datas['ifsc_code'],
                        'account_number' => $datas['account_number'],
                    );
                    Userdetails::create($data);
                    return response()->json([
                        "code"      =>  200,
                        "response"  =>  "success",
                        "message"   =>  __("Account create successfully"),
                    ], 200);
                } else {
                    Userdetails::where('user_id', auth()->user()->id)->update($datas);
                    return response()->json([
                        "code"      =>  200,
                        "response"  =>  "success",
                        "message"   =>  __("Account update successfully"),
                    ], 200);
                }
            }
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function fetch_account()
    {
        try {
            $check_user = Userdetails::where('user_id', auth()->user()->id)->first();
            if (empty($check_user)) {
                return response()->json([
                    "code"      =>  200,
                    "response"  =>  "success",
                    "message"   =>  __("No account found."),
                    "data"      =>  (object)array(),
                ], 200);
            } else {
                return response()->json([
                    "code"      =>  200,
                    "response"  =>  "success",
                    "message"   =>  __("Account fetch successfully"),
                    "data"      => $check_user,
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }
}
