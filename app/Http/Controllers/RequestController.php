<?php

namespace App\Http\Controllers;

use App\Models\UserRequest;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    /**
     * @throws Exception
     */
    public function createRequest(Request $request): JsonResponse
    {
        $user = $this->getUser();

        $request->validate([
            'description' => 'string|required',
        ]);

        $userRequest = new UserRequest();
        $userRequest->description = $request->get('description');
        $userRequest->user_id = $user->id;
        $userRequest->status = UserRequest::WAIT;
        $userRequest->save();

        return response()->json([
            'message' => 'request created successfully',
            'entity' => $userRequest,
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @throws Exception
     */
    public function getUserRequest(): JsonResponse
    {
        $user = $this->getUser();

        if ($user->is_admin) {
            $requests = UserRequest::query()->with(['user'])->get();
        } else {
            $requests = UserRequest::query()
                ->where('user_id', $user->id)
                ->get();
        }

        return response()->json(['entities' => $requests]);
    }

    /**
     * @throws Exception
     */
    public function validationAction(Request $request): JsonResponse
    {
        $this->getUser(true);

        $request->validate([
            'validation' => 'int|required',
            'request_id'=>'int|required',
        ]);

        /** @var UserRequest $userRequest */
        $userRequest = UserRequest::query()->findOrFail($request->get('request_id'));
        $userRequest->status = UserRequest::REFUSED;

        if ($request->get('validation') == 1) {
            $userRequest->status = UserRequest::ACCEPTED;
        }

        $userRequest->save();

        return response()->json([
            'message' => 'request created successfully',
            'entity' => $userRequest,
        ]);
    }
}
