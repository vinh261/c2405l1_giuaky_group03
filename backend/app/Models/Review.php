<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'user_id',
        'rating',
        'comment',
        'admin_reply',
        'admin_reply_at'
    ];

    protected $casts = [
        'rating' => 'integer',
        'admin_reply_at' => 'datetime'
    ];

    /**
     * Get the user that owns the review
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    /**
     * Get the meal that the review belongs to
     */
    public function meal()
    {
        return $this->belongsTo(Meal::class, 'meal_id', 'meal_id');
    }
}
