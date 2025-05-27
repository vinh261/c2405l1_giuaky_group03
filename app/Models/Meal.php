<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    protected $primaryKey = 'meal_id';
    protected $fillable = [
        'meal_name',
        'diet_type',
        'image',
    ];

    /**
     * relationship with users
     */
    public function users()
    {
        return $this->belongsToMany(Profile::class, 'favorites', 'meal_id', 'profile_id');
    }

    /**
     * relationship with recipes
     */
    public function recipe()
    {
        return $this->belongsTo(Recipe::class, 'recipe_id', 'recipe_id');
    }

    /**
     * relationship with category
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_meals', 'meal_id', 'category_id');
    }

    /**
     * relationship with tag
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'meal_tags', 'meal_id', 'tag_id');
    }

    /**
     * relationship with meal_plan
     */
    public function mealPlans()
    {
        return $this->belongsToMany(MealPlan::class, 'plan_meal_menu','meal_id', 'plan_id')
                    ->withPivot('time');
    }

    /**
     * relationship with recommend
     */
    public function recommends()
    {
        return $this->belongsToMany(Recommend::class, 'recommend_detail', 'meal_id', 'recommend_id');
    }

    /**
     * ======================================================================================
     * relationship with user thông qua accessor (sử dụng quan hệ của recipe để lấy user).
     * phải có mối quan hệ: meal->recipe->user.
     * dùng nullable operator (?->) để ktra recipe có tồn tại hay không.
     * phải eager loading để tránh n+1 query.
     * bế nó qua controller và dùng.
     * ======================================================================================
     */
    // public function getUserAttribute()
    // {
    //     return $this->recipe?->user;
    // }

    // public function user()
    // {
    //     return $this->hasManyThrough(
    //         User::class,
    //         RecipePrepare::class,
    //         'recipe_id',
    //         'create_by',
    //         'meal_id',
    //         'recipe_id'
    //     );
    // }
}
