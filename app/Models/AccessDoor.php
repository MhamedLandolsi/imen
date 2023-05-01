<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int   $user_id
 * @property int $door_id
 */
class AccessDoor extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'door_id',
        'user_id',
    ];

    public function door(): HasOne
    {
        return $this->hasOne(Door::class, 'id', 'door_id');
    }

}
