<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Carbon\Carbon;
use App\Models\User;
use Toastr;
use Auth;
use Illuminate\Support\Str;
use DB;
use Mail;
use App\Models\{PasswordReset, Rides, Locations, Settings};
use Hash;
use Storage;

class AuthController extends Controller
{
    //
    public function register()
    {
        if (!empty(Auth::user())) {
            //Toastr::error('Something Went worng', 'Error');
            return redirect()->back();
        } else {
            $logo = Settings::where('option_type', 'logo')->first();
            $favicon = Settings::where('option_type', 'favicon')->first();
            return view('admin.signup', compact('logo', 'favicon'));
        }
    }

    public function login()
    {
        if (!empty(Auth::user())) {
            //Toastr::error('Something Went worng', 'Error');
            return redirect()->back();
        } else {
            $logo = USER::where('user_role', '1')->first();
            return view('admin.login', compact('logo'));
        }
    }

    public function dashboard()
    {
        $user_count = USER::where('user_role_id', '3')->count();
        $rating_count = USER::where('user_role_id', '3')->sum('rating');
        $total_km  = Locations::orderBy('ride_id', 'DESC')->groupBy('ride_id')->where('status', '1')->get();
        $total_km  = $total_km->sum('distance');
        return view('admin.dashboard', compact('user_count', 'rating_count', 'total_km'));
    }

    public function login_admin(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ], [
            'email.required' => 'Email is required for login',
            'password.required' => 'Passwors is required',
        ]);

        $inputs = $request->input();
        $remember_me = $request->has('remember_me') ? true : false;

        if ($remember_me == false) {
            setcookie('email', $request->email, 100);
            setcookie('password', $request->password, 100);
        } else {
            setcookie('email', $request->email, time() + 60 * 60 * 24 * 100);
            setcookie('password', $request->password, time() + 60 * 60 * 24 * 100);
        }

        if (auth()->attempt(array('email' => $inputs['email'], 'password' => $inputs['password']))) {
            if (Auth::user() && Auth::user()->user_role == 1) {
                Toastr::success('Login Successfully', 'Success');
                return redirect('admin/dashboard');
            }
        } else {
            Toastr::error('Credentials Not Match', 'Error');
            return redirect()->back()->withInput($request->all());
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->flush();
        $request->session()->regenerate();
        return redirect()->guest(route('admin.login'));
    }

    public function forget_password()
    {
        $logo = USER::where('user_role', '1')->first();
        return view('admin/reset-password', compact('logo'));
    }

    public function send_reset_link(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
        ]);
        $input = $request->input();
        $token = Str::random(64);
        $user_exist = User::where('email', '=', $input['email'])->first();
        if (!empty($user_exist)) {
            $count_reset = DB::table('password_resets')->where('email', '=', $request->email)->count();
            if ($count_reset > 0) {
                DB::table('password_resets')->where('email', '=', $request->email)->update([
                    'token' => $token,
                    'created_at' => Carbon::now()
                ]);
            } else {
                DB::table('password_resets')->insert([
                    'email' => $request->email,
                    'token' => $token,
                    'created_at' => Carbon::now()
                ]);
            }

            Mail::send('emails.forgetPassword', ['token' => $token], function ($message) use ($request) {
                $message->to($request->email);
                $message->subject('Reset Password');
            });
            Toastr::success('Reset password link sent on your email id.', 'Success');
            return redirect()->back();
        }
    }

    public function recive_reset_link(Request $request, $code)
    {
        $logo = USER::where('user_role', '1')->first();
        return view('admin.change-password', compact('code', 'logo'));
    }

    public function submit_new_password(Request $request)
    {
        $request->validate(
            [
                'password' => 'required|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,;:”+]).{8,}$/',
                'confirm_password' => 'required|same:password',
            ],
            [
                'password.required' => 'Please enter password',
                'password.regex' => 'Password must be at least eight or more characters and have at least one upper letter and one lower letter and one number and special character.',
                'confirm_password.required' => 'Please enter confirm password',
            ]
        );

        $CheckToken = DB::table('password_resets')->where('token', $request->reset_token)->first();
        if (!empty($CheckToken)) {
            $input = $request->input();
            $data = [
                'password' => Hash::make($input['password'])
            ];
            $ResetPassword = User::where('email', '=', $CheckToken->email)->update($data);

            if (!empty($ResetPassword)) {
                DB::table('password_resets')->where('email', $CheckToken->email)->delete();
                Toastr::success('Password changed successfully. Please login using email and password', 'Success');
                return redirect('/admin')->withSuccess("Password changed successfully. Please login using email and password");
            } else {
                Toastr::error('Unsuccess reset password!', 'Error');
                $arr[] = "Unsuccess reset password!";
                return redirect()->back()->withInput($request->all())->withErrors($arr);
            }
        } else {
            Toastr::error('Please Try again with new reset link', 'Error');
            return redirect('/admin')->withError("Please Try again with new reset link");
        }
    }


    public function admin_profile()
    {
        $user_info = USER::WHERE('id', '=', Auth::user()->id)->first();
        return view('admin.profile.admin-profile', compact('user_info'));
    }

    public function admin_profile_setting()
    {
        return view('admin.profile.profile-setting');
    }

    public function update_profile(Request $request)
    {
        $request->validate([
            'first_name'  => 'required',
            'last_name'   => 'required',
            'address'    => 'required',
            'dob'        => 'required',
            'phone_number' => 'required|numeric|digits_between:6,14',
            'gender' => 'required',
        ], [
            'phone_number.required' => 'Phone number is required',
            'first_name.required' => 'First Name is required',
            'last_name.required' => 'Last Name is required',
            'gender.required' => 'Gender is required',
            'address.required' => 'Address is required',
            'dob.required' => 'Date of birth is required',
        ]);

        if (!empty($request->password)) {
            $request->validate(
                [
                    'password' => 'required|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.,;:”+]).{8,}$/',
                    'new_password' => 'required|same:password',
                ],
                [
                    'password.required' => 'Please enter password',
                    'password.regex' => 'Password must be at least eight or more characters and have at least one upper letter and one lower letter and one number and special character.',
                    'new_password.required' => 'Please enter confirm password',

                ]
            );
        }

        $inputs = $request->input();

        if ($_FILES['avatar']['name'] != '') {
            if (!empty(Auth::user()->avatar)) {
                Storage::disk('local')->delete('public/' . Auth::user()->avatar);
            }
            $avatar = time() . '-' . Str::of(md5(time() . $request->file('avatar')->getClientOriginalName()))->substr(0, 50) . '.' . $request->file('avatar')->extension();
            $avatar_image = $request->file('avatar')->storeAs('public/uploads/User', $avatar);
            $avatar_name = str_replace('public/', '', $avatar_image);
        }

        if (!empty($avatar_name)) {
            $avatar_name = $avatar_name;
        } else {
            $avatar_name = Auth::user()->avatar;
        }

        if (!empty($request->password)) {
            $password = Hash::make($request->password);
        } else {
            $password = Auth::user()->password;
        }

        $data = array(
            'dob'        => $inputs['dob'],
            'address'    => $inputs['address'],
            'first_name' => $inputs['first_name'],
            'last_name' => $inputs['last_name'],
            'phone_number' => $inputs['phone_number'],
            'gender' => $inputs['gender'],
            'avatar' => $avatar_name,
            'password' => $password,
        );

        $user_update = User::where('id', '=', Auth::user()->id)->update($data);
        if (!empty($user_update) && empty($inputs['new_password'])) {
            Toastr::success('Data Updated Successfully', 'Success');
            return redirect()->back();
        } else if (!empty($user_update) && !empty($inputs['new_password'])) {
            Auth::guard('web')->logout();
            $request->session()->flush();
            $request->session()->regenerate();

            Toastr::success('Password and profile updated successfully. Please login using email and new password', 'Success');
            return redirect('/admin');
        } else {
            Toastr::success('Something Went Wrong', 'Success');
            return redirect()->back();
        }
    }

    public function test()
    {
        return view('admin.test');
    }
}
