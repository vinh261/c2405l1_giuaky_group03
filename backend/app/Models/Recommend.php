<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recommend extends Model
{
    protected $primaryKey = 'recommend_id';
    protected $fillable = [
        'criteria',
    ];

    /**
     * relationship with users
     */
    public function user()
    {
        return $this->belongsTo(Profile::class, 'profile_id', 'profile_id');
    }

    /**
     * relationship with meals
     */
    public function meals()
    {
        return $this->belongsToMany(Meal::class, 'recommend_detail', 'recommend_id', 'meal_id');
    }

    /**
     * ====================================================================
     * quan hệ gián tiếp: lấy thông tin meal thông qua recipe_prepares.
     * hasManyThrough(
     *        Model 1: model muốn lấy thông tin,
     *        Model 2: trung gian giữa model 3 (model cần lấy thông tin) và model 1,
     *        'khóa ngoại trong model 2 liên kết với model 3',
     *        'khóa ngoại trong model 1 liên kết với model 2',
     *        'khóa chính trong model 3',
     *        'khóa chính trong model 2',
     * )
     * ====================================================================
     */
    // public function meal()
    // {
    //     return $this->hasManyThrough(
    //         Meal::class,
    //         RecipePrepare::class,
    //         'recommend_id',
    //         'recipe_id',
    //         'recommend_id',
    //         'recipe_id'
    //     );
    // }
}
