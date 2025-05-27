<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MealPlan extends Model
{
    use HasFactory;

    // Khóa chính là plan_id (UUID), không tự increment
    protected $primaryKey = 'plan_id';
    public $incrementing   = false;
    protected $keyType     = 'string';

    protected $fillable = [
        'plan_id',
        'plan_name',
        'start_date',
        'end_date',
        'user_id',
    ];
}
