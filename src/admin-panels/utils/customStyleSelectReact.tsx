import type { GroupBase, StylesConfig } from "react-select";
import { useTheme } from "../../hooks/useTheme";
import type { ChartOption } from "../../types/models.types";


const getBorderColor = (theme: string) => {
    return theme === 'light' ? "#90A1B9" : "#314158";
}

const getTextColor = (theme: string) => {
    return theme === 'light' ? "#0F172B" : "#F8FAFC";
}

const getBgColor = (theme: string) => {
    return theme === 'light' ? "#f8fafc" : "#1D293D"
}

const getOptionHover = (theme: string) => {
    return theme === 'light' ? "#E2E8F0" : "#314158"
}

const getOptionHoverText = (theme: string) => {
    return theme === 'light' ? "#155DFC" : "#2B7FFF"
}

export const useCustomStyles = (): StylesConfig<ChartOption, false, GroupBase<ChartOption>> => {
    const { theme } = useTheme();

    return {
        container: (provided) => ({
            ...provided,
        }),

        // INPUT BORDER
        control: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            borderColor: getBorderColor(theme),
            boxShadow: "none",
            "&:hover": {
                borderColor: "none",
            }
        }),

        // INPUT TEXT
        input: (provided) => ({
            ...provided,
            color: getTextColor(theme),
        }),

        // INPUT TEXT TYPE
        singleValue: (provided) => ({
            ...provided,
            color: getTextColor(theme),
        }),

        // DROPDOWN
        menu: (provided) => ({
            ...provided,
            backgroundColor: getBgColor(theme),
        }),

        // OPTION SELECT
        option: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            backgroundColor: "none",
            color: state.isSelected ? getOptionHoverText(theme) : "",
            "&:hover": {
                backgroundColor: getOptionHover(theme),
                text: getTextColor(theme),
            },
        }),
    };
};