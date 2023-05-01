<?php

namespace App\Http\Controllers;

use App\Models\AccessDoor;
use App\Models\AccessLog;
use App\Models\Door;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class DoorController extends Controller
{
    /**
     *
     * @throws Exception
     */
    public function getDoors(): JsonResponse
    {
        $user = $this->getUser();

        $doors = Door::query()
            ->join('access_doors', 'door_id', 'door.id')
            ->where('user_id', $user->id)
            ->get();

        return response()->json(['entities' => $doors]);
    }

    /**
     *
     * @throws Exception
     */
    public function getAllDoors(): JsonResponse
    {
        $doors = Door::query()->get();

        return response()->json(['entities' => $doors]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @throws Exception
     */
    public function store(Request $request): JsonResponse
    {
        $this->getUser(true);

        $request->validate([
            'rasberry_pi_code' => 'string|required',
            'description' => 'string|required',
        ]);


        $code = $request->get('rasberry_pi_code');
        $door = Door::query()->updateOrCreate([
            'rasberry_pi_code' => $code,
        ], [
            'rasberry_pi_code' => $code,
            'description' => $request->get('description'),
        ]);

        return response()->json([
            'message' => 'Door created successfully',
            'entity' => $door,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @throws Exception
     */
    public function access(Request $request): JsonResponse
    {
        $this->getUser(true);

        $request->validate([
            'rasberry_pi_code' => 'string|required',
            'username' => 'string|required',
            'allow' => 'integer|required',
        ]);
        /** @var User $user */
        $user = User::query()->where('username', $request->get('username'))->first();

        if (!$user) {
            throw new Exception('User not found');
        }

        /** @var Door $door */
        $door = Door::query()->where('rasberry_pi_code', $request->get('rasberry_pi_code'))->first();

        if (!$door) {
            throw new Exception('door not found');
        }

        $access = AccessDoor::query()
            ->where('door_id', $door->id)
            ->where('user_id', $user->id);

        if ($request->get('allow')) {
            if ($access->count() > 0) {
                throw new Exception('door already assigned');
            }
            AccessDoor::query()->create([
                'door_id' => $door->id,
                'user_id' => $user->id,
            ]);
        } else {
            $access->delete();
        }

        return response()->json([
            'message' => 'Operation Done !',
        ]);
    }

    /**
     *
     * @throws Exception
     */
    public function delete(Request $request): JsonResponse
    {
        $this->getUser(true);

        $request->validate([
            'rasberry_pi_code' => 'string|required',
        ]);

        /** @var Door $door */
        $door = Door::query()
            ->where('rasberry_pi_code', $request->get('rasberry_pi_code'))
            ->first();

        if (!$door) {
            throw new Exception('door not found');
        }
        AccessDoor::query()
            ->where('door_id', $door->id)
            ->delete();
        Door::query()
            ->where('id', $door->id)->delete();

        return response()->json([
            'message' => 'Operation Done !',
        ]);
    }

    /**
     *
     * @throws Exception
     */
    public function check(Request $request): JsonResponse
    {
        $request->validate([
            'rasberry_pi_code' => 'string|required',
            'token' => 'string|required',
            'secret' => 'string|required',
        ]);

        if ($request->get('secret') != env('rasberry_secret')) {
            throw new Exception('not authorizd');
        }
        $user = JWTAuth::setToken($request->get('token'))->toUser();
        if (!$user) {
            $user = User::query()->orderBy('updated_at', 'desc')->first();
        }
        /** @var Door $door */
        $door = Door::query()->where('rasberry_pi_code', $request->get('rasberry_pi_code'))->first();

        if (!$door) {
            throw new Exception('door not found');
        }
        $access = AccessDoor::query()->where('door_id', $door->id)->where('user_id', $user->id);

        $code = $request->get('rasberry_pi_code');
        if ($access->count() == 0) {

            AccessLog::query()->create([
                'username' => $user->username,
                'rasberry_pi_code' => $code,
                'date' => Carbon::now(),
                'accept' => false,
            ]);

            return response()->json([
                'authorized' => false,
            ]);

        } else {
            AccessLog::query()->create([
                'username' => $user->username,
                'rasberry_pi_code' => $code,
                'date' => Carbon::now(),
                'accept' => true,
            ]);

            return response()->json([
                'authorized' => true,
            ]);
        }
    }
}
