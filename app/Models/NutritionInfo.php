<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NutritionInfo extends Model
{
    use HasFactory;

    // Bảng không có id auto-increment, dùng recipe_id làm PK
    protected $table      = 'nutrition_info';
    protected $primaryKey = 'recipe_id';
    public $incrementing  = false;
    protected $keyType    = 'string';

    // Không có cột id nên tắt timestamp key increment nếu muốn;
    // nhưng giữ timestamps bình thường
    public $timestamps = true;

    protected $fillable = [
        'recipe_id',
        'calories',
        'protein',
        // … thêm các cột nutrition khác nếu có
    ];

    // Quan hệ ngược: mỗi nutrition_info thuộc về một recipe
    public function recipe()
    {
        return $this->belongsTo(Recipe::class, 'recipe_id', 'recipe_id');
    }
}
