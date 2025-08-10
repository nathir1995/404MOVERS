<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserDeletionController extends Controller
{
    public function delete(Request $request)
    {
        try {
            $authUser = $request->user();
            // Ensure the authenticated user is an admin
            if (!$authUser || $authUser->userRole->key !== 'admin') {
                return response()->json([
                    "code" => 401,
                    "response" => "error",
                    "message" => __("Unauthorized"),
                    "data" => [],
                ], 401);
            }

            // Validate the request
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|integer|exists:users,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "code" => 400,
                    "response" => "error",
                    "message" => $validator->errors()->first(),
                    "data" => [],
                ], 400);
            }

            $user = User::find($request->user_id);

            // Prevent deletion of admin accounts
            if ($user->userRole->key === 'admin') {
                return response()->json([
                    "code" => 403,
                    "response" => "error",
                    "message" => __("Cannot delete admin users"),
                    "data" => [],
                ], 403);
            }

            // Delete the user
            $user->delete();

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("User deleted successfully"),
                "data" => [],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "code" => 500,
                "response" => "error",
                "message" => $th->getMessage(),
                "data" => (object) [],
            ], 500);
        }
    }
}
