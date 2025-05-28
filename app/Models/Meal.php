<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Category;

class Meal extends Model
{
    protected $primaryKey = 'meal_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'meal_name',
        'slug',
        'description',
        'price',
        'diet_type',
        'image',
        'recipe_id',
    ];

    /**
     * Quan hệ many-to-many với Category qua bảng pivot category_meals
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            Category::class,      // Model bên kia
            'category_meals',     // tên pivot table
            'meal_id',            // foreign key trỏ về Meal
            'category_id'         // foreign key trỏ về Category
        );
    }
}
