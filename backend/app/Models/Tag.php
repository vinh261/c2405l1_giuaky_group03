<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $primaryKey = 'tag_id';
    protected $fillable = ['tag_name'];

    /**
     * relationship with meal
     */
    public function meals()
    {
        return $this->belongsToMany(Meal::class, 'meal_tags', 'tag_id', 'meal_id');
    }
}
