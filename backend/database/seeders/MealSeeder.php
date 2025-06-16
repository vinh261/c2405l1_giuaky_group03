<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Meal;
use App\Models\NutritionInfo;
use App\Models\Profile;
use App\Models\Recipe;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');

        // Get or create default user for recipes
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'user_id' => 'USER-0001',
                'email' => 'chef@healthyviet.com',
                'password' => bcrypt('123456789')
            ]);

            Profile::create([
                'profile_id' => $user->user_id,
                'user_name' => 'Chef Vietnam',
                'role' => 'admin'
            ]);
        }

        // Create categories
        $categories = [
            'breakfast' => Category::firstOrCreate(['category_name' => 'breakfast']),
            'lunch' => Category::firstOrCreate(['category_name' => 'lunch']),
            'dinner' => Category::firstOrCreate(['category_name' => 'dinner']),
            'snacks' => Category::firstOrCreate(['category_name' => 'snacks']),
            'smoothies' => Category::firstOrCreate(['category_name' => 'smoothies']),
        ];

        // Create tags for diet types
        $dietTags = [
            'Vegan' => Tag::firstOrCreate(['tag_name' => 'Vegan']),
            'Vegetarian' => Tag::firstOrCreate(['tag_name' => 'Vegetarian']),
            'Keto' => Tag::firstOrCreate(['tag_name' => 'Keto']),
            'Paleo' => Tag::firstOrCreate(['tag_name' => 'Paleo']),
            'Gluten-Free' => Tag::firstOrCreate(['tag_name' => 'Gluten-Free']),
            'Low Carb' => Tag::firstOrCreate(['tag_name' => 'Low Carb']),
            'High Protein' => Tag::firstOrCreate(['tag_name' => 'High Protein']),
        ];

        // Meals data
        $mealsData = [
            // Breakfast
            [
                'meal_name' => 'Bánh mì nấm chay nướng',
                'category' => 'breakfast',
                'diet_type' => ['High Protein'],
                'image' => $frontendUrl . '/src/assets/images/menu/banhmi.png',
                'desc' => 'Món bánh mì nấm chay là một trong những món ăn chuẩn bị sẵn ít công sức nhất. Món này chủ yếu sử dụng hạt, nấm và bạn có thể hoàn thành trong vòng chưa đầy 15 phút.',
                'calories' => 330,
                'nutrition' => [
                    'protein' => 10,
                    'fat' => 18,
                    'carbohydrate' => 31,
                    'calories' => 330,
                    'fiber' => 17
                ],
                'recipe' => [
                    'cuisine_type' => 'Hoa Kỳ',
                    'desc_step' => "Hãy bắt đầu bằng cách cho hạt điều vào một chảo khô, đun với lửa vừa.\nBăm nhỏ hành tây tươi rồi cho vào chảo có một chút dầu oliu đã được làm nóng.\nXào hành tây cho đến khi chúng trở nên trong, mềm mại và dậy mùi thơm quyện lẫn với dầu.\nSau khi hành tây đã đạt độ trong mờ, chuyển sang sử dụng chảo để chiên nấm mỡ trắng đã được thái lát mỏng.\nCho hạt điều rang vàng vào máy xay thực phẩm và xay nhuyễn.\nTrang trí và thưởng thức",
                    'cook_time' => 20,
                    'serve' => 1
                ]
            ],
            [
                'meal_name' => 'Phở bò',
                'category' => 'breakfast',
                'diet_type' => ['Gluten-Free'],
                'image' => 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop',
                'desc' => 'Phở bò truyền thống với nước dùng thơm ngon',
                'calories' => 450,
                'nutrition' => [
                    'protein' => 25,
                    'fat' => 10,
                    'carbohydrate' => 65,
                    'calories' => 450
                ],
                'recipe' => [
                    'cuisine_type' => 'Vietnamese',
                    'desc_step' => "1. Ninh xương bò 3 tiếng\n2. Trụng bánh phở\n3. Thái thịt bò mỏng\n4. Chan nước dùng và thưởng thức",
                    'cook_time' => 30,
                    'serve' => 2
                ]
            ],
            [
                'meal_name' => 'Cháo gà',
                'category' => 'breakfast',
                'diet_type' => ['Gluten-Free', 'Low Carb'],
                'image' => 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=300&fit=crop',
                'desc' => 'Cháo gà bổ dưỡng với hành phi và gừng',
                'calories' => 280,
                'nutrition' => [
                    'protein' => 20,
                    'fat' => 8,
                    'carbohydrate' => 30,
                    'calories' => 280
                ],
                'recipe' => [
                    'cuisine_type' => 'Vietnamese',
                    'desc_step' => "1. Nấu cháo từ gạo tẻ\n2. Luộc gà và xé nhỏ\n3. Phi hành và gừng\n4. Cho gà vào cháo, rắc hành phi",
                    'cook_time' => 45,
                    'serve' => 3
                ]
            ],
            [
                'meal_name' => 'Bánh cuốn',
                'category' => 'breakfast',
                'diet_type' => ['Gluten-Free'],
                'image' => 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop',
                'desc' => 'Bánh cuốn mềm mịn với nhân thịt và mộc nhĩ',
                'calories' => 250,
                'nutrition' => [
                    'protein' => 15,
                    'fat' => 10,
                    'carbohydrate' => 25,
                    'calories' => 250
                ],
                'recipe' => [
                    'cuisine_type' => 'Vietnamese',
                    'desc_step' => "1. Pha bột bánh cuốn\n2. Xào nhân thịt mộc nhĩ\n3. Tráng bánh mỏng\n4. Cuốn nhân và ăn với nước mắm",
                    'cook_time' => 30,
                    'serve' => 2
                ]
            ],
            [
                'meal_name' => 'Xôi xéo',
                'category' => 'breakfast',
                'diet_type' => ['Vegetarian', 'Vegan'],
                'image' => 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop',
                'desc' => 'Xôi nếp dẻo với đậu xanh và dừa nạo',
                'calories' => 380,
                'nutrition' => [
                    'protein' => 8,
                    'fat' => 12,
                    'carbohydrate' => 60,
                    'calories' => 380
                ],
                'recipe' => [
                    'cuisine_type' => 'Vietnamese',
                    'desc_step' => "1. Ngâm nếp qua đêm\n2. Nấu đậu xanh\n3. Hấp xôi với nghệ\n4. Rắc dừa nạo và muối vừng",
                    'cook_time' => 60,
                    'serve' => 4
                ]
            ],

            // Lunch
            [
                'meal_name' => 'Cơm tấm sườn bì',
                'category' => 'lunch',
                'diet_type' => ['High Protein'],
                'image' => 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
                'desc' => 'Cơm tấm với sườn nướng và bì thơm ngon',
                'calories' => 580,
                'nutrition' => [
                    'protein' => 35,
                    'fat' => 20,
                    'carbohydrate' => 65,
                    'calories' => 580
                ],
                'recipe' => [
                    'cuisine_type' => 'Vietnamese',
                    'desc_step' => "1. Ướp sườn với sả, tỏi\n2. Nướng sườn trên than\n3. Làm bì từ thịt và da heo\n4. Dọn cơm với sườn, bì, dưa leo",
                    'cook_time' => 45,
                    'serve' => 1
                ]
            ],
            [
                'meal_name' => 'Bún bò Huế',
                'category' => 'lunch',
                'diet_type' => ['Gluten-Free'],
                'image' => 'https://images.unsplash.com/photo-1521503862198-2ae9a997bbc9?w=400&h=300&fit=crop',
                'desc' => 'Bún bò Huế cay nồng đặc trưng miền Trung',
                'calories' => 520,
                'nutrition' => [
                    'protein' => 28,
                    'fat' => 15,
                    'carbohydrate' => 70,
                    'calories' => 520
                ],
                'recipe' => [
                    'cuisine_type' => 'Vietnamese',
                    'desc_step' => "1. Hầm xương ống với sả\n2. Xào sa tế\n3. Luộc thịt bò, giò heo\n4. Chan nước dùng vào bún",
                    'cook_time' => 60,
                    'serve' => 2
                ]
            ],
            [
                'meal_name' => 'Gỏi cuốn',
                'category' => 'lunch',
                'diet_type' => ['Gluten-Free', 'Low Carb', 'Vegetarian'],
                'image' => 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop',
                'desc' => 'Gỏi cuốn tươi mát với tôm và thịt',
                'calories' => 180,
                'nutrition' => [
                    'protein' => 15,
                    'fat' => 3,
                    'carbohydrate' => 25,
                    'calories' => 180
                ],
                'recipe' => [
                    'cuisine_type' => 'Vietnamese',
                    'desc_step' => "1. Luộc tôm, thịt\n2. Chuẩn bị rau sống\n3. Làm mềm bánh tráng\n4. Cuốn và ăn với nước chấm",
                    'cook_time' => 20,
                    'serve' => 2
                ]
            ],
            [
                'meal_name' => 'Cá kho tộ',
                'category' => 'lunch',
                'diet_type' => ['Gluten-Free', 'High Protein', 'Keto'],
                'image' => 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400&h=300&fit=crop',
                'desc' => 'Cá kho tộ đậm đà với nước dừa tươi',
                'calories' => 420,
                'nutrition' => [
                    'protein' => 30,
                    'fat' => 25,
                    'carbohydrate' => 15,
                    'calories' => 420
                ],
                'recipe' => [
                    'cuisine_type' => 'Vietnamese',
                    'desc_step' => "1. Làm sạch cá\n2. Thắng nước màu\n3. Kho cá với nước dừa\n4. Nêm nếm và thưởng thức",
                    'cook_time' => 40,
                    'serve' => 3
                ]
            ],
            [
                'meal_name' => 'Canh chua cá',
                'category' => 'lunch',
                'diet_type' => ['Gluten-Free', 'Low Carb'],
                'image' => 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=300&fit=crop',
                'desc' => 'Canh chua cá lóc với dứa và cà chua',
                'calories' => 250,
                'nutrition' => [
                    'protein' => 22,
                    'fat' => 5,
                    'carbohydrate' => 30,
                    'calories' => 250
                ],
                'recipe' => [
                    'cuisine_type' => 'Vietnamese',
                    'desc_step' => "1. Phi tỏi, cho cà chua\n2. Đổ nước, nấu sôi\n3. Cho dứa, me, đậu bắp\n4. Cuối cùng cho cá vào",
                    'cook_time' => 25,
                    'serve' => 4
                ]
            ],

            // Add more meals for dinner, snacks, smoothies...
        ];

        // Create meals with relationships
        foreach ($mealsData as $mealData) {
            // Create recipe first
            $recipe = Recipe::create([
                'cuisine_type' => $mealData['recipe']['cuisine_type'],
                'desc_step' => $mealData['recipe']['desc_step'],
                'cook_time' => $mealData['recipe']['cook_time'],
                'serve' => $mealData['recipe']['serve'],
                'created_by' => $user->profile->profile_id
            ]);

            // Create nutrition info
            NutritionInfo::create([
                'recipe_id' => $recipe->recipe_id,
                'protein' => $mealData['nutrition']['protein'],
                'fat' => $mealData['nutrition']['fat'],
                'carbohydrate' => $mealData['nutrition']['carbohydrate'],
                'calories' => $mealData['nutrition']['calories']
            ]);

            // Create meal
            $meal = Meal::create([
                'meal_name' => $mealData['meal_name'],
                'diet_type' => json_encode($mealData['diet_type']),
                'image' => $mealData['image'],
                'desc' => $mealData['desc'],
                'recipe_id' => $recipe->recipe_id
            ]);

            // Attach category
            $meal->categories()->attach($categories[$mealData['category']]->category_id);

            // Attach diet tags
            foreach ($mealData['diet_type'] as $diet) {
                if (isset($dietTags[$diet])) {
                    $meal->tags()->attach($dietTags[$diet]->tag_id);
                }
            }
        }

        $this->command->info('Meals seeded successfully!');
    }
}
