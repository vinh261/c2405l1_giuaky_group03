<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $primaryKey = 'user_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'email',
        'password',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Tự tạo user_id kiểu string.
     */
    public static function generateUserId()
    {
        do {
            $userId = 'USER-' . rand(0, 9999);
        } while (static::where('user_id', $userId)->exists());

        return $userId;
    }

    /**
     *
     * relationship with Profile.
     */
    public function profile()
    {
        return $this->hasOne(Profile::class, 'profile_id', 'user_id');
    }
}
