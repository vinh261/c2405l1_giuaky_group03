import { BreakfastItem } from "@/admin-panels/components/ui/meals/BreakfastItem";
import { DinnerItem } from "@/admin-panels/components/ui/meals/DinnerItem";
import { LunchItem } from "@/admin-panels/components/ui/meals/LunchItem";
import { useState } from "react";


const MEAL_TYPES = [...BreakfastItem, ...LunchItem, ...DinnerItem];
const ITEMS_PER_PAGE = 12;

export const usePagination = () => {
    const [currentPagePaginate, setCurrentPagePaginate] = useState(1);

    const totalPagePaginate = Math.ceil(MEAL_TYPES.length / ITEMS_PER_PAGE);
    const startIndex = (currentPagePaginate - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItemPaginate = MEAL_TYPES.slice(startIndex, endIndex);

    return {
        currentPagePaginate,
        setCurrentPagePaginate,
        totalPagePaginate,
        currentItemPaginate,
    };
};