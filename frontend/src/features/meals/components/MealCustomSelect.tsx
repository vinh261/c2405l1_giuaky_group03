import type { ChartOption } from "@/types/models.types";
import type { GroupBase, StylesConfig } from "react-select";



export const MealCustomSelect = (): StylesConfig<ChartOption, false, GroupBase<ChartOption>> => {
    return {
        container: (provided) => ({
            ...provided,
        }),

        // INPUT BORDER
        control: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            boxShadow: "none",
            "&:hover": {
                borderColor: "none",
            }
        }),

        // INPUT TEXT
        input: (provided) => ({
            ...provided,
            // color: getTextColor(theme),
        }),

        // INPUT TEXT TYPE
        singleValue: (provided) => ({
            ...provided,
        }),

        // DROPDOWN
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#f8faf8",
        }),

        // OPTION SELECT
        option: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            backgroundColor: "none",
            color: state.isSelected ? "#155dfc" : "",
            "&:hover": {
                backgroundColor: "#e2e8f0",
                text: "#0f172b",
            },
        }),
    };
};