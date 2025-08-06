<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MovePackage;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Throwable;

class MovePackageController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $move_packages = MovePackage::query();
            $move_packages = $move_packages->get();

            $fetch_data['move_packages'] = $move_packages;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move Package list"),
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

    public function get(Request $request): JsonResponse
    {
        try {
            $data = $request->all();
            $validator = Validator::make($data, [
                'package_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }
            $move_package = MovePackage::query();
            $move_package = $move_package->where('id', $request->package_id)->first();

            $fetch_data['move_package'] = $move_package;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move Package retrieved successfully"),
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

    public function store(Request $request): JsonResponse
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'name' => 'required|string',
                    'description' => 'nullable|string',
                    'price' => 'nullable|numeric',
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

            $insert_data = new MovePackage();
            $insert_data->name = $request->name;
            $insert_data->description = $request->input('description');
            $insert_data->price = $request->input('price');
            $insert_data->save();

            $fetch_move = MovePackage::query();
            $fetch_move = $fetch_move->where('id', $insert_data->id)->first();

            $fetch_data['move_data'] = $fetch_move;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move Package created successfully"),
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

    public function update(Request $request): JsonResponse
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'package_id' => 'required|integer',
                    'name' => 'nullable|string',
                    'description' => 'nullable|string',
                    'price' => 'nullable|numeric',
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

            $insert_data = MovePackage::query();
            $insert_data = $insert_data->where('id', $request->package_id)->first();

            $insert_data->name = $request->name;
            $insert_data->description = $request->input('description');
            $insert_data->price = $request->input('price');
            $insert_data->save();

            $fetch_move = MovePackage::query();
            $fetch_move = $fetch_move->where('id', $insert_data->id)->first();

            $fetch_data['move_data'] = $fetch_move;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move Package created successfully"),
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

    public function delete(Request $request): JsonResponse
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'package_id' => 'required|integer'
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

            $insert_data = MovePackage::query();
            $insert_data = $insert_data->where('id', $request->package_id);
            $insert_data->delete();

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move Package created successfully"),
                "data" => (object)array(),
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
