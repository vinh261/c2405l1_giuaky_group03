<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;

    protected $table = 'meals'; // không bắt buộc nếu tên chuẩn
    protected $primaryKey = 'meal_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'meal_id',
        'meal_name',
        'slug',
        'description',
        'price',
        'diet_type',
        'image',
        'recipe_id',
    ];
}
