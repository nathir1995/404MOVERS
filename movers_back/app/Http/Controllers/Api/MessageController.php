<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    /**
     * Get all messages
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $user = User::find(auth()->user()->id);
            $chats = $user->chats()->with(['messages' => function ($query) {
                $query->latest()->take(1);
            }])->get();

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Chats Fetched Successfuly"),
                "data" => $chats,
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

    /**
     * Get all messages of a chat
     */
    public function show(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'chat_id' => 'required',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $chat = Chat::find($request->chat_id);
            $messages = $chat->messages()->orderBy('created_at', 'desc')->paginate(10);

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Messages Fetched Successfuly"),
                "data" => $messages,
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

    /**
     * Create a new chat
     */
    public function createChat(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'user_id' => 'required|numeric',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $sender = auth()->user();
            $receiver = User::find($data['user_id']);

            $chat = Chat::create([
                'type' => 'private',
                'status' => 'active',
            ]);

            $user_ids = [
                $sender->id,
                $receiver->id
            ];

            $chat->users()->attach($user_ids);

            $meta['message'] = 'New Chat Created';
            $meta['chat'] = $chat;
            $meta['type_id'] = $chat->id;
            $meta['type'] = 'chat';
            $meta['user_info'] = $sender;
            $meta['user_role'] = $sender->userRole->key;

            send_notification($receiver->id, $sender->first_name . ' ' . $sender->last_name, 'New Chat Created', $meta);

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Chat Created Successfuly"),
                "data" => $chat,
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

    /**
     * Create a new message
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make(
                $data,
                [
                    'message' => 'required|string|max:255',
                    'chat_id' => 'required|numeric',
                ]
            );

            if ($validator->fails()) {
                return validation_error($validator->messages()->all());
            }

            $sender = auth()->user();

            $message = Message::create([
                'user_id' => $sender->id,
                'message' => $data['message'],
                'chat_id' => $data['chat_id'],
            ]);

            $chat = Chat::find($data['chat_id']);
            $chat_users = $chat->users()->where('user_id', '!=', auth()->user()->id)->get();

            $meta['message'] = $data['message'];
            $meta['chat'] = $chat;
            $meta['type_id'] = $data['chat_id'];
            $meta['type'] = 'chat';
            $meta['user_info'] = $sender;
            $meta['user_role'] = $sender->userRole->key;

            foreach ($chat_users as $chat_user) {
                send_notification($chat_user->id, $sender->first_name . ' ' . $sender->last_name, $data['message'], $meta);
            }

            return response()->json([
                "code" => 200,
                "response" => "success",
                "message" => __("Message Created Successfuly"),
                "data" => $message,
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
