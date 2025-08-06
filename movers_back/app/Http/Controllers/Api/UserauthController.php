<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\VerificationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\{User, Car, HearAbout, MetropolitanArea, MoverAccountStatus, Userprofile, Settings, Notifications, Province, TshirtSize, UserRole, VehicleType};
use Exception;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserauthController extends Controller
{

    /** User Register */
    public function userRegister(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'first_name' => 'required',
                    'last_name' => 'required',
                    'email' => 'required|email|unique:users',
                    'phone' => 'required',
                    'password' => 'required|confirmed|min:8',
                    'fcm_token' => 'nullable',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $current_time = Carbon::now()->timestamp;
            $otp = rand(100000, 999999);
            $insert_data = new User();
            $insert_data->first_name = $request->first_name;
            $insert_data->last_name = $request->last_name;
            $insert_data->email = $request->email;
            $insert_data->phone_number = $request->phone;
            $insert_data->password = Hash::make($request->password);
            $insert_data->user_role_id = UserRole::where('key', 'user')->first()->id;
            $insert_data->member_since =  Carbon::parse($current_time)->format('F Y');
            $insert_data->member_time =  Carbon::parse($current_time)->format('d F Y , h:iA');
            $insert_data->hear_about_id = $request->filled('hear_about_us') ? HearAbout::where('key', $request->hear_about_us)->first()->id : null;
            $insert_data->otp = $otp;
            $insert_data->otp_created_at = date('Y-m-d H:i:s', strtotime('+7 minutes'));
            $insert_data->mover_account_status_id = 2;
            $insert_data->fcm_token = $request->input('fcm_token');
            $insert_data->save();

            $fetch_user = User::where('id', $insert_data->id)->first();

            $fetch_data['user_data'] = $fetch_user;
            $fetch_data['user_role'] = $fetch_user->userRole->key;
            $fetch_data['account_status'] = $fetch_user->moverAccountStatus->value;

            // Send email code
            $details = [
                'title' => 'Mail from mover404',
                'body' => 'Your OTP code is: ' . $otp . ' and valid for 2 minutes'
            ];

            Mail::to($request->email)->send(new VerificationMail($details));
            //
            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Register Successfully"),
                "data" => $fetch_data,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $th->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    /** Driver Register */
    public function driverRegister(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'first_name' => 'required',
                    'last_name' => 'required',
                    'email' => 'required|email|unique:users',
                    'phone' => 'required',
                    'date_of_birth' => 'required',
                    'password' => 'required|confirmed|min:8',
                    'province' => 'required',
                    'city' => 'required',
                    'street' => 'required',
                    'vehicle_make' => 'required',
                    'vehicle_model' => 'required',
                    'vehicle_year' => 'required',
                    'vehicle_type' => 'required',
                    'metropolitan_area' => 'required',
                    'moves_each_week' => 'numeric|between:1,100',
                    'fcm_token' => 'nullable',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $current_time = Carbon::now()->timestamp;
            $otp = rand(100000, 999999);
            $insert_data = new User();
            $insert_data->first_name = $request->first_name;
            $insert_data->last_name = $request->last_name;
            $insert_data->email = $request->email;
            $insert_data->phone_number = $request->phone;
            $insert_data->password = Hash::make($request->password);
            $insert_data->dob =  Carbon::parse($request->date_of_birth)->format('d F Y');
            $insert_data->otp = $otp;
            $insert_data->otp_created_at = date('Y-m-d H:i:s', strtotime('+7 minutes'));

            $insert_data->province_id =  Province::where('key', $request->province)->first()->id;
            $insert_data->city =  $request->city;
            $insert_data->street =  $request->street;
            $insert_data->appartment_or_unit_number =  $request->input('appartment_or_unit_number');
            $insert_data->postal_code =  $request->input('postal_code');

            $insert_data->user_role_id = UserRole::where('key', 'driver')->first()->id;
            // $insert_data->tshirt_size_id = TshirtSize::where('key', $request->t_shirt_size)->first()->id;
            $insert_data->metropolitan_area_id = MetropolitanArea::where('key', $request->metropolitan_area)->first()->id;
            $insert_data->member_since =  Carbon::parse($current_time)->format('F Y');
            $insert_data->member_time =  Carbon::parse($current_time)->format('d F Y , h:iA');
            $insert_data->hear_about_id = $request->filled('hear_about_us') ? HearAbout::where('key', $request->hear_about_us)->first()->id : null;
            $insert_data->moves_each_week = $request->input('moves_each_week');
            $insert_data->why_great_mover = $request->input('why_great_mover');
            $insert_data->mover_account_status_id = 2;
            $insert_data->fcm_token = $request->input('fcm_token');
            $insert_data->save();

            $fetch_user = User::where('id', $insert_data->id)->first();

            $vehicle = new Car();
            $vehicle->user_id = $fetch_user->id;
            $vehicle->vehicle_make = $request->vehicle_make;
            $vehicle->vehicle_model = $request->vehicle_model;
            $vehicle->vehicle_year = $request->vehicle_year;
            $vehicle->vehicle_type_id = VehicleType::where('key', $request->vehicle_type)->first()->id;
            $vehicle->save();

            $token = $fetch_user->createToken('my-app-token')->plainTextToken;
            // $fetch_data['token'] = $token;
            $fetch_data['user_data'] = $fetch_user;
            $fetch_data['vehicle_data'] = $vehicle;
            $fetch_data['user_role'] = $fetch_user->userRole->key;
            $fetch_data['metropolitan_area'] = $fetch_user->metropolitanArea->key;
            $fetch_data['vehicle_type'] = $vehicle->vehicleType->key;
            $fetch_data['province'] = $fetch_user->province->key;
            $fetch_data['hear_about_us'] = $request->filled('hear_about_us') ? $fetch_user->hearAbout->key : null;
            $fetch_data['mover_account_status'] = $fetch_user->moverAccountStatus->value;
            // $fetch_data['tshirt_size'] = $fetch_user->tshirtSize->key;

            // Send email code

            $details = [
                'title' => 'Mail from mover404',
                'body' => 'Your OTP code is: ' . $otp . ' and valid for 2 minutes'
            ];

            Mail::to($request->email)->send(new VerificationMail($details));
            //

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Register Successfully"),
                "data" => $fetch_data,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $th->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    /** Labor Register */
    public function laborRegister(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'first_name' => 'required',
                    'last_name' => 'required',
                    'email' => 'required|email|unique:users',
                    'phone' => 'required',
                    'date_of_birth' => 'required',
                    'password' => 'required|confirmed|min:8',
                    'province' => 'required',
                    'city' => 'required',
                    'street' => 'required',
                    'metropolitan_area' => 'required',
                    'moves_each_week' => 'numeric|between:1,100',
                    'able' => 'required|numeric|between:0,1',
                    'fcm_token' => 'nullable',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $current_time = Carbon::now()->timestamp;
            $otp = rand(100000, 999999);
            $insert_data = new User();
            $insert_data->first_name = $request->first_name;
            $insert_data->last_name = $request->last_name;
            $insert_data->email = $request->email;
            $insert_data->phone_number = $request->phone;
            $insert_data->password = Hash::make($request->password);
            $insert_data->dob =  Carbon::parse($request->date_of_birth)->format('d F Y');
            $insert_data->otp = $otp;
            $insert_data->otp_created_at = date('Y-m-d H:i:s', strtotime('+7 minutes'));

            $insert_data->province_id =  Province::where('key', $request->province)->first()->id;
            $insert_data->city =  $request->city;
            $insert_data->street =  $request->street;
            $insert_data->appartment_or_unit_number =  $request->input('appartment_or_unit_number');
            $insert_data->postal_code =  $request->input('postal_code');

            $insert_data->user_role_id = UserRole::where('key', 'labor')->first()->id;
            // $insert_data->tshirt_size_id = TshirtSize::where('key', $request->t_shirt_size)->first()->id;
            $insert_data->metropolitan_area_id = MetropolitanArea::where('key', $request->metropolitan_area)->first()->id;
            $insert_data->member_since =  Carbon::parse($current_time)->format('F Y');
            $insert_data->member_time =  Carbon::parse($current_time)->format('d F Y , h:iA');
            $insert_data->hear_about_id = $request->filled('hear_about_us') ? HearAbout::where('key', $request->hear_about_us)->first()->id : null;
            $insert_data->moves_each_week = $request->input('moves_each_week');
            $insert_data->able = $request->input('able');
            $insert_data->why_great_mover = $request->input('why_great_mover');
            $insert_data->mover_account_status_id = 2;
            $insert_data->fcm_token = $request->input('fcm_token');
            $insert_data->save();

            $fetch_user = User::where('id', $insert_data->id)->first();

            $token = $fetch_user->createToken('my-app-token')->plainTextToken;
            // $fetch_data['token'] = $token;
            $fetch_data['user_data'] = $fetch_user;
            $fetch_data['user_role'] = $fetch_user->userRole->key;
            $fetch_data['metropolitan_area'] = $fetch_user->metropolitanArea->key;
            $fetch_data['province'] = $fetch_user->province->key;
            $fetch_data['hear_about_us'] = $request->filled('hear_about_us') ? $fetch_user->hearAbout->key : null;
            $fetch_data['mover_account_status'] = $fetch_user->moverAccountStatus->value;
            // $fetch_data['tshirt_size'] = $fetch_user->tshirtSize->key;

            // Send email code

            $details = [
                'title' => 'Mail from mover404',
                'body' => 'Your OTP code is: ' . $otp . ' and valid for 2 minutes'
            ];

            Mail::to($request->email)->send(new VerificationMail($details));
            //

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Register Successfully"),
                "data" => $fetch_data,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $th->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function sendVerificationCode(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'email' => 'required|email',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            // Send email code
            $current_time = Carbon::now()->timestamp;
            $user = User::where('email', $request->email)->first();
            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "fail",
                    "message" => __("User Not Found"),
                    "data" => [],
                ], 404);
            }
            if ($user->mover_account_status_id > 3) {
                $fetch_data['user_data'] = User::where('email', $request->email)->first();
                return response()->json([
                    "code"      =>  200,
                    "response"  =>  "success",
                    "message"   =>  __("User Email Already verified"),
                    'data'      =>  $fetch_data
                ], 200);
            }
            $otp = rand(100000, 999999);
            $user->otp = $otp;
            $user->otp_created_at = date('Y-m-d H:i:s', strtotime('+7 minutes'));
            $user->save();

            $details = [
                'title' => 'Mail from mover404',
                'body' => 'Your OTP code is: ' . $otp . ' and valid for 2 minutes'
            ];

            Mail::to($request->email)->send(new VerificationMail($details));
            //

            $fetch_data = [];

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Verfication Code Sent Successfully"),
                "data" => $fetch_data,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $th->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function verify_otp(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make($data, [
                'code' => 'required|digits:6',
                'email' => 'required|email',
                'fcm_token' => 'nullable',
            ]);

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            } else {
                $current = date('Y-m-d H:i:s');
                $user_data = User::where('email', $request->email)->first();
                if ($user_data->mover_account_status_id > 3) {
                    $fetch_data['user_data'] = User::where('email', $request->email)->first();
                    return response()->json([
                        "code"      =>  200,
                        "response"  =>  "success",
                        "message"   =>  __("User Email Already verified"),
                        'data'      =>  $fetch_data
                    ], 200);
                } else if ($user_data->otp != $request->code) {
                    return response()->json([
                        "code"      =>  401,
                        "response"  =>  "error",
                        "message"   =>  __("OTP is not match"),

                    ], 401);
                } else {
                    if (strtotime($current) > strtotime($user_data->otp_created_at)) {
                        return response()->json([
                            "code"      =>  401,
                            "response"  =>  "error",
                            "message"   =>  __("Otp is expired"),

                        ], 401);
                    } else {
                        if ($request->code == $user_data->otp) {
                            if ($user_data->userRole->key == 'user') {
                                $user_data->mover_account_status_id = MoverAccountStatus::where('key', 'ACCOUNT_APPROVED')->first()->id;
                            } else {
                                $user_data->mover_account_status_id = MoverAccountStatus::where('key', 'ADMIN_APPROVAL_PENDING')->first()->id;
                            }
                            $user_data->email_verified_at = date('Y-m-d H:i:s');
                            $user_data->fcm_token = $request->input('fcm_token');
                            $user_data->save();

                            $user =  User::where('email', $request->email)->first();
                            $token =  $user->createToken('my-app-token')->plainTextToken;
                            $fetch_data['token'] = $token;
                            $fetch_data['user_data'] = $user;
                            $fetch_data['user_role'] = $user->userRole->key;
                            $fetch_data['mover_account_status'] = $user->moverAccountStatus->value;

                            $response = [
                                "code" => 200,
                                "response" => "success",
                                "message" => __("Login Successfully"),
                                'data' => $fetch_data
                            ];

                            return response()->json($response, 200);
                        } else {
                            return response()->json([
                                "code"      =>  401,
                                "response"  =>  "error",
                                "message"   =>  __("Invalid OTP"),
                                "data"      =>  (object)array()
                            ], 401);
                        }
                    }
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

    public function login(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make(
            $data,
            [
                'email' => 'required|email',
                'password' => 'required',
                'fcm_token' => 'nullable',
            ]
        );
        if ($validator->fails()) {
            return validation_error($validator->messages()->all());
        }

        $user = User::where('email', $request->email)->first();

        if ($user == null) {
            return response([
                'code' => 401,
                "response"  =>  "error",
                'message' => 'User does not exist, please register',
                'data'      =>  [],
            ], 401);
        }

        $user->fcm_token = $request->input('fcm_token');
        $user->save();

        /**User email not verified */
        if ($user->mover_account_status_id < 3) {
            return response([
                'code' => 401,
                "response"  =>  "error",
                'message' => 'You email is not verified, please verify your email',
                'data' => [
                    'isVerified' => false,
                ],
            ], 401);
        }

        /**User email not approved by admin */
        if ($user->mover_account_status_id == 4) {
            return response([
                'code' => 401,
                "response"  =>  "error",
                'message' => 'You email is not approved, please contact admin',
                'data' => [
                    'isApproved' => false,
                ],
            ], 401);
        }

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response([
                'code' => 400,
                "response"  =>  "error",
                'message' => 'Email & Password does not match with our record.',
                'data' => [],
            ], 400);
        }

        return response([
            'data' => [
                'user' => $user,
                'token' => $user->createToken("my-app-token")->plainTextToken,
                'role' => $user->userRole->key,
                'mover_account_status' => $user->moverAccountStatus->value,
            ],
            'code' => 1,
            'message' => 'User Logged In Successfully',
        ]);
    }

    public function adminLogin(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make(
            $data,
            [
                'email' => 'required|email',
                'password' => 'required',
            ]
        );
        if ($validator->fails()) {
            return validation_error($validator->messages()->all());
        } else {
            $user = User::where('email', $request->email)->first();

            $user->fcm_token = $request->input('fcm_token');
            $user->save();

            if ($user == null) {
                return response([
                    'code' => 401,
                    "response"  =>  "error",
                    'message' => 'User does not exist, please register',
                    'data'      =>  [],
                ], 401);
            }

            if ($user->userRole->key != "admin") {
                return response([
                    'code' => 401,
                    "response"  =>  "error",
                    'message' => 'You email is not authorized to access this page, please contact support',
                    'data' => [
                        'role' => $user->userRole->key,
                    ],
                ], 401);
            }

            if (!$user->verfication) {
                return response([
                    'code' => 401,
                    "response"  =>  "error",
                    'message' => 'You email is not verified, please verify your email',
                    'data' => [
                        'isVerified' => false,
                    ],
                ], 401);
            }

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response([
                    'code' => 400,
                    "response"  =>  "error",
                    'message' => 'Email & Password does not match with our record.',
                    'data' => [],
                ], 400);
            }

            return response([
                'data' => [
                    'user' => $user,
                ],
                'code' => 1,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken("my-app-token")->plainTextToken,
                'role' => $user->userRole->key,
            ]);
        }
    }

    public function verifyToken()
    {
        try {
            $user = Auth::user();

            if ($user == null) {
                return response([
                    'code' => 401,
                    "response"  =>  "error",
                    'message' => 'User does not exist, please register',
                    'data'      =>  [],
                ], 401);
            }

            return response([
                'code' => 200,
                "response"  =>  "success",
                'message' => 'User verified successfully',
                'data'      =>  [
                    'user' => $user,
                    'role' => $user->userRole->key,
                    'mover_account_status' => $user->moverAccountStatus->value,
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $th->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function resend_otp(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'phone_number' => 'required',
                ]
            );
            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            } else {
                $user = User::where('phone_number', $request->phone_number)->first();
                //  $otp  = $user->phone_number=='9251666666' ? '1111' : rand(1000,9999);
                $otp = '1111';

                $mobile_number = $user->contact_code . $request->phone_number;
                // $send_otp = send_sms($otp, $mobile_number);
                $otp_time = date('Y-m-d H:i:s', strtotime('+7 minutes'));

                if (!empty($user)) {
                    $update_otp = User::where('id', $user->id)->update(['otp' => $otp, 'otp_created_at' => $otp_time]);
                    $user_id = [
                        'phone' => $user->phone_number
                    ];

                    return response()->json([
                        "code"      =>  200,
                        "response"  =>  "success",
                        "message"   =>  __("OTP Successfully send"),
                        "data"      =>   $user_id
                    ], 200);
                } else {

                    return response()->json([
                        "code"      =>  401,
                        "response"  =>  "error",
                        "message"   =>  __("Invalid User"),

                    ], 401);
                }
            }
        } catch (Exception $e) {

            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),

            ], 500);
        }
    }

    public function update_profile(Request $request)
    {
        try {
            $data = $request->all();
            if ($request->hasFile('avatar')) {
                $avatar = time() . '-' . Str::of(md5(time() . $request->file('avatar')->getClientOriginalName()))->substr(0, 50) . '.' . $request->file('avatar')->extension();
                $avatar_file = $request->file('avatar')->storeAs('public/uploads/User', $avatar);
                $avatar_name = str_replace('public/', '', $avatar_file);
                $data['avatar'] = $avatar_name;
            }
            $fetch_datas['user_info'] = User::where('id', auth()->user()->id)->update($data);
            $user = User::where('id', auth()->user()->id)->first();
            $fetch_data['user_info']  = $this->replaceNullwithEmptyString($user->toArray());

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Profile Successfully update"),
                "data" => $fetch_data,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function get_user_data()
    {
        try {
            $user = User::where('id', auth()->user()->id)->first();
            $car = Car::with('getCarDocument')->active()->where('user_id', auth()->user()->id)->get();
            $fetch_data['user_info']  = $this->replaceNullwithEmptyString($user->toArray());
            // $fetch= Userprofile::where('user_id',auth()->user()->id)->select('preferences')->first();
            // $fetch_data['user_info']['preferences'] = @$fetch->preferences;
            $fetch_data['car_info']  = $car;
            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Data Fetch Successfully"),
                "data" => $fetch_data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                'data'      =>  (object)array()
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

    public function logout(Request $request)
    {
        try {
            $user = Auth::user();
            $user = User::find($user->id);
            User::where('id', $user->id)->update(['fcm_token' => '']);
            $data = $user->tokens()->delete();
            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("User Logout Successfully")
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function update_mini_bio(Request $request)
    {
        try {
            $user = auth()->user();
            $data = $request->all();
            $validator = Validator::make($data, [
                'bio' => 'required',
            ], ['bio.required' => 'Bio Required']);

            if ($validator->fails()) {
                return validation_error($validator->message()->all());
            } else {

                $update = User::where('id', $user->id)->update(['bio' => $data['bio']]);
                return response()->json([
                    'code' => 200,
                    "response" => "success",
                    "message" => __("Bio Update Successfully")
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

    public function get_default_price()
    {
        try {
            $data = Settings::where('option_type', 'per_km')->first();
            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Default Price Per Kilometer"),
                "data" => $data->option_value,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function update_fcm(Request $request)
    {
        try {
            $user_id = auth()->user()->id;

            $data = array(
                'fcm_token' => $request->fcm_token,
                // 'device_id' => $request->device_id,
            );
            $update = User::where('id', $user_id)->update($data);
            return response()->json([
                "code"      =>  200,
                "response"  =>  "success",
                "message"   =>  __("Token Update successfully"),
                "data"      =>  (object)array()
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }

    public function getAllNotification()
    {
        try {
            $getNotifications = Notifications::where('user_id', auth()->user()->id)->select('id', 'title', 'Notification')->get();
            return response()->json([
                "code"      =>  200,
                "response"  =>  "success",
                "message"   =>  __("Notifications Fetch Successfully"),
                "data"      => $getNotifications,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "code"      =>  500,
                "response"  =>  "error",
                "message"   =>  $e->getMessage(),
                "data"      =>  (object)array()
            ], 500);
        }
    }


    public function deleteNotification(Request $request)
    {
        try {
            $getNotifications = Notifications::where(['user_id' => auth()->user()->id, 'id' => $request->id])->delete();
            return response()->json([
                "code"      =>  200,
                "response"  =>  "success",
                "message"   =>  __("Notification delete Successfully"),
                "data"      => (object)array(),
            ], 200);
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
