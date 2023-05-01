<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $description
 * @property int    $user_id
 * @property string $status
 */
class UserRequest extends Model
{
    use HasFactory;

    public const WAIT = 'WAIT';
    public const ACCEPTED = 'ACCEPTED';
    public const REFUSED = 'REFUSED';
    protected $table = 'user_request';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'description',
        'user_id',
        'status',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
