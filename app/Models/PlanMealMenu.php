<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlanMealMenu extends Model
{
    // Bảng sử dụng composite PK nên tắt auto-increment
    public $incrementing = false;
    public $timestamps   = true;

    protected $table      = 'plan_meal_menu';

    // Nếu bạn muốn query bằng toàn bộ key, bạn sẽ filter thủ công,
    // nên Laravel vẫn dùng mặc định 'id' không quan trọng ở đây.
    protected $primaryKey = null;

    protected $fillable = [
        'plan_id',
        'meal_id',
        'serve_date',
    ];

    // Quan hệ đến MealPlan
    public function plan()
    {
        return $this->belongsTo(MealPlan::class, 'plan_id', 'plan_id');
    }

    // Quan hệ đến Meal
    public function meal()
    {
        return $this->belongsTo(Meal::class, 'meal_id', 'meal_id');
    }
}
