<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipe extends Model
{
    use HasFactory;

    // Nếu bảng không có khoá tự increment:
    // protected $primaryKey = 'recipe_id';
    // public $incrementing = false;
    // protected $keyType = 'string';

    // Khai báo các cột cho phép fill (điền):
    protected $fillable = [
        'recipe_id',
        'recipe_name',
        'slug',
        'description',
        'image',
        // … các cột khác trong recipes table
    ];
}
