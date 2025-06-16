import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/libs/shadcn/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { cn } from "@/utils/cn";
import Button from "@/components/common/button/ButtonCustom";
import { ArrowRightCircle } from "lucide-react";
import { carouselHomeItems } from "./carouselHomeItems";


const CarouselHome = () => {
    const plugins = [
        Autoplay({
            delay: 7000,
        }),
    ];

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
                duration: 50,
                watchDrag: false,
            }}
            plugins={[Fade(), ...plugins]}>
            <CarouselContent>
                {carouselHomeItems.map((item, index) => (
                    <CarouselItem
                        key={index}
                        className="shrink-0 transition-colors ease-in-out duration-300">
                        <img
                            src={item.image}
                            alt="Banner"
                            className="object-cover aspect-[16/8.65] w-full"
                        />

                        <div
                            className={cn(
                                "absolute top-1/2 -translate-y-[70%] w-[600px] grid gap-y-10 bg-slate-900/30 rounded-2xl py-4 px-8 backdrop-blur-sm shadow-xl/20 text-slate-100",
                                index % 2 === 0 ? "right-[13.2%]" : "left-[14%]"
                            )}>
                            <h2 className="text-[40px] uppercase font-extrabold leading-[1.2]">
                                <span className="text-lime-500">
                                    {item.title}
                                </span>
                                <br />
                                {item.subtitle}
                            </h2>

                            <p className="text-lg text-slate-200">{item.desc}</p>

                            <Button className="flex justify-around w-40 h-15 rounded-lg items-center bg-transparent border border-slate-300 text-lg transition-colors duration-300 hover:text-[var(--text-base-color)] font-semibold hover:bg-cyan-700 hover:border-cyan-700">
                                Xem thêm
                                <ArrowRightCircle className="p-1 size-8 bg-yellow-500/80 rounded-md" />
                            </Button>
                        </div>

                        <div className="absolute flex w-10 justify-between bottom-60 left-1/2 -translate-x-1/2">
                            <CarouselPrevious className="btn-carousel" />
                            <CarouselNext className="btn-carousel" />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};
export default CarouselHome;
