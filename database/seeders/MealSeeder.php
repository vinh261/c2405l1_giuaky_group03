<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Meal;
use App\Models\Category;
use App\Models\Recipe;

class MealSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Lấy category giảm cân từ DB (theo tên)
        $category = Category::where('category_name', 'Gói ăn giảm cân')->first();
        if (! $category) {
            $this->command->error("Category 'Gói ăn giảm cân' not found. Please seed categories first.");
            return;
        }

        // 2. (Tuỳ) Lấy recipe đầu tiên để gán nếu cần
        $recipe = Recipe::first();

        // 3. Danh sách 8 món giảm cân
        $meals = [
            [
                'meal_name'   => 'Chế độ ăn giảm cân Eat Clean 7 ngày',
                'slug'        => 'eatclean-7day',
                'description' => 'Anh nói tôi béo, tôi giảm cân. Anh nói tôi nghèo…',
                'price'       => 750000,
                'diet_type'   => 'eatclean',
                'image'       => '/assets/images/products/eatclean-7.jpg',
            ],
            [
                'meal_name'   => 'Chế độ ăn giảm cân Keto 7 ngày',
                'slug'        => 'keto-7day',
                'description' => 'Mẫu chốt là bạn phải kiên trì thực hiện và có lòng tin…',
                'price'       => 750000,
                'diet_type'   => 'keto',
                'image'       => '/assets/images/products/keto-7.jpg',
            ],
            [
                'meal_name'   => 'Chế độ ăn giảm cân Eat Clean 28 ngày',
                'slug'        => 'eatclean-28day',
                'description' => 'Cùng là một người nhưng khi béo và lúc gầy sẽ nhận được…',
                'price'       => 2800000,
                'diet_type'   => 'eatclean',
                'image'       => '/assets/images/products/eatclean-28.jpg',
            ],
            [
                'meal_name'   => 'Chế độ ăn giảm cân Keto 28 ngày',
                'slug'        => 'keto-28day',
                'description' => 'Không ai có thể giúp bạn ngoài chính mình…',
                'price'       => 2800000,
                'diet_type'   => 'keto',
                'image'       => '/assets/images/products/keto-28.jpg',
            ],
            [
                'meal_name'   => 'Granola siêu hạt 5% yến mạch',
                'slug'        => 'granola-5percent',
                'description' => 'Granola nhiều dinh dưỡng, phù hợp ăn kiêng…',
                'price'       => 150000,
                'diet_type'   => 'granola',
                'image'       => '/assets/images/products/granola-5percent.jpg',
            ],
            [
                'meal_name'   => 'Combo 4 hộp granola 5% yến mạch + full hạt',
                'slug'        => 'granola-combo1',
                'description' => 'Bộ combo bao gồm 4 hộp granola tươi ngon…',
                'price'       => 550000,
                'diet_type'   => 'granola',
                'image'       => '/assets/images/products/granola-combo1.jpg',
            ],
            [
                'meal_name'   => 'Combo granola giảm cân khỏe đẹp',
                'slug'        => 'granola-combo2',
                'description' => 'Sản phẩm đặc biệt giúp hỗ trợ giảm cân…',
                'price'       => 600000,
                'diet_type'   => 'granola',
                'image'       => '/assets/images/products/granola-combo2.jpg',
            ],
            [
                'meal_name'   => 'Combo granola siêu hạt giảm cân năng lượng',
                'slug'        => 'granola-combo3',
                'description' => 'Chuỗi hạt siêu cung cấp năng lượng cho ngày dài…',
                'price'       => 650000,
                'diet_type'   => 'granola',
                'image'       => '/assets/images/products/granola-combo3.jpg',
            ],
        ];

        // 4. Tạo hoặc tìm và gán category
        foreach ($meals as $data) {
            $meal = Meal::firstOrCreate(
                ['slug' => $data['slug']],
                array_merge(
                    [
                        'meal_id'   => (string) Str::uuid(),
                        'recipe_id' => $recipe ? $recipe->recipe_id : null,
                    ],
                    $data
                )
            );

            // Gán meal vào category giảm cân (tránh duplicate)
            $meal->categories()->syncWithoutDetaching($category->category_id);
        }

        $this->command->info('✔ Seeded ' . count($meals) . ' meals for category ' . $category->category_name);
    }
}
