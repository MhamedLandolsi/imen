<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\File\Exception\AccessDeniedException;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login', 'register' , 'check']]);
    }

    /**
     * @throws Exception
     */
    public function getUser(bool $mustAdmin = false): User
    {
        $user = Auth::user();

        if ((!($user instanceof User)) || ($mustAdmin && !$user->is_admin)) {
            throw new AccessDeniedException('Unauthorized');
        }
        return $user;
    }
}
