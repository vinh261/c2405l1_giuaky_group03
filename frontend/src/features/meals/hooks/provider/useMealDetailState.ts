import useClickOutSide from "@/hooks/useClickOutSide";
import { useCallback, useRef, useState } from "react";


export const useMealDetailState = () => {
    const [openCalc, setOpenCalc] = useState(false);
    const [openMealDetail, setOpenMealDetail] = useState(false);
    const [openAddMeal, setOpenAddMeal] = useState(false);

    const refCalc = useRef<HTMLDivElement>(null);
    const refMealDetail = useRef<HTMLDivElement>(null);
    const refAddMeal = useRef<HTMLDivElement>(null);

    const handleOpenCalc = useCallback(() => {
        setOpenCalc((prev) => !prev);
    }, []);

    const handleOpenMealDetail = useCallback(() => {
        setOpenMealDetail((prev) => !prev);
    }, []);

    const handleOpenAddMeal = useCallback(() => {
        setOpenAddMeal((prev) => !prev);
    }, []);

    // Setup click outside handlers
    useClickOutSide([refCalc], () => setOpenCalc(false));
    useClickOutSide([refMealDetail], () => setOpenMealDetail(false));
    useClickOutSide([refAddMeal], () => setOpenAddMeal(false));

    return {
        openCalc,
        openMealDetail,
        openAddMeal,
        refCalc,
        refMealDetail,
        refAddMeal,
        handleOpenCalc,
        handleOpenMealDetail,
        handleOpenAddMeal,
    };
};