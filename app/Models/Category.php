<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['category_name'];
    protected $primaryKey = 'category_id';

    /**
     * relationship with meals
     */
    public function meals()
    {
        return $this->belongsToMany(Meal::class, 'category_meals', 'category_id', 'meal_id');
    }
}
