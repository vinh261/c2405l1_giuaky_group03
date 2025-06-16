import profile from "@/assets/images/profile.png"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/libs/shadcn/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";


const SectionFive = () => {
    const SectionFive = [
        { 
            review: "\" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis totam voluptates unde atque! Inventore iste, molestias maiores tempora reprehenderit rem aliquam ratione nesciunt recusandae, amet mollitia asperiores at dignissimos placeat. \"",
            name: "Duc Hieu",
            job: "Dev",
            image: profile,
            rate: <Star className="text-yellow-500" />
        },
        { 
            review: "\" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis totam voluptates unde atque! Inventore iste, molestias maiores tempora reprehenderit rem aliquam ratione nesciunt recusandae, amet mollitia asperiores at dignissimos placeat. \"",
            name: "Duc Hieu",
            job: "Dev",
            image: profile,
            rate: <Star className="text-yellow-500" />
        },
        { 
            review: "\" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis totam voluptates unde atque! Inventore iste, molestias maiores tempora reprehenderit rem aliquam ratione nesciunt recusandae, amet mollitia asperiores at dignissimos placeat. \"",
            name: "Duc Hieu",
            job: "Dev",
            image: profile,
            rate: <Star className="text-yellow-500" />
        },
        { 
            review: "\" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis totam voluptates unde atque! Inventore iste, molestias maiores tempora reprehenderit rem aliquam ratione nesciunt recusandae, amet mollitia asperiores at dignissimos placeat. \"",
            name: "Duc Hieu",
            job: "Dev",
            image: profile,
            rate: <Star className="text-yellow-500" />
        },
        { 
            review: "\" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis totam voluptates unde atque! Inventore iste, molestias maiores tempora reprehenderit rem aliquam ratione nesciunt recusandae, amet mollitia asperiores at dignissimos placeat. \"",
            name: "Duc Hieu",
            job: "Dev",
            image: profile,
            rate: <Star className="text-yellow-500" />
        },
        { 
            review: "\" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis totam voluptates unde atque! Inventore iste, molestias maiores tempora reprehenderit rem aliquam ratione nesciunt recusandae, amet mollitia asperiores at dignissimos placeat. \"",
            name: "Duc Hieu",
            job: "Dev",
            image: profile,
            rate: <Star className="text-yellow-500" />
        },
        { 
            review: "\" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis totam voluptates unde atque! Inventore iste, molestias maiores tempora reprehenderit rem aliquam ratione nesciunt recusandae, amet mollitia asperiores at dignissimos placeat. \"",
            name: "Duc Hieu",
            job: "Dev",
            image: profile,
            rate: <Star className="text-yellow-500" />
        }
    ]

    const plugins = [
        Autoplay({
            delay: 3000,
        })
    ]

    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onCarouselChange = useCallback((api: CarouselApi | undefined) => {
        if (!api) return;
        setActiveIndex(api.selectedScrollSnap());
        setScrollSnaps(api.scrollSnapList());
    }, []);

    useEffect(() => {
        if (!carouselApi) {
            return;
        }
        onCarouselChange(carouselApi);
        carouselApi.on("select", () => onCarouselChange(carouselApi));
        carouselApi.on("reInit", () => onCarouselChange(carouselApi));

        return () => {
            carouselApi.off("select", () => onCarouselChange(carouselApi));
            carouselApi.off("reInit", () => onCarouselChange(carouselApi));
        };
    }, [carouselApi, onCarouselChange]);


    if (!SectionFive || SectionFive.length === 0) {
        return <div>Không có slide nào để hiển thị.</div>;
    }

    return (
        <div className="grid gap-y-10">
            <h2 className="text-4xl font-bold text-center">Trải nghiệm khách hàng</h2>

            <Carousel plugins={plugins} setApi={setCarouselApi}>
                <CarouselContent>
                    {SectionFive.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/5">
                            <div className="grid gap-y-4 border border-slate-200 rounded-xl bg-white p-6">
                                <p className="italic h-40 overflow-auto [scrollbar-width:none]">
                                    {item.review}
                                </p>

                                <hr className="border-slate-300" />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img src={item.image} alt="" className="object-cover mr-2 rounded-full size-16 border border-slate-400" />

                                        <span>
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="">{item.job}</p>
                                        </span>
                                    </div>
                                    
                                    <p className="flex">
                                        4.5
                                        {item.rate}
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
};

export default SectionFive;