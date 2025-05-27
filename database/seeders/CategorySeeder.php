<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create([
            'category_id'   => (string) Str::uuid(),
            'category_name' => 'Gói ăn giảm cân',
            'description'   => 'Chế độ ăn hỗ trợ giảm cân nhanh',
        ]);
    }
}
