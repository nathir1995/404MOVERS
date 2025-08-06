<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Throwable;
use Illuminate\Support\Str;

class AdminSettingController extends Controller
{
    public function index()
    {
        try {
            $settings = Settings::query();
            $settings = $settings->get();

            $fetch_data['settings'] = $settings;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Admin Settings fetched successfully"),
                "data" => $fetch_data,
            ], 200);
        } catch (Throwable $th) {
            return response()->json([
                "code" => 500,
                "response" => "error",
                "message" => $th->getMessage(),
                "data" => (object)array()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'option_name' => 'required|string|unique:setting,option_name',
                    'option_type' => 'nullable|string',
                    'option_value' => 'required',
                    'status' => 'nullable|numeric|in:0,1',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $auth_user = Auth::user();
            $user = User::query();
            $user = $user->find($auth_user->id);

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            $option_type = Str::snake($request->option_name);

            $insert_data = new Settings();
            $insert_data->option_name = $request->option_name;
            $insert_data->option_type = $option_type;
            $insert_data->option_value = $request->input('option_value');
            $insert_data->status = $request->input('status', 1);
            $insert_data->save();

            $fetch_setting = Settings::query();
            $fetch_setting = $fetch_setting->where('id', $insert_data->id)->first();

            $fetch_data['setting_data'] = $fetch_setting;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("New Setting created successfully"),
                "data" => $fetch_data,
            ], 200);
        } catch (Throwable $th) {
            return response()->json([
                "code" => 500,
                "response" => "error",
                "message" => $th->getMessage(),
                "data" => (object)array()
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'options' => 'required|array',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $auth_user = Auth::user();
            $user = User::query();
            $user = $user->find($auth_user->id);

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            foreach ($request->options as $option) {
                $option_id = $option['id'];
                $option_name = $option['option_name'];
                $option_type = Str::snake($option_name);
                $option_value = $option['option_value'];
                $status = $option['status'];
                $setting = Settings::query();
                $setting = $setting->where('id', $option_id)->first();
                if ($setting) {
                    $setting->option_type = $option_type;
                    $setting->option_value = $option_value;
                    $setting->status = $status;
                    $setting->save();
                }
            }

            $fetch_settings = Settings::query();
            $fetch_settings = $fetch_settings->get();

            $fetch_data['settings_data'] = $fetch_settings;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Settings Updated successfully"),
                "data" => $fetch_data,
            ], 200);
        } catch (Throwable $th) {
            return response()->json([
                "code" => 500,
                "response" => "error",
                "message" => $th->getMessage(),
                "data" => (object)array()
            ], 500);
        }
    }

    public function delete(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'option_id' => 'required|numeric',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $auth_user = Auth::user();
            $user = User::query();
            $user = $user->find($auth_user->id);

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }


            $setting = Settings::query();
            $setting = $setting->where('id', $request->option_id)->first();
            if ($setting) {
                $setting->delete();
            }

            $fetch_settings = Settings::query();
            $fetch_settings = $fetch_settings->get();

            $fetch_data['settings_data'] = $fetch_settings;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Setting Deleted successfully"),
                "data" => $fetch_data,
            ], 200);
        } catch (Throwable $th) {
            return response()->json([
                "code" => 500,
                "response" => "error",
                "message" => $th->getMessage(),
                "data" => (object)array()
            ], 500);
        }
    }
}
