<?php

use App\Http\Controllers\AccessLogController;
use App\Http\Controllers\DoorController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RequestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(LoginController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('update_user', 'updateUser');
    Route::get('user_list', 'getUserList');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('delete_user', 'delete');
});

Route::controller(DoorController::class)->group(function () {
    Route::get('doors', 'getDoors');
    Route::get('all_doors', 'getAllDoors');
    Route::post('create_door', 'store');
    Route::post('delete_door', 'delete');
    Route::any('check', 'check');
});

Route::controller(AccessLogController::class)->group(function () {
    Route::get('logs', 'logs');
});

Route::controller(MessageController::class)->group(function () {
    Route::get('chat/{?id}', 'getAvailableChats');
});

Route::controller(MessageController::class)->group(function () {
    Route::get('chat/message', 'getChat');
    Route::post('chat/send', 'sendMessage');
    Route::get('chat/get_chats', 'getAvailableChats');
});

Route::controller(RequestController::class)->group(function () {
    Route::post('request/create', 'createRequest');
    Route::get('request/get', 'getUserRequest');
    Route::post('request/validation', 'validationAction');
});


Route::get('/', function () {
    return view('index');
});
