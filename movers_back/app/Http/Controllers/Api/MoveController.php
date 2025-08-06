<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use App\Models\Move;
use App\Models\MovePackage;
use App\Models\MoveStatus;
use App\Models\Settings;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Throwable;

class MoveController extends Controller
{
    public function createMove(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'move_package_id' => 'required|integer',
                    'start_lat' => 'required',
                    'start_lang' => 'required',
                    'end_lat' => 'required',
                    'end_lang' => 'required',
                    'start_point_name' => 'nullable',
                    'end_point_name' => 'nullable',
                    'start_building_number' => 'nullable',
                    'start_apartment_number' => 'nullable',
                    'end_building_number' => 'nullable',
                    'end_apartment_number' => 'nullable',
                    'move_date_time' => 'required|date',
                    'instruction' => 'nullable',
                    'item_ids' => 'required|array',
                ]
            );

































            
            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $move_package = MovePackage::query();
            $move_package = $move_package->find($request->move_package_id);

            if ($move_package == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("Move Package not found"),
                    "data" => [],
                ], 404);
            }

            /**Calculate Expected Price **********************/
            $base_fee = $move_package->base_fee;
            $km_rate = $move_package->km_rate;
            $labor_rate = $move_package->labor_rate;
            $gst_percentage = Settings::where('option_type', 'g_s_t_percentage(%)')->first()->option_value ?? 0;
            $distance_time_data = get_distance_time($request->end_lat, $request->end_lang, $request->start_lat, $request->start_lang);
            // $distance = $distance_time_data['rows'][0]['elements'][0]['distance']['value'];
            $distance = 1000;
            $distance = $distance / 1000;
            // $time = $distance_time_data['rows'][0]['elements'][0]['duration']['value'];
            $time = 60;
            $time = $time / 60;
            $expected_price = $base_fee + ($km_rate * $distance) + ($labor_rate * $time);
            if ($gst_percentage > 0) {
                $expected_price = $expected_price + ($expected_price * ($gst_percentage / 100));
            }
            /**End of Calculate Expected Price **********************/

            $move_status_id = MoveStatus::where('key', 'DRAFT')->first()->id;

            $insert_data = new Move();

            if (auth('sanctum')->check()) {
                $user = auth('sanctum')->user();

                if ($user == null) {
                    return response()->json([
                        "code" => 404,
                        "response" => "error",
                        "message" => __("User not found"),
                        "data" => [],
                    ], 404);
                }

                if ($user->payment_exempt) {
                    $move_status_id = MoveStatus::where('key', 'PENDING')->first()->id;
                }

                $insert_data->user_id = $user->id;
            } else {
                $guest = new Guest();
                $guest->first_name = $request->first_name;
                $guest->last_name = $request->last_name;
                $guest->email = $request->email;
                $guest->fcm_token = $request->input('fcm_token');
                $guest->phone_number = $request->phone;
                $guest->address = $request->address;
                $guest->save();

                $insert_data->guest_id = $guest->id;
            }

            $insert_data->move_package_id = $move_package->id;
            $insert_data->start_point_name = $request->input('start_point_name');
            $insert_data->start_lat = $request->start_lat;
            $insert_data->start_lang = $request->start_lang;
            $insert_data->end_point_name = $request->input('end_point_name');
            $insert_data->end_lat = $request->end_lat;
            $insert_data->end_lang = $request->end_lang;
            $insert_data->start_building_number = $request->input('start_building_number');
            $insert_data->start_apartment_number = $request->input('start_apartment_number');
            $insert_data->end_building_number = $request->input('end_building_number');
            $insert_data->end_apartment_number = $request->input('end_apartment_number');
            $insert_data->move_date_time = Carbon::parse(strtotime($request->move_date_time))->format('Y-m-d H:i:s');
            $insert_data->move_status_id = $move_status_id;

            // Set default values for drivers and laborers based on move package
            $insert_data->number_of_drivers = $move_package->default_drivers ?? 1;
            $insert_data->number_of_labors = $move_package->default_laborers ?? 2;
            $insert_data->remaining_number_of_drivers = $insert_data->number_of_drivers;
            $insert_data->remaining_number_of_labors = $insert_data->number_of_labors;

            $insert_data->instruction = $request->input('instruction');
            $insert_data->expected_price = $expected_price;
            $insert_data->save();

            $item_ids = $request->item_ids;
            foreach ($item_ids as $item_id) {
                $insert_data->items()->attach($item_id['id'], ['quantity' => $item_id['quantity']]);
            }

            $fetch_move = Move::where('id', $insert_data->id)
                ->with(['items.itemCategory', 'user', 'guest', 'movePackage', 'moveStatus'])
                ->first();

            $fetch_data['move_data'] = $fetch_move;
            $fetch_data['move_distance'] = $distance;
            $fetch_data['move_time'] = $time;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move created successfully"),
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

    public function getMoves(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'page' => 'integer|nullable',
                    'per_page' => 'integer|nullable',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $per_page = $request->input('per_page', 10);
            $user = Auth::user();
            $user = User::where('id', $user->id)->first();
            $moves = Move::query();

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            if ($user->userRole->key == 'user') {
                $moves->where('user_id', $user->id);
            }

            if ($user->userRole->key == 'driver') {
                $moves = Move::where('move_status_id', MoveStatus::where('key', 'PENDING')->first()->id);
            }

            if ($user->userRole->key == 'labor') {
                $moves = Move::where('move_status_id', MoveStatus::where('key', 'PENDING')->first()->id);
            }

            $moves = $moves
                ->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus', 'movers.userRole'])
                ->orderBy('created_at', 'desc')
                ->paginate($per_page);

            $fetch_data['moves'] = $moves;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move list"),
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

    public function myMoves(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'page' => 'integer|nullable',
                    'per_page' => 'integer|nullable',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $per_page = $request->input('per_page', 10);
            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            $moves = $user->moversMoves()
                ->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus', 'movers.userRole'])
                ->orderBy('created_at', 'desc')
                ->paginate($per_page);

            $fetch_data['moves'] = $moves;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move list"),
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

    public function upcomingMoves(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'page' => 'integer|nullable',
                    'per_page' => 'integer|nullable',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $per_page = $request->input('per_page', 10);
            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            $moves = Move::query()->where('move_status_id', MoveStatus::where('key', 'PENDING')->first()->id)
                ->orWhere('move_status_id', MoveStatus::where('key', 'ONGOING')->first()->id);

            if ($user->userRole->key == 'user') {
                $moves->where('user_id', $user->id);
            }

            if ($user->userRole->key == 'driver') {
                $move_ids = $user->moversMoves()->pluck('move_id')->toArray();
                $moves->where('remaining_number_of_drivers', '>', 0)
                    ->whereNotIn('id', $move_ids);
            }

            if ($user->userRole->key == 'labor') {
                $move_ids = $user->moversMoves()->pluck('move_id')->toArray();
                $moves->where('remaining_number_of_labors', '>', 0)
                    ->whereNotIn('id', $move_ids);
            }

            $moves = $moves->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus', 'movers.userRole'])
                ->orderBy('created_at', 'desc')
                ->paginate($per_page);

            $fetch_data['moves'] = $moves;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Upcoming Moves list"),
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

    public function pastMoves(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'page' => 'integer|nullable',
                    'per_page' => 'integer|nullable',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $per_page = $request->input('per_page', 10);
            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            $moves = Move::query()->where('move_status_id', MoveStatus::where('key', 'DONE')->first()->id);

            if ($user->userRole->key == 'user') {
                $moves->where('user_id', $user->id);
            }

            if ($user->userRole->key == 'driver') {
                $moves->where('user_id', $user->id);
            }

            if ($user->userRole->key == 'labor') {
                $moves->where('user_id', $user->id);
            }

            $fetch_data['moves'] = $moves->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus'])
                ->orderBy('created_at', 'desc')
                ->paginate($per_page);

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Past Moves list"),
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

    public function draftMoves(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'page' => 'integer|nullable',
                    'per_page' => 'integer|nullable',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $per_page = $request->input('per_page', 10);
            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            if ($user->userRole->key != 'user') {
                return response()->json([
                    "code" => 400,
                    "response" => "error",
                    "message" => __("Not allowed to do this operation"),
                    "data" => [],
                ], 400);
            }

            if ($user->userRole->key == 'user') {
                $moves = Move::where('user_id', $user->id)
                    ->where('move_status_id', MoveStatus::where('key', 'DRAFT')->first()->id)
                    ->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus'])
                    ->orderBy('created_at', 'desc')
                    ->paginate($per_page);
            }

            $fetch_data['moves'] = $moves;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Draft Move list"),
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

    public function getMove(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'move_id' => 'required',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            $move = Move::query()->where('id', $request->move_id);

            if ($user->userRole->key == 'user') {
                $move->where('user_id', $user->id);
            }

            if ($user->userRole->key == 'driver') {
                $move->where('id', $request->move_id);
            }

            if ($user->userRole->key == 'labor') {
                $move->where('id', $request->move_id);
            }

            $move = $move->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus', 'movers.userRole'])
                ->first();

            $fetch_data['move-details'] = $move;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move details"),
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

    public function pay(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'amount' => 'required',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            $amount = $request->amount;
            $payment = $user->createSetupIntent();

            $fetch_data['payment_intent'] = $payment;
            $fetch_data['amount'] = $amount;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Payment Intent created successfully"),
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

    public function processPayment(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'amount' => 'required',
                    'payment_method' => 'required',
                    'move_id' => 'required',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user = Auth::user();
            $user = User::find($user->id);

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            $move = Move::find($request->move_id);

            if ($move == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("Move not found"),
                    "data" => [],
                ], 404);
            }

            $paymentMethod = $request->input('payment_method');
            $user->createOrGetStripeCustomer();
            $user->addPaymentMethod($paymentMethod);
            $amount = $request->amount * 100;

            $payment = $user->charge($amount, $paymentMethod);

            $fetch_data['payment_charge'] = $payment;
            $fetch_data['amount'] = $amount;

            $move->move_status_id = MoveStatus::where('key', 'PENDING')->first()->id;
            $move->save();

            $move = Move::where('id', $move->id)
                ->with(['items', 'items.itemCategory', 'user', 'movePackage', 'moveStatus'])
                ->first();

            $fetch_data['move'] = $move;

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Payment Charge created successfully"),
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

    public function acceptMove(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'move_id' => 'required',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("User not found"),
                    "data" => [],
                ], 404);
            }

            if ($user->userRole->key == 'user') {
                return response()->json([
                    "code" => 500,
                    "response" => "error",
                    "message" => __("You are not a authorized to accept a move"),
                    "data" => [],
                ], 500);
            }

            $move = Move::where('move_status_id', MoveStatus::where('key', 'PENDING')->first()->id)
                ->where('id', $request->move_id)
                ->first();

            if ($move == null) {
                return response()->json([
                    "code" => 404,
                    "response" => "error",
                    "message" => __("Move not found"),
                    "data" => [],
                ], 404);
            }

            if ($move->movers()->where('user_id', $user->id)->exists()) {
                return response()->json([
                    "code" => 500,
                    "response" => "error",
                    "message" => __("You have already accepted this move"),
                    "data" => [],
                ], 500);
            }

            if ($user->userRole->key == 'driver') {
                if ($move->remaining_number_of_drivers > 0) {
                    $move->remaining_number_of_drivers = $move->remaining_number_of_drivers - 1;
                    $move->save();
                    $move->movers()->syncWithoutDetaching($user->id);
                }
            }

            if ($user->userRole->key == 'labor') {
                if ($move->remaining_number_of_labors > 0) {
                    $move->remaining_number_of_labors = $move->remaining_number_of_labors - 1;
                    $move->save();
                    $move->movers()->syncWithoutDetaching($user->id);
                }
            }

            if ($move->remaining_number_of_labors == 0 && $move->remaining_number_of_drivers == 0) {
                $move->move_status_id = MoveStatus::where('key', 'ONGOING')->first()->id;
                $move->save();
            }

            //['items.itemCategory', 'user', 'movePackage', 'moveStatus', 'movers.userRole']

            $move = Move::where('id', $move->id)
                ->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus', 'movers.userRole'])
                ->first();

            $fetch_data['move-details'] = $move;

            $title = 'Move Accepted';
            $description = 'Move Accepted by ' . $user->first_name . ' ' . $user->last_name;
            $meta['type_id'] = $request->move_id;
            $meta['type'] = 'move';

            send_notification($move->user->id, $title, $description, $meta);
            send_notification(1, $title, $description, $meta);

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Move details"),
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

    public function startMove(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'move_id' => 'required',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return notfound_error();
            }

            $move = Move::where('id', $request->move_id)->first();

            if ($move == null) {
                return notfound_error();
            }

            if ($user->userRole->key == 'user') {
                $move->move_status_id = MoveStatus::where('key', 'STARTED')->first()->id;
                $move->save();
            }

            if ($user->userRole->key == 'driver') {
                $move->movers()->updateExistingPivot($user->id, ['is_started' => true, 'started_at' => now()]);
            }

            if ($user->userRole->key == 'labor') {
                $move->movers()->updateExistingPivot($user->id, ['is_started' => true, 'started_at' => now()]);
            }

            $move = Move::where('id', $move->id)
                ->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus', 'movers.userRole'])
                ->first();

            $fetch_data['move-details'] = $move;

            $title = 'Move Start';
            $description = 'Move Started by ' . $user->first_name . ' ' . $user->last_name;
            $meta['type_id'] = $move->id;
            $meta['type'] = 'move';
            $movers = $move->movers;

            send_notification($user->id, $title, $description, $meta);
            send_notification(1, $title, $description, $meta);

            foreach ($movers as $mover) {
                send_notification($mover->id, $title, $description, $meta);
            }

            return response()->json([
                "code" => Response::HTTP_OK,
                "response" => "success",
                "message" => __("Move details"),
                "data" => $fetch_data,
            ], Response::HTTP_OK);
        } catch (Throwable $th) {
            return response()->json([
                "code" => 500,
                "response" => "error",
                "message" => $th->getMessage(),
                "data" => (object)array()
            ], 500);
        }
    }

    public function confirmStartMove(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'move_id' => 'required|integer',
                    'mover_id' => 'required|integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return notfound_error();
            }

            $move = Move::where('id', $request->move_id)->first();

            if ($move == null) {
                return notfound_error();
            }

            if ($user->userRole->key == 'user') {
                $move->movers()->updateExistingPivot($request->mover_id, ['confirm_started' => true, 'confirm_started_at' => now()]);
            }

            if ($user->userRole->key != 'user') {
                return response()->json([
                    "code" => Response::HTTP_FORBIDDEN,
                    "response" => "error",
                    "message" => __("You are not a authorized to do this"),
                    "data" => [],
                ], Response::HTTP_FORBIDDEN);
            }

            $move = Move::where('id', $move->id)
                ->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus', 'movers.userRole'])
                ->first();

            $fetch_data['move-details'] = $move;

            $title = 'Started Confirmed';
            $description = 'Started Confirmed by ' . $user->first_name . ' ' . $user->last_name;
            $meta['type_id'] = $request->move_id;
            $meta['type'] = 'move';

            send_notification($request->mover_id, $title, $description, $meta);

            return response()->json([
                "code" => Response::HTTP_OK,
                "response" => "success",
                "message" => __("Move details"),
                "data" => $fetch_data,
            ], Response::HTTP_OK);
        } catch (Throwable $th) {
            return response()->json([
                "code" => 500,
                "response" => "error",
                "message" => $th->getMessage(),
                "data" => (object)array()
            ], 500);
        }
    }

    public function finishMove(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'move_id' => 'required',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return notfound_error();
            }

            $move = Move::where('id', $request->move_id)->first();

            if ($move == null) {
                return notfound_error();
            }

            if ($user->userRole->key == 'user') {
                $move->move_status_id = MoveStatus::where('key', 'DONE')->first()->id;
                $move->save();
            }

            if ($user->userRole->key == 'driver') {
                $move->movers()->updateExistingPivot($user->id, ['is_finished' => true, 'finished_at' => now()]);
            }

            if ($user->userRole->key == 'labor') {
                $move->movers()->updateExistingPivot($user->id, ['is_finished' => true, 'finished_at' => now()]);
            }

            $move = Move::where('id', $move->id)
                ->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus', 'movers.userRole'])
                ->first();

            $fetch_data['move-details'] = $move;

            $title = 'Move Finish';
            $description = 'Move Finished by ' . $user->first_name . ' ' . $user->last_name;
            $meta['type_id'] = $move->id;
            $meta['type'] = 'move';
            $movers = $move->movers;

            send_notification($user->id, $title, $description, $meta);
            send_notification(1, $title, $description, $meta);

            foreach ($movers as $mover) {
                send_notification($mover->id, $title, $description, $meta);
            }

            return response()->json([
                "code" => Response::HTTP_OK,
                "response" => "success",
                "message" => __("Move details"),
                "data" => $fetch_data,
            ], Response::HTTP_OK);
        } catch (Throwable $th) {
            return response()->json([
                "code" => 500,
                "response" => "error",
                "message" => $th->getMessage(),
                "data" => (object)array()
            ], 500);
        }
    }

    public function confirmFinishMove(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'move_id' => 'required|integer',
                    'mover_id' => 'required|integer',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $user = Auth::user();
            $user = User::where('id', $user->id)->first();

            if ($user == null) {
                return notfound_error();
            }

            $move = Move::where('id', $request->move_id)
                ->where('user_id', $user->id)
                ->first();

            if ($move == null) {
                return notfound_error();
            }

            if ($user->userRole->key == 'user') {
                $move->movers()->updateExistingPivot($request->mover_id, ['confirm_finished' => true, 'confirm_finished_at' => now()]);
            }

            if ($user->userRole->key != 'user') {
                return response()->json([
                    "code" => Response::HTTP_FORBIDDEN,
                    "response" => "error",
                    "message" => __("You are not a authorized to do this"),
                    "data" => [],
                ], Response::HTTP_FORBIDDEN);
            }

            $move = Move::where('id', $move->id)
                ->where('user_id', $user->id)
                ->with(['items.itemCategory', 'user', 'movePackage', 'moveStatus', 'movers.userRole'])
                ->first();

            $fetch_data['move-details'] = $move;

            $title = 'Finished Confirmed';
            $description = 'Finished Confirmed by ' . $user->first_name . ' ' . $user->last_name;
            $meta['type_id'] = $request->move_id;
            $meta['type'] = 'move';

            send_notification($request->mover_id, $title, $description, $meta);

            return response()->json([
                "code" => Response::HTTP_OK,
                "response" => "success",
                "message" => __("Move details"),
                "data" => $fetch_data,
            ], Response::HTTP_OK);
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
