<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $primaryKey   = 'favorite_id';
    public $incrementing    = true;
    protected $keyType      = 'int';

    protected $fillable = [
        'user_id',
        'meal_id',
    ];
}
