<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $primaryKey = 'recipe_id';
    protected $fillable = [
        'cuisine_type',
        'desc_step',
        'cook_time',
        'created_by'
    ];

    /**
     * ============================================================================
     * belongsTo: nghịch đảo của hasOne, hasMany.
     * belongsTo(Model, foreign_key_of_table(n), referenced_key_of_table(1)).
     * belongsToMany: quan hệ n-n, nghịch đảo quan hệ n-n.
     * belongsToMany(Model, pivot, foreign_key_table1, foreign_key_table2).
     * ============================================================================
     */

    /**
     * relationship with users
     */
    public function user()
    {
        return $this->belongsTo(Profile::class, 'created_by', 'profile_id');
    }

    /**
     * relationship with nutrition_info
     */
    public function nutrition_info()
    {
        return $this->hasOne(NutritionInfo::class, 'recipe_id', 'recipe_id');
    }

    /**
     * relationship with ingredients
     */
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredients', 'recipe_id', 'ingredient_id')
                    ->withPivot('quantity', 'units');
    }

    /**
     * relationship with meals
     */
    public function meal()
    {
        return $this->hasOne(Meal::class, 'recipe_id', 'recipe_id');
    }
}
