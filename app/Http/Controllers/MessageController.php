<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @throws Exception
     */
    public function getAvailableChats(): JsonResponse
    {
        $this->getUser(true);

        $chats = Message::query()->select(DB::raw('distinct username, users.id'))
            ->join('users', 'users.id', '=', 'source')
            ->whereNull('target')
            ->get()
            ->toArray();

        return response()->json(['entities' => $chats]);
    }

    /**
     * @throws Exception
     */
    public function getChat(Request $request): JsonResponse
    {
        $user = $this->getUser();
        if($user->is_admin){
            $id = $request->get('id');
        }else{
            $id = $user->id;
        }
        $messages = Message::query()
            ->where('target', $id)
            ->orWhere('source', $id)
            ->orderBy('id')
            ->get()
            ->toArray();

        return response()->json(['entities' => $messages]);
    }

    public function sendMessage(Request $request): JsonResponse
    {
        try {
            $user = $this->getUser();

            $request->validate([
                'message' => 'string|required',
            ]);

            $message = Message::query()->create([
                'message' => $request->get('message'),
                'target' => $request->get('target'),
                'source' => $user->id,
            ]);

            return response()->json([
                'message' => 'message has been sent correctly',
                'entity' => $message,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }
}
