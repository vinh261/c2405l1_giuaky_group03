<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NutritionInfo extends Model
{
    protected $table = 'nutrition_info';
    protected $primaryKey = 'nutrition_id';
    protected $fillable = [
        'protein',
        'fat',
        'carbohydrate',
        'calories',
    ];

    /**
     * relationship with recipes
     */
    public function recipe()
    {
        return $this->belongsTo(Recipe::class, 'recipe_id', 'recipe_id');
    }
}
