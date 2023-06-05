<?php

namespace App\Http\Controllers;

use App\Models\AccessDoor;
use App\Models\Door;
use App\Models\Message;
use App\Models\User;
use App\Models\UserRequest;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'username' => 'required|string',
                'password' => 'required|string',
            ]);
        } catch (Exception) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
        $credentials = $request->only('username', 'password');

        /** @var string $token */
        $token = Auth::attempt($credentials);

        if (empty($token)) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        $user->updated_at = Carbon::now();
        $user->save();

        return response()->json([
            'entity' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ],
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:users',
                'password' => 'required|string|min:6',
            ]);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 401);
        }
        $user = User::query()->create([
            'name' => $request->get('name'),
            'username' => $request->get('username'),
            'password' => Hash::make($request->get('password')),
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'entity' => $user,
        ]);
    }

    /**
     * @throws Exception
     */
    public function updateUser(Request $request): JsonResponse
    {
        $this->getUser(true);

        try {
            $request->validate([
                'username' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'is_admin' => 'required|integer',
            ]);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 401);
        }
        /** @var User $user */
        $user = User::query()->where('username', $request->get('username'))->first();

        if (!$user) {
            return response()->json(['message' => 'User not exist',]);
        }
        $user->is_admin = $request->get('is_admin');
        $user->save();
        AccessDoor::query()->where('user_id', $user->id)->delete();
        $doors = $request->get('doors');

        if ($doors) {
            $doorsCollection = Door::query()
                ->whereIn('rasberry_pi_code', explode(",", $doors))
                ->get();

            $doorsCollection->each(function ($door) use ($user) {

                $accessDoor = new AccessDoor();
                $accessDoor->user_id = $user->id;
                $accessDoor->door_id = $door->id;
                $accessDoor->save();
            });

        }

        return response()->json([
            'message' => 'User updated successfully',
            'entity' => $user,
        ]);
    }

    /**
     * @throws Exception
     */
    public function delete(Request $request): JsonResponse
    {
        $current = $this->getUser(true);

        $request->validate([
            'username' => 'string|required',
        ]);

        /** @var User $user */
        $user = User::query()
            ->where('username', $request->get('username'))
            ->first();
        if (!$user) {
            throw new Exception('user not found');
        }
        if ($user->id === $current->id) {
            throw new Exception('you can delete your self');
        }
        AccessDoor::query()
            ->where('user_id', $user->id)
            ->delete();
        UserRequest::query()
            ->where('user_id', $user->id)
            ->delete();
        Message::query()->where('target', $user->id)->orWhere('source', $user->id)->delete();


        $user::query()
            ->where('id', $user->id)->delete();

        return response()->json([
            'message' => 'Operation Done !',
        ]);
    }

    public function logout(): JsonResponse
    {
        Auth::logout();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * @throws Exception
     */
    public function getUserList(): JsonResponse
    {

        $this->getUser(true);

        $users = User::query()->with(['accessDoor', 'accessDoor.door'])->get();

        return response()->json(['entities' => $users]);
    }
}
