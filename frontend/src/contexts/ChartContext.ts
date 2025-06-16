import type { ChartContextType } from "@/types/models.type";
import { createContext } from "react";


export const ChartContext = createContext<ChartContextType | undefined>(undefined);