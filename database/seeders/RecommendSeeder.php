<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Recommend;
use App\Models\User;
use App\Models\Meal;

class RecommendSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        $meals = Meal::limit(2)->get();

        // Nếu không có dữ liệu cần thiết thì return sớm
        if (!$user || $meals->isEmpty()) {
            echo "⚠️ Không có user hoặc meal nào để seed recommend_detail\n";
            return;
        }

        // Tạo recommend với UUID
        $recommend = Recommend::firstOrCreate(
            ['criteria' => 'Giảm cân nhanh'],
            [
                'recommend_id' => (string) Str::uuid(),
                'user_id'      => $user->user_id,
            ]
        );

        // Gán meal thật sự vào
        $recommend->meals()->syncWithoutDetaching($meals->pluck('meal_id')->toArray());
    }
}
