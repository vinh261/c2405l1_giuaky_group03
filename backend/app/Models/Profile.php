<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Profile extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * Khai báo tên cột PK
     * Khai báo kiểu
     * Auto increment: false do user_id type string
     */
    protected $primaryKey = 'profile_id';
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * ====================================================================
     * $fillable: các cột được phép gán hàng loạt khi dùng create() hoặc update() (gán nhiều cột 1 lần bằng mảng).
     * $guarded: các cột không đc phép gán.
     * $hidden: ẩn thông tin của các cột khi hiển thị dữ liệu.
     * ====================================================================
     */

    protected $fillable = [
        'profile_id',
        'user_name',
        'phone',
        'dob',
        'address',
        'note',
        'gender',
        'height',
        'weight',
        'job',
        'image',
        'role',
    ];

    /**
     * ====================================================================
     * hasOne: quan hệ 1-1.
     * hasOne(Model, foreign_key, referenced_key).
     * hasMany: quan hệ 1-n.
     * hasMany(Model, foreign_key_of_table(n), referenced_key_table(1)).
     * ====================================================================
     */

    public function user()
    {
        return $this->belongsTo(User::class, 'profile_id', 'user_id');
    }

    /**
     * relationship with recipes
     */
    public function recipes()
    {
        return $this->hasMany(Recipe::class, 'created_by', 'profile_id');
    }

    /**
     * relationship with meal_plans
     */
    public function mealPlans()
    {
        return $this->hasMany(MealPlan::class, 'user_id', 'profile_id');
    }

    /**
     * relationship with meals
     */
    public function meals()
    {
        return $this->belongsToMany(Meal::class, 'favorites', 'profile_id', 'meal_id');
    }

    /**
     * relationship with recommend
     */
    public function recommends()
    {
        return $this->hasMany(Recommend::class, 'profile_id', 'profile_id');
    }
}
