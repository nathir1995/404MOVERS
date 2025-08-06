<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Notifications;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make(
            $data,
            [
                'per_page' => 'nullable|integer',
                'page' => 'nullable|integer',
            ]
        );

        if ($validator->fails()) {
            return validation_error($validator->messages()->all());
        }

        $per_page = $request->input('per_page', 10);

        $notifications = Notifications::query()
            ->where('user_id', auth()->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate($per_page);

        $notification_number = Notifications::query()
            ->where('user_id', auth()->user()->id)
            ->where('read', 0)
            ->count();

        $fetch_data['notifications'] = $notifications;
        $fetch_data['notification_number'] = $notification_number;

        return response()->json([
            "code" => 200,
            "response" => "success",
            "message" => __("Notifications Retrieved Successfully"),
            "data" => $fetch_data,
        ], 200);
    }

    public function read(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'notification_id' => 'required|integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $notification = Notifications::query()
                ->where('id', $data['notification_id'])
                ->where('user_id', auth()->user()->id)
                ->first();

            if (!$notification) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("Notification not found"),
                    "data" => (object)array()
                ], 404);
            }

            $notification->read = 1;
            $notification->save();

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Notification read successfully"),
                "data" => $notification,
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

    public function delete(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'notification_id' => 'required|integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $notification = Notifications::query()
                ->where('id', $data['notification_id'])
                ->where('user_id', auth()->user()->id)
                ->first();

            if (!$notification) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("Notification not found"),
                    "data" => (object)array()
                ], 404);
            }

            $notification->delete();

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Notification deleted successfully"),
                "data" => (object)array()
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
