import numeral from "numeral";
import { useChart } from "../../hooks/useChart";

interface CustomTooltipProps {
    payload?: { value: number }[];
    label?: string;
}

export const CustomTooltip = ({ payload, label }: CustomTooltipProps) => {
    const { currentChart } = useChart();

    if (!payload || !payload.length) return null;

    let unit = "giá trị";
    if (currentChart === "visited") unit = "lượt truy cập";
    else if (currentChart === "members") unit = "thành viên";
    else if (currentChart === "total_amount") unit = "VNĐ";

    const formattedValue = currentChart === "total_amount"
      ? numeral(payload[0].value).format("0,0")  // ví dụ: 12000 → 12,000
      : payload[0].value;

    return (
        <div className="bg-slate-800 text-white p-2 rounded-md text-sm shadow-md">
            <p className="mb-1 font-semibold">{label}</p>
            <p className="text-blue-400">
                {formattedValue} {unit}
            </p>
        </div>
    );
};
