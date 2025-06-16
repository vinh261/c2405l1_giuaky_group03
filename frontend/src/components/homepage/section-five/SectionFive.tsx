import Autoplay from "embla-carousel-autoplay";
import { useSectionFiveLogic } from "./useSectionFiveLogic";
import { Carousel, CarouselContent, CarouselItem } from "@/libs/shadcn/ui/carousel";
import { sectionFiveItems } from "./sectionFiveItems";
import { formatImage } from "@/utils/helpers/format.helper";


const SectionFive = () => {
    const { setCarouselApi, scrollSnaps, activeIndex, carouselApi } = useSectionFiveLogic();

    const plugins = [
        Autoplay({
            delay: 3000,
        })
    ]

    // if (!SectionFive || SectionFive.length === 0) {
    //     return <div>Không có slide nào để hiển thị.</div>;
    // }

    return (
        <div className="grid gap-y-10">
            <h2 className="text-4xl font-bold text-center">Trải nghiệm khách hàng</h2>

            <Carousel plugins={plugins} setApi={setCarouselApi}>
                <CarouselContent>
                    {sectionFiveItems.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/5">
                            <div className="grid gap-y-4 border border-slate-200 rounded-xl bg-white p-6">
                                <p className="italic h-40 overflow-auto [scrollbar-width:none]">
                                    {item.review}
                                </p>

                                <hr className="border-slate-300" />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img src={formatImage(item.image)} alt="" className="object-cover mr-2 rounded-full size-14 border border-slate-400" />

                                        <span>
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="">{item.job}</p>
                                        </span>
                                    </div>
                                    
                                    <p className="flex items-center gap-1">
                                        4.5
                                        {typeof item.rate === 'function' ? <item.rate className="text-yellow-500" /> : item.rate}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {SectionFive.length > 1 && (
                    <>
                        {/* DẤU CHẤM ĐIỀU HƯỚNG */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => carouselApi?.scrollTo(index)}
                                    className={`size-2 rounded-full transition-all duration-300
                                                ${index === activeIndex
                                                    ? 'w-6 h-2 bg-lime-500 scale-125' // Style cho dot active
                                                    : 'bg-gray-300 bg-opacity-50 hover:bg-gray-400' // Style cho dot không active
                                                }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </Carousel>
        </div>
    );
}
export default SectionFive;
