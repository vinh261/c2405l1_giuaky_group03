<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recommend extends Model
{
    protected $table = 'recommends';
    protected $primaryKey = 'recommend_id';
    public $incrementing = false; // BẮT BUỘC
    protected $keyType = 'string'; // BẮT BUỘC nếu dùng UUID

    protected $fillable = [
        'recommend_id',
        'criteria',
        'user_id',
    ];

    public function meals()
    {
        return $this->belongsToMany(
            Meal::class,
            'recommend_detail',
            'recommend_id',
            'meal_id'
        );
    }
}
