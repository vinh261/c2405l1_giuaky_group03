<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    protected $primaryKey = 'ingredient_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'ingredient_name',
        'unit',
    ];
}
