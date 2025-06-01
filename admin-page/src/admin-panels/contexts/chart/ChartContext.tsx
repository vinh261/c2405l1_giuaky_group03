import { createContext } from "react";
import type { ChartContextType } from "../../../types/models.types";


export const ChartContext = createContext<ChartContextType | undefined>(undefined);