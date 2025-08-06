<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\VerificationMail;
use App\Models\Enquiry;
use App\Models\MoverAccountStatus;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AdminDashboardController extends Controller
{
    /** User Register */
    public function users(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'page' => 'integer',
                    'per_page' => 'integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user_role_id = UserRole::where('key', 'user')->first()->id;
            $per_page = $request->input('per_page', 10);
            $fetch_users = User::where('user_role_id', $user_role_id);

            if ($request->filled('search')) {
                $search = $request->input('search');
                $fetch_users = users_search($fetch_users, $search);
            }

            $fetch_users = $fetch_users->where('user_role_id', $user_role_id);

            $fetch_data['users_data'] = $fetch_users->with([
                'userRole',
                'metropolitanArea',
                'province',
                'hearAbout',
                'moverAccountStatus'
            ])->paginate($per_page);

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("User list"),
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

    public function user(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'user_id' => 'required|integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user_role_id = UserRole::where('key', 'user')->first()->id;
            $fetch_user = User::where('id', $data['user_id'])
                ->where('user_role_id', $user_role_id)
                ->with(['userRole', 'metropolitanArea', 'province', 'hearAbout', 'moverAccountStatus'])
                ->first();

            if ($fetch_user == null) {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __("User Not Found"),
                    "data" => [],
                ], 200);
            }
            $fetch_user->getMedia("*");
            $fetch_data['users_data'] = $fetch_user;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("User Retrieved Successfully"),
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

    public function exempt_user(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'user_id' => 'required|integer',
                    'is_exempt' => 'required|boolean'
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user_role_id = UserRole::where('key', 'user')->first()->id;
            $fetch_user = User::where('id', $data['user_id'])
                ->where('user_role_id', $user_role_id)
                ->with(['userRole', 'metropolitanArea', 'province', 'hearAbout', 'moverAccountStatus'])
                ->first();

            if ($fetch_user == null) {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __("User Not Found"),
                    "data" => [],
                ], 200);
            }
            $fetch_user->getMedia("*");
            $fetch_user->payment_exempt = $request->input('is_exempt', false);
            $fetch_user->save();
            $fetch_data['users_data'] = $fetch_user;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("User Retrieved Successfully"),
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

    public function drivers(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'page' => 'integer',
                    'per_page' => 'integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user_role_id = UserRole::where('key', 'driver')->first()->id;
            $per_page = $request->input('per_page', 10);
            $fetch_users = User::where('user_role_id', $user_role_id);

            if ($request->filled('status')) {
                $status_id = MoverAccountStatus::where('key', $request->input('status'))->first()->id;
                $fetch_users = $fetch_users->where('mover_account_status_id', $status_id);
            }

            if ($request->filled('search')) {
                $search = $request->input('search');
                $fetch_users = users_search($fetch_users, $search);
            }

            $fetch_users = $fetch_users->where('user_role_id', $user_role_id);

            $fetch_data['users_data'] = $fetch_users->with([
                'userRole',
                'metropolitanArea',
                'province',
                'hearAbout',
                'moverAccountStatus'
            ])
                ->paginate($per_page);

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Driver list"),
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

    public function driver(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'driver_id' => 'required|integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user_role_id = UserRole::where('key', 'driver')->first()->id;
            $fetch_user = User::where('id', $data['driver_id'])
                ->where('user_role_id', $user_role_id)
                ->with([
                    'userRole',
                    'metropolitanArea',
                    'province',
                    'hearAbout',
                    'moverAccountStatus',
                    'getCarUser',
                    'getCarUser.vehicleType'
                ])
                ->first();

            if ($fetch_user == null) {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __("Driver Not Found"),
                    "data" => [],
                ], 200);
            }
            $fetch_user->getMedia("*");
            $fetch_data['users_data'] = $fetch_user;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Driver Retrieved Successfully"),
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

    public function labors(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'page' => 'integer',
                    'per_page' => 'integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user_role_id = UserRole::where('key', 'labor')->first()->id;
            $per_page = $request->input('per_page', 10);
            $fetch_users = User::where('user_role_id', $user_role_id);

            if ($request->filled('status')) {
                $status_id = MoverAccountStatus::where('key', $request->input('status'))->first()->id;
                $fetch_users = $fetch_users->where('mover_account_status_id', $status_id);
            }

            if ($request->filled('search')) {
                $search = $request->input('search');
                $fetch_users = users_search($fetch_users, $search);
            }

            $fetch_users = $fetch_users->where('user_role_id', $user_role_id);

            $fetch_data['users_data'] = $fetch_users->with([
                'userRole',
                'metropolitanArea',
                'province',
                'hearAbout',
                'moverAccountStatus'
            ])
                ->paginate($per_page);

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Labor list"),
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

    public function labor(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'labor_id' => 'required|integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user_role_id = UserRole::where('key', 'labor')->first()->id;
            $fetch_user = User::where('id', $data['labor_id'])
                ->where('user_role_id', $user_role_id)
                ->with(['userRole', 'metropolitanArea', 'province', 'hearAbout', 'moverAccountStatus'])
                ->first();

            if ($fetch_user == null) {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __("Labor Not Found"),
                    "data" => [],
                ], 200);
            }
            $fetch_user->getMedia("*");
            $fetch_data['users_data'] = $fetch_user;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Labor Retrieved Successfully"),
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

    public function movers(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'page' => 'integer',
                    'per_page' => 'integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $labor_role_id = UserRole::where('key', 'labor')->first()->id;
            $driver_role_id = UserRole::where('key', 'driver')->first()->id;
            $per_page = $request->input('per_page', 10);
            $fetch_users = User::query();

            if ($request->filled('status')) {
                $status_id = MoverAccountStatus::where('key', $request->input('status'))->first()->id;
                $fetch_users = $fetch_users->where('mover_account_status_id', $status_id);
            }

            if ($request->filled('search')) {
                $search = $request->input('search');
                $fetch_users = users_search($fetch_users, $search);
            }

            $fetch_users = $fetch_users->where('user_role_id', $labor_role_id)->orWhere('user_role_id', $driver_role_id);

            $fetch_data['users_data'] = $fetch_users->with([
                'userRole',
                'metropolitanArea',
                'province',
                'hearAbout',
                'moverAccountStatus'
            ])
                ->paginate($per_page);

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Mover list"),
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

    public function rejectAccount(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'mover_id' => 'required|integer',
                    'reason' => 'required',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            // $user_role_id = UserRole::where('key', 'labor')->first()->id;
            // $fetch_user = User::where('id', $data['labor_id'])
            //     ->where('user_role_id', $user_role_id)
            //     ->with(['userRole', 'metropolitanArea', 'province', 'hearAbout', 'moverAccountStatus'])
            //     ->first();

            $fetch_user = User::find($data['mover_id']);

            if ($fetch_user == null) {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __("Labor Not Found"),
                    "data" => [],
                ], 401);
            }

            // $fetch_user->getMedia("*");
            // if the fetch_user is ADMIN_APPROVAL_PENDING or DOCUMENTS_APPROVAL_PENDING change the status to ACCOUT_REJECTED
            if ($fetch_user->moverAccountStatus->key == 'ADMIN_APPROVAL_PENDING' || $fetch_user->moverAccountStatus->key == 'DOCUMENTS_APPROVAL_PENDING') {
                $fetch_user->mover_account_status_id = MoverAccountStatus::where('key', 'ACCOUNT_REJECTED')->first()->id;
                $fetch_user->save();
                $enquiry = new Enquiry();
                $enquiry->user_id = $fetch_user->id;
                $enquiry->enquiry = $data['reason'];
                $enquiry->status = 1; //New
                $enquiry->save();
            } else {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __($fetch_user->moverAccountStatus->value),
                    "data" => [],
                ], 401);
            }

            $fetch_data['users_data'] = $fetch_user;
            $fetch_data['reason'] = $enquiry;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Account Rejected Successfully"),
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

    public function approveAccountAndRequestDocuments(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'mover_id' => 'required|integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            // $user_role_id = UserRole::where('key', 'labor')->first()->id;
            // $fetch_user = User::where('id', $data['labor_id'])
            //     ->where('user_role_id', $user_role_id)
            //     ->with(['userRole', 'metropolitanArea', 'province', 'hearAbout', 'moverAccountStatus'])
            //     ->first();

            $fetch_user = User::find($data['mover_id']);

            if ($fetch_user == null) {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __("Labor Not Found"),
                    "data" => [],
                ], 401);
            }

            // $fetch_user->getMedia("*");
            // if the fetch_user is ADMIN_APPROVAL_PENDING or DOCUMENTS_APPROVAL_PENDING change the status to ACCOUT_REJECTED
            if ($fetch_user->moverAccountStatus->key == 'ADMIN_APPROVAL_PENDING') {
                $fetch_user->mover_account_status_id = MoverAccountStatus::where('key', 'DOCUMENTS_UPLOAD_PENDING')->first()->id;
                $fetch_user->save();
                // Send email code
                // if the fetch_user is labor
                if ($fetch_user->user_role_id == UserRole::where('key', 'labor')->first()->id) {
                    $url = route('labor-upload-documents');
                } elseif ($fetch_user->user_role_id == UserRole::where('key', 'driver')->first()->id) {
                    $url = route('driver-upload-documents');
                }
                $details = [
                    'title' => 'Congrats! you have been approved in the 404Movers application',
                    'body' => 'Congrats! you have been approved in the 404Movers application, please upload the required documents in the following link to complete your registration ' . $url . '?mover_id=' . $fetch_user->id,
                ];

                Mail::to($fetch_user->email)->send(new VerificationMail($details));
                //
            } else {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __($fetch_user->moverAccountStatus->value),
                    "data" => [],
                ], 401);
            }

            $fetch_data['users_data'] = User::find($data['mover_id']);
            $fetch_data['email_details'] = $details;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Account Documents Requested Successfully"),
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

    public function rejectDocumentsAndRequestReupload(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'mover_id' => 'required|integer',
                    'reason' => 'required',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            // $user_role_id = UserRole::where('key', 'labor')->first()->id;
            // $fetch_user = User::where('id', $data['labor_id'])
            //     ->where('user_role_id', $user_role_id)
            //     ->with(['userRole', 'metropolitanArea', 'province', 'hearAbout', 'moverAccountStatus'])
            //     ->first();

            $fetch_user = User::find($data['mover_id']);

            if ($fetch_user == null) {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __("Labor Not Found"),
                    "data" => [],
                ], 401);
            }

            // $fetch_user->getMedia("*");
            // if the fetch_user is ADMIN_APPROVAL_PENDING or DOCUMENTS_APPROVAL_PENDING change the status to ACCOUT_REJECTED
            if ($fetch_user->moverAccountStatus->key == 'DOCUMENTS_UPLOAD_PENDING' || $fetch_user->moverAccountStatus->key == 'DOCUMENTS_REVIEW_PENDING') {
                $fetch_user->mover_account_status_id = MoverAccountStatus::where('key', 'DOCUMENTS_REJECTED')->first()->id;
                $fetch_user->save();
                $enquiry = new Enquiry();
                $enquiry->user_id = $fetch_user->id;
                $enquiry->enquiry = $data['reason'];
                $enquiry->status = 1; //New
                $enquiry->save();
            } else {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __($fetch_user->moverAccountStatus->value),
                    "data" => [],
                ], 401);
            }

            // Send email code
            // if the fetch_user is labor
            if ($fetch_user->user_role_id == UserRole::where('key', 'labor')->first()->id) {
                $url = route('labor-upload-documents');
            } elseif ($fetch_user->user_role_id == UserRole::where('key', 'driver')->first()->id) {
                $url = route('driver-upload-documents');
            }
            $details = [
                'title' => 'Documents Rejected in the 404Movers application',
                'body' => 'Documents Rejected in the 404Movers application, the following reason was given: ' . $data['reason'] . ', please upload the required documents in the following link to complete your registration ' . $url . '?mover_id=' . $fetch_user->id,
            ];

            Mail::to($fetch_user->email)->send(new VerificationMail($details));
            //

            $fetch_data['users_data'] = User::find($data['mover_id']);
            $fetch_data['email_details'] = $details;
            $fetch_data['reason'] = $enquiry;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Documents Rejected Successfully"),
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

    public function approveDocuments(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'mover_id' => 'required|integer'
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $fetch_user = User::find($data['mover_id']);

            if ($fetch_user == null) {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __("Labor Not Found"),
                    "data" => [],
                ], 401);
            }
            // if the fetch_user is ADMIN_APPROVAL_PENDING or DOCUMENTS_APPROVAL_PENDING change the status to ACCOUT_REJECTED
            if ($fetch_user->moverAccountStatus->key == 'DOCUMENTS_UPLOAD_PENDING' || $fetch_user->moverAccountStatus->key == 'DOCUMENTS_REVIEW_PENDING') {
                $fetch_user->mover_account_status_id = MoverAccountStatus::where('key', 'DOCUMENTS_APPROVED')->first()->id;
                $fetch_user->save();
            } else {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __($fetch_user->moverAccountStatus->value),
                    "data" => [],
                ], 401);
            }

            // Send email code
            // if the fetch_user is labor
            $details = [
                'title' => 'Thank you for registering in 404Movers',
                'body' => 'Thank you for registering in 404Movers, Your Documents has been approved, you can log in to your account and start moving!',
            ];

            Mail::to($fetch_user->email)->send(new VerificationMail($details));
            //

            $fetch_data['users_data'] = User::find($data['mover_id']);
            $fetch_data['email_details'] = $details;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Documents Approved Successfully"),
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
}
