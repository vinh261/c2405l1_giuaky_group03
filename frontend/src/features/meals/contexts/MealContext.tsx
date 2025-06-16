import { createContext } from "react";
import type { MealContextType } from "../types/meals.types";

export const MealContext = createContext<MealContextType | undefined>(undefined);