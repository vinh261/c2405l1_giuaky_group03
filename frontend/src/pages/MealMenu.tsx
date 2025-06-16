import Pagination from "@/components/Pagination";
import MealCalculator from "@/features/meals/components/ui/MealCalculatorUI";
import MealDetail from "@/features/meals/components/ui/MealDetail";
import Search from "@/components/ui/search/Search";
import { Button } from "@/libs/shadcn/button";
import { cn } from "@/libs/utils";
import { Calculator, FilterIcon, Plus, X } from "lucide-react";
import MealMenuAddItem from "@/features/meals/components/ui/MealMenuAddItem";
import { useMealContext } from "@/features/meals/hooks/useMealContext";
import { useEffect, useState } from "react";
import { useMeals } from "@/features/meals/hooks/useMeal";
import type { Meal } from "@/features/meals/types/test.type";
import { axiosInstance } from "@/types/axios-config";


const filter = [
    { label: "Bữa sáng", value: "Bữa sáng" },
    { label: "Bữa trưa", value: "Bữa trưa" },
    { label: "Bữa tối", value: "Bữa tối" },
    { label: "Không calo", value: "Không calo" },
    { label: "Ăn kiêng", value: "Ăn kiêng" },
    { label: "Ít béo", value: "Ít béo" },
    { label: "Không Gluten", value: "Không Gluten" }
]

const MealMenu = () => {
    const { 
        handleOpenCalc, openCalc, refCalc, today, handleOpenAddMeal, openAddMeal, refAddMeal, currentPagePaginate,
        totalPagePaginate, setCurrentPagePaginate, refMealDetail
    } = useMealContext();

     // State for meal detail modal
    const [showMealDetail, setShowMealDetail] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState<number | null>(null);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [mealLoading, setMealLoading] = useState(false);

    // State for search and filters
    const [searchQuery, setSearchQuery] = useState('');
    
    // Fetch meals data
    const { meals, loading, error, updateFilters } = useMeals();

    // Handle meal click - fetch detail directly
    const handleMealClick = async (mealId: number) => {
        setSelectedMealId(mealId);
        setMealLoading(true);
        setShowMealDetail(true);
        
        try {
            const response = await axiosInstance.get(`/api/meal/${mealId}`);
            if (response.data.success && response.data.meal) {
                setSelectedMeal(response.data.meal);
            } else {
                setSelectedMeal(response.data.data || response.data);
            }
        } catch (error) {
            console.error('Error fetching meal detail:', error);
        } finally {
            setMealLoading(false);
        }
    };

    // Handle close modal
    const handleCloseModal = () => {
        setShowMealDetail(false);
        setSelectedMealId(null);
        setSelectedMeal(null);
    };

    // Handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        updateFilters({ search: query });
    };

     // Handle filter
    const handleFilterClick = (filterValue: string) => {
        updateFilters({ diet_type: filterValue });
    };

    if (loading) {
        return (
            <div className="container-page flex justify-center items-center min-h-screen">
                <div className="text-lg">Đang tải...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-page flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <section className="container-page grid gap-y-4 text-slate-700 my-20">
            <div className="bg-[url(../assets/images/banner_menu.png)] w-full h-40 bg-cover bg-center rounded-xl"></div>

            <div className="flex justify-between items-center mb-10">
                <span>
                    <p className="text-lg text-slate-400">{today}</p>
                    <h3 className="text-2xl font-semibold">Healthy Viet Nam</h3>
                </span>
                <Search value={searchQuery} placeholder="Tìm món ăn..." onSearch={handleSearch}/>
            </div>

            {/* FILTER - CALCULATOR - SORT */}
            <div className="grid grid-cols-3 items-center">
                <div className="flex gap-4 col-span-2">
                    <Button className="border text-md hover:bg-slate-200">
                        <FilterIcon size={30} />
                        Lọc
                    </Button>

                    <ul className="flex gap-2 place-self-end">
                        {filter.map((item, index) => (
                            <li key={index} onClick={() => handleFilterClick(item.value)} className="border border-slate-300 py-1 px-2 rounded-lg cursor-pointer hover:bg-slate-300">
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-6 justify-self-end items-center">
                    <Button onClick={handleOpenCalc} className="border px-2 py-1 cursor-pointer border-slate-300 hover:bg-slate-300 rounded-lg flex items-center gap-1">
                        <Calculator size={18} />
                        Tính toán giá trị dinh dưỡng
                    </Button>

                    <ul className="flex gap-4">
                        <p>Sắp xếp theo: </p>
                        <li className="cursor-pointer hover:text-sky-600">Nổi bật</li>
                        <li className="cursor-pointer hover:text-sky-600">Mới</li>
                    </ul>
                </div>
                {openCalc && (
                    <div className="fixed bg-black/50 inset-0 z-10">
                        <div ref={refCalc as React.RefObject<HTMLDivElement>} className="fixed top-1/2 left-1/2 -translate-1/2 z-9 px-4 py-6 bg-slate-100 border border-slate-300 rounded-xl">
                            <MealCalculator />
                            <X onClick={handleOpenCalc} className="absolute right-1 top-1 border border-slate-300 transition-colors duration-300 cursor-pointer hover:bg-slate-300 rounded-full p-1" />
                        </div>
                    </div>
                )}
            </div>

            {/* Add meals */}
            <div className="">
                <Button onClick={handleOpenAddMeal} className="flex items-center gap-1 justify-self-end border border-slate-300 rounded-md p-1 text-md hover:bg-slate-200">
                    <Plus size={18} />
                    <p>Thêm món mới</p>
                </Button>
                {openAddMeal && (
                    <div className="fixed inset-0 bg-black/50 z-10" >
                        <div ref={refAddMeal as React.RefObject<HTMLDivElement>}>
                            <MealMenuAddItem />
                        </div>
                    </div>
                )}
            </div>

            {/* MEALS */}
            <div className="grid grid-cols-4 gap-4 pt-15 bg-slate-100 rounded-xl p-4">
                {meals.map((items, index) => (
                    <div key={index} className="border p-6 rounded-xl shrink-0 bg-white transition-colors border-slate-300 mb-12">
                        {/* HEAD BOX */}
                        <div className="relative -top-18 flex gap-4">
                            <img 
                                src={items.image || '../assets/images/image.png'} 
                                alt={items.meal_name}
                                className="rounded-full object-cover size-25 border border-slate-500" 
                                loading="lazy"
                            />
                            
                            <span className="place-content-end text-slate-600">
                                <p>Calories: {items.nutrition?.calories || 0} </p>
                                <p>Chế độ ăn: {items.diet_type} </p>
                            </span>
                        </div>

                        {/* CONTENT BOX */}
                        <div className="grid grid-rows-auto gap-4 -mt-10">
                            <p className="font-bold text-xl">
                                {items.meal_name}
                            </p>

                            <p className="max-h-25 overflow-auto [scrollbar-width:thin] text-slate-500">
                                {items.desc}
                            </p>

                            <Button 
                                onClick={() => handleMealClick(items.meal_id)} 
                                className={cn("border border-slate-400 rounded-xl font-semibold w-fit px-4 py-1 hover:text-slate-50 hover:bg-sky-500 hover:border-sky-500 transition-colors")}
                            >
                                Xem chi tiết
                            </Button>
                        </div>
                    </div>
                ))}

                <div className="col-span-4">
                    <Pagination
                        currentPage={currentPagePaginate}
                        totalPages={totalPagePaginate}
                        onPageChange={setCurrentPagePaginate}
                    />
                </div>
            </div>
            {showMealDetail && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50">
                    <div ref={refMealDetail as React.RefObject<HTMLDivElement>} className="fixed top-1/2 left-1/2 -translate-1/2">
                        {mealLoading ? (
                            <div className="bg-white p-8 rounded-lg">
                                <p className="text-center">Đang tải...</p>
                            </div>
                        ) : selectedMeal ? (
                            <div className="relative">
                                <MealDetail meal={selectedMeal} />
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute right-1 top-1 border border-slate-300 transition-colors duration-300 cursor-pointer hover:bg-slate-300 rounded-full p-1"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white p-8 rounded-lg">
                                <p className="text-center">Không tìm thấy thông tin món ăn</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
};
export default MealMenu;