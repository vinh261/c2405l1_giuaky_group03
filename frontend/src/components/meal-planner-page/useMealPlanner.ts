import { addMealToPlan, createMealPlan, getMealPlans, removeMealFromPlan, type AddMealToPlanData } from "@/services/api/mealPlan.service";
import { getWeekDates } from "@/services/getWeek.service";
import { useAuthStore } from "@/stores/authStore";
import type { Meal, MealPlan } from "@/types/meals.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


export type MealTime = "breakfast" | "lunch" | "dinner" | "snack";

interface PlannedMeal extends Meal {
    planTime: MealTime;
    planDay: string;
}

export const useMealPlanner = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const [currentWeek, setCurrentWeek] = useState(0); // 0 for current week, -1 for last week, 1 for next week

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showMealSelector, setShowMealSelector] = useState(false);
    const [selectedMealTime, setSelectedMealTime] = useState<MealTime>("breakfast");
    const [activePlan, setActivePlan] = useState<MealPlan | null>(null);

    // Fetch user's meal plans
    const { data: mealPlans, isLoading: plansLoading } = useQuery({
        queryKey: ['mealPlans'],
        queryFn: getMealPlans,
        enabled: !!user,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    const weekDates = useMemo(() => getWeekDates(currentWeek), [currentWeek]);

    // Create plan mutation
    const createPlanMutation = useMutation({
        mutationFn: createMealPlan,
        onSuccess: (newPlan) => {
            setActivePlan(newPlan);
            queryClient.invalidateQueries({ queryKey: ["mealPlans"] });
            toast.success("Đã tạo kế hoạch mới");
        },
        onError: () => {
            toast.error("Không thể tạo kế hoạch, vui lòng thử lại.");
        },
    });

    // Add meal to plan mutation
    const addMealMutation = useMutation({
        mutationFn: ({ planId, mealData }: { planId: string; mealData: AddMealToPlanData } ) =>
            addMealToPlan(planId, mealData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mealPlans"] });
            toast.success("Đã thêm món vào kế hoạch");
        },
        onError: () => {
            toast.error("Không thể thêm món vào kế hoạch, vui lòng thử lại.");
        },
    });

    // Remove meal from plan mutation
    const removeMealMutation = useMutation({
        mutationFn: ({ planId, mealId }: { planId: string; mealId: string }) =>
            removeMealFromPlan(planId, mealId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mealPlans"] });
            toast.success("Đã xóa món khỏi kế hoạch");
        },
        onError: () => {
            toast.error("Không thể xóa món khỏi kế hoạch, vui lòng thử lại.");
        },
    });

    // Get meals for selected date
    const getSelectedDateMeals = (): PlannedMeal[] => {
        if (!activePlan?.meals) return [];

        const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
        return activePlan.meals
            .filter((meal) => meal.plan_day === selectedDateStr)
            .map((meal) => ({
                ...meal,
                planTime: meal.plan_time!,
                planDay: meal.plan_day!,
            }));
    };

    const selectedDateMeals = getSelectedDateMeals();

    // Organize meals by time
    const mealsByTime = {
        breakfast: selectedDateMeals.filter((m) => m.planTime === "breakfast"),
        lunch: selectedDateMeals.filter((m) => m.planTime === "lunch"),
        dinner: selectedDateMeals.filter((m) => m.planTime === "dinner"),
        snack: selectedDateMeals.filter((m) => m.planTime === "snack"),
    };

    const mealTimeLabels = {
        breakfast: "Bữa sáng",
        lunch: "Bữa trưa",
        dinner: "Bữa tối",
        snack: "Ăn vặt",
    };

    // Navigation functions
    const goToToday = () => {
        setCurrentWeek(0);
        setSelectedDate(new Date());
    };

    const navigateWeek = (direction: number) => {
        setCurrentWeek(currentWeek + direction);
    };

    // Handle add meal
    // Handle add meal - FIXED
    const handleAddMeal = (mealTime: MealTime) => {
        if (!user) {
            toast.error("Vui lòng đăng nhập để sử dụng tính năng này");
            navigate('/login');
            return;
        }

        setSelectedMealTime(mealTime);

        if (!activePlan) {
            if (createPlanMutation.isPending) return; // Prevent multiple clicks
            
            const dates = getWeekDates(currentWeek);
            const startDate = format(dates[0].date, 'yyyy-MM-dd');
            const endDate = format(dates[6].date, 'yyyy-MM-dd');
            
            createPlanMutation.mutate({
            plan_name: `Kế hoạch tuần ${format(dates[0].date, 'dd/MM')}`,
            start_date: startDate,
            end_date: endDate
            }, {
            onSuccess: (newPlan) => {
                setActivePlan(newPlan);
                setShowMealSelector(true);
            }
            });
        } else {
            setShowMealSelector(true);
        }
    };

    // Handle select meal from modal
    const handleSelectMeal = async (meal: Meal) => {
        if (!activePlan) return toast.error("Vui lòng tạo kế hoạch trước khi thêm món");

        try {
            const mealData = {
                meal_id: meal.meal_id,
                day: format(selectedDate, 'yyyy-MM-dd'),
                time: selectedMealTime
            };
            
            await addMealToPlan(activePlan.plan_id, mealData);

            // Refresh data
            queryClient.invalidateQueries({ queryKey: ['mealPlans'] });
            toast.success("Đã thêm món vào kế hoạch");
            setShowMealSelector(false);
        } catch {
            toast.error("Không thể thêm món, vui lòng thử lại.");
        }
    };

    // Handle remove meal
    const handleRemoveMeal = (mealId: string) => {
        if (!activePlan) return;

        removeMealMutation.mutate({
            planId: activePlan.plan_id,
            mealId,
        });
    };

    // Set active plan on mount
    useEffect(() => {
        if (!mealPlans || mealPlans.length === 0) return;
        
        // Tìm plan cho tuần hiện tại
        const startOfCurrentWeek = format(getWeekDates(currentWeek)[0].date, 'yyyy-MM-dd');
        const endOfCurrentWeek = format(getWeekDates(currentWeek)[6].date, 'yyyy-MM-dd');
        
        const currentWeekPlan = mealPlans.find(plan => {
            return plan.start_date <= startOfCurrentWeek && plan.end_date >= endOfCurrentWeek;
        });
        
        setActivePlan(currentWeekPlan || null);
    }, [mealPlans, currentWeek]); // Chỉ depend on mealPlans và currentWeek

    return {
        weekDates,
        currentWeek,
        setCurrentWeek,
        selectedDate,
        setSelectedDate,
        showMealSelector,
        setShowMealSelector,
        selectedMealTime,
        setSelectedMealTime,
        activePlan,
        mealPlans,
        plansLoading,
        createPlanMutation,
        addMealMutation,
        removeMealMutation,
        mealsByTime,
        mealTimeLabels,
        goToToday,
        navigateWeek,
        handleAddMeal,
        handleSelectMeal,
        handleRemoveMeal,
        user,
        navigate,
    }
};
