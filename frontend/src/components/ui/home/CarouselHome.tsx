import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/libs/shadcn/carousel";
import { cn } from "@/libs/utils";
import banner01 from "@/assets/images/banner01.jpg"
import banner02 from "@/assets/images/banner02.jpg"
import banner03 from "@/assets/images/banner03.jpg"
import banner04 from "@/assets/images/banner04.jpg"
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/libs/shadcn/button";
import { ArrowRightCircle } from "lucide-react";


const CarouselHome = () => {
    const CarouselProps = [
        {
            image: banner01,
            title: "khỏe mạnh",
            subtitle: "bên trong, tươi mới bên ngoài",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis consequatur vero aspernatur adipisci ipsum minima ullam rem sit veniam error corrupti ad quia magnam facilis dolorum modi, quaerat, fugiat reiciendis!",
        },
        {
            image: banner02,
            title: "thực phẩm",
            subtitle: "lành mạnh, sống lành mạnh",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab eos reprehenderit doloremque maxime ut illo facere quis necessitatibus quisquam culpa! Perspiciatis sit odio dignissimos repellendus pariatur expedita, numquam ipsa magni.",
        },
        {
            image: banner03,
            title: "tại sao",
            subtitle: "phải lập kế hoạch cho bữa ăn ?",
            desc: "Lên kế hoạch bữa ăn lành mạnh giúp tiết kiệm thời gian, giảm căng thẳng và đảm bảo dinh dưỡng cân bằng. Nó giúp bạn duy trì năng lượng của mình."
        },
        {
            image: banner04,
            title: "làm thế nào",
            subtitle: "để có một chế độ ăn uống cân bằng ?",
            desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur odit explicabo autem, assumenda, provident maiores eius, doloribus incidunt labore minima sequi? Et minima vitae nulla maiores! Esse quaerat tenetur consequatur.",
        }
    ]

    const plugins = [
        Autoplay({
            delay: 7000,
        }),
    ];

    return (
        <Carousel 
            opts={{align: "start" ,loop: true, duration: 50, watchDrag: false}} 
            plugins={[Fade(), ...plugins]}
        >
            <CarouselContent>
                {CarouselProps.map((item, index) => (
                    <CarouselItem key={index} className="shrink-0 transition-colors ease-in-out duration-300">
                        <img src={item.image} alt="Banner" className="object-cover aspect-[16/8.65] w-full" />

                        <div className={cn("absolute top-1/2 -translate-y-[70%] w-[600px] grid gap-y-10 bg-slate-900/30 rounded-2xl py-4 px-8 backdrop-blur-sm shadow-xl/20", 
                            index % 2 === 0 ? "right-[13.2%]" : "left-[14%]")}
                        >
                            <h2 className="text-[40px] uppercase font-extrabold leading-[1.2]">
                                <span className="text-lime-500">{item.title}</span> 
                                <br/> 
                                {item.subtitle}
                            </h2>

                            <p className="text-lg">{item.desc}</p>

                            <Button className="flex justify-around w-40 h-15 rounded-lg items-center bg-transparent border border-[var(--text-base)] text-lg hover:text-[var(--text-base-color)] font-semibold hover:bg-cyan-700 hover:border-cyan-700">
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
}

export default CarouselHome;