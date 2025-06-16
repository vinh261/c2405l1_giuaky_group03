import { cn } from "@/libs/utils";


const category = [
    { label: "Tất cả" },
    { label: "Bữa sáng"},
    { label: "Bữa trưa"},
    { label: "Bữa tối"}
]


const MealCategory = () => {
    return (
        <div className="border w-40 py-2 px-4 absolute top-[36%] left-20">
            <ul>
                {category.map((items, index) => (
                    <li key={index} className={cn("border-b border-dashed border-slate-300 py-2 text-lg", index === category.length - 1 && "border-b-0")}>
                        {items.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MealCategory;
