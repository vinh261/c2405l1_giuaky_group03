import Button from "@/components/common/button/ButtonCustom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/libs/shadcn/ui/carousel";
import { getFeaturedMeals } from "@/services/api/publicMeals.service";
import { formatMealImage } from "@/utils/helpers/format.helper";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";


const SectionThree = () => {
    const navigate = useNavigate();

    // Fetch featured meals
    const { data: featuredMeals = [], isLoading, error } = useQuery({
        queryKey: ['featuredMeals'],
        queryFn: () => getFeaturedMeals(8),
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });

    if (isLoading) {
        return (
            <div className="grid gap-y-[calc(40px-36px)]">
                <h2 className="text-center text-4xl font-bold">Món mới mỗi tuần</h2>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="grid gap-y-[calc(40px-36px)]">
                <h2 className="text-center text-4xl font-bold">Món mới mỗi tuần</h2>
                <div className="text-center text-red-500">
                    Không thể tải dữ liệu món ăn
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-y-[calc(40px-36px)]">
            <h2 className="text-center text-4xl font-bold">Món mới mỗi tuần</h2>

            <Carousel opts={{align: "start", duration: 50}}>
                <p className="w-fit text-lg flex justify-self-end items-center underline underline-offset-4 mb-2 transition-colors hover:text-sky-600 cursor-pointer">
                    Xem thực đơn
                    <ArrowRight />
                </p>

                <CarouselContent className="flex">
                    {featuredMeals.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/4 w-4/5 relative">
                            <img 
                                src={formatMealImage(item.image)} 
                                alt={item.meal_name} 
                                onError={(e) => {
                                    e.currentTarget.src = "@/assets/images/menu/no-image.jpg"; // Fallback image
                                }}
                                className="rounded-xl border border-slate-300" 
                            />

                            <div className="overlay flex flex-col justify-between absolute bottom-0 w-[95%] p-4 pt-8">
                                <p className="text-2xl font-semibold text-teal-100 z-2 whitespace-nowrap mb-2">{item.meal_name}</p>

                                <p className="text-sm text-teal-200 z-2 line-clamp-2">
                                    {item.desc}
                                </p>

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded">
                                        {item.calories} cal
                                    </span>
                                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded capitalize">
                                        {item.category}
                                    </span>
                                </div>
                                
                                <Button 
                                    className='text-slate-200 z-2 h-12 rounded-lg bg-transparent border border-[var(--text-base)] text-md transition-colors duration-300 hover:text-[var(--text-base-color)] font-semibold hover:bg-teal-600 hover:border-teal-600 shadow-lg'
                                    onClick={() => navigate(`/meal-menu/${item.meal_id}`)}
                                >
                                    Xem chi tiết
                                </Button>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="-left-16 btn-carousel" />
                <CarouselNext className="-right-16 btn-carousel" />
            </Carousel>
        </div>
    );
}
export default SectionThree;