<?php

namespace App\Http\Helper;

use App\Models\Meal;
use Illuminate\Support\Str;

class RecommendHelper
{
    /**
     * phân loại note
     */
    protected function extractKeyword($note)
    {
        if (!$note) return [
            'targets' => [],
            'allergies' => [],
        ];

        $note = Str::lower($note);
        $targets = [];
        $allergies = [];

        // map keyword
        $map = [
            'targets' => [
                'giảm cân' => 'giảm cân',
                'tăng cân' => 'tăng cân',
                'ăn kiêng' => 'ăn kiêng',
                'chay' => 'chay',
            ],
            'allergies' => [
                'dị ứng đậu phộng' => 'đậu phộng',
                'dị ứng hải sản' => 'hải sản',
                'không gluten' => 'gluten',
                'không sữa' => 'sữa',
            ],
        ];

        // phân loại keyword
        foreach ($map['targets'] as $key => $tag) {
            if (Str::contains($note, $key)) {
                $targets[] = $tag;
            }
        }

        foreach ($map['allergies'] as $key => $tag) {
            if (Str::contains($note, $key)) {
                $allergies[] = $tag;
            }
        }

        return [
            'targets' => $targets,
            'allergies' => $allergies
        ];
    }

    /**
     * Recommend theo user.note
     */
    public function recommendUser($user, $limit = 10)
    {
        $keyword = $this->extractKeyword($user->note);
        $targets = $keyword['targets'];
        $allergies = $keyword['allergies'];

        if (!empty($targets) || !empty($allergies)) {
            $meals = Meal::query()
                ->when(!empty($targets), function ($query) use ($targets) {
                    $query->whereHas('tag', function ($tagQuery) use ($targets) {
                        $tagQuery->whereIn('name', $targets); // Lọc theo mục tiêu
                    });
                })
                ->when(!empty($allergies), function ($query) use ($allergies) {
                    $query->whereDoesntHave('tag', function ($tagQuery) use ($allergies) {
                        $tagQuery->whereIn('name', $allergies); // Loại trừ món ăn có tag dị ứng
                    });
                })
                ->with(['tags', 'recipe.user'])
                ->latest()
                ->take($limit)
                ->get();
        } else {
            // Nếu không có mục tiêu hoặc dị ứng, hiển thị món ăn mới nhất
            $meals = Meal::with(['tags', 'recipe.user'])
                ->latest()
                ->take($limit)
                ->get();
        }
        return $meals;
    }
}
?>
