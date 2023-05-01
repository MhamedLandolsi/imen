<?php

namespace App\Http\Controllers;

use App\Models\AccessLog;
use Exception;
use Illuminate\Http\JsonResponse;

class AccessLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @throws Exception
     */
    public function logs(): JsonResponse
    {
        $user = $this->getUser();

        if ($user->is_admin) {
            return response()->json(['entities' => AccessLog::all()]);
        } else {
            return response()->json(['entities' =>AccessLog::query()
                ->where('username', $user->username)
                ->get()]);
        }
    }
}
