<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MealPlan extends Model
{
    protected $primaryKey = 'plan_id';
    protected $fillable = [
        'plan_name',
        'start_date',
        'end_date',
        'profile_id',
    ];

    /**
     * relationship with meal
     */
    public function meals()
    {
        return $this->belongsToMany(Meal::class, 'plan_meal_menu', 'plan_id', 'meal_id')
                    ->withPivot('day', 'time');
    }

    /**
     * relationship with users
     */
    public function user()
    {
        return $this->belongsTo(Profile::class, 'profile_id', 'profile_id');
    }
}
