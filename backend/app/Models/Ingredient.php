<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    // protected $table = 'ingredients';
    protected $primaryKey = 'ingredient_id';
    protected $fillable = ['ingredient_name', 'unit'];

    /**
     * relationship with recipes
     */
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_ingredients', 'ingredient_id', 'recipe_id')
                    ->withPivot('quantity', 'units');
    }
}
