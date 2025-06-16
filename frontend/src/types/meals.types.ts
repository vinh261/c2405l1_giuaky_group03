
// Meal category type
export type MealCategory =
    | "breakfast"
    | "lunch"
    | "dinner"
    | "snacks"
    | "smoothies";

// Diet type
export type DietType =
    | "Vegan"
    | "Vegetarian"
    | "Keto"
    | "Paleo"
    | "Gluten-Free"
    | "Low Carb"
    | "High Protein";

// Base meal type
export type Meal = {
    meal_id: string;
    meal_name: string;
    category: MealCategory;
    diet_type: DietType[];
    image: string;
    desc: string;
    calories: number;
    recipe_id: string;
    recipe?: Recipe;
    created_at: string;
    updated_at: string;
}

// Recipe type
export type Recipe = {
    recipe_id: string;
    cuisine_type: string;
    desc_step: string;
    cook_time: number;
    serve: number;
    created_by: string;
    created_at: string;
    updated_at: string;
}

// Meal ingredient type
export type MealIngredient = {
    meal_id: string;
    ingredient_id: string;
    ingredient_name?: string;
    quantity: number;
    unit: string;
}

// Meal tag type
export type MealTag = {
    tag_id: string;
    meal_id: string;
    tag_name: string;
}

// Plan meal menu type
export type PlanMealMenu = {
    plan_id: string;
    meal_id: string;
    day: string;
    time: "breakfast" | "lunch" | "dinner" | "snack";
    created_at: string;
    updated_at: string;
}

// Meal Plan type
export type MealPlan = {
  plan_id: string;
  plan_name: string;
  start_date: string;
  end_date: string;
  profile_id: string;
  created_at: string;
  updated_at: string;
  meals?: MealWithPlanInfo[];
}

// Meal with plan info (for meal planner display)
export interface MealWithPlanInfo extends Meal {
  plan_time?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  plan_day?: string;
}

// Nutrition info for meal
export type MealNutrition = {
    meal_id: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
}

// Extended meal with all details
export type MealWithDetails = Meal & {
    recipe?: Recipe;
    ingredients?: MealIngredient[];
    tags?: MealTag[];
    nutrition?: MealNutrition;
}

// API response types
export type MealListResponse = {
    data: Meal[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
export type MealDetailResponse = {
    data: MealWithDetails;
    message: string;
}

// Filter params
export type MealFilterParams = {
    category?: MealCategory;
    diet_type?: DietType[];
    min_calories?: number;
    max_calories?: number;
    search?: string;
    page?: number;
    per_page?: number;
}

// Favorite meal type
export type FavoriteMeal = {
    meal_id: string;
    added_at: string;
}

// Meal store interface
export type MealStore = {
    // Favorites
    favorites: FavoriteMeal[];
    addFavorite: (meal_id: string) => void;
    removeFavorite: (meal_id: string) => void;
    isFavorite: (meal_id: string) => boolean;
    clearFavorites: () => void;
    getFavoritesCount: () => number;

    // Filters
    filters: MealFilterParams;
    setFilters: (filters: Partial<MealFilterParams>) => void;
    resetFilters: () => void;

    // Category
    activeCategory: MealCategory | "all";
    setActiveCategory: (category: MealCategory | "all") => void;

    // Search
    searchTerm: string;
    setSearchTerm: (term: string) => void;

    // View preferences
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;

    // Recent searches
    recentSearches: string[];
    addRecentSearch: (term: string) => void;
    clearRecentSearches: () => void;
}

export type MealCardProps = {
    meal: Meal;
    viewMode?: "grid" | "list";
}

export type MealFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    meal?: MealWithDetails | null;
    mode: 'create' | 'edit';
}

export type CreateMealData = {
    meal_name: string;
    desc: string;
    image?: string;
    category: string;
    diet_type: string[];
    recipe: {
        cuisine_type: string;
        desc_step: string;
        cook_time: number;
        serve: number;
    };
    nutrition: {
        calories: number;
        protein: number;
        carbohydrate: number;
        fat: number;
    };
    ingredients: {
        ingredient_name: string;
        quantity: number;
        units: string;
    }[];
}

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    meal?: T;
}

// Favorites API
export type FavoriteResponse = {
    success: boolean;
    message: string;
    data?: Meal[];
}