import cahoisotchanhday from '@/assets/images/cahoisotchanhday.png'
import comgaoluc from '@/assets/images/comgaoluc.png'
import comsuonnac from '@/assets/images/comsuonnac.png'
import banhmi from '@/assets/images/banhmi.png'
import thitboxaodongco from '@/assets/images/thitboxaodongco.png'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/libs/shadcn/carousel'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/libs/shadcn/button'


const SectionThree = () => {
    const SectionThree = [
        {
            image: banhmi,
            name: "Bánh mì nấm chay nướng",
        },
        {
            image: cahoisotchanhday,
            name: "Cá hồi sốt chanh dây",
        },
        {
            image: comgaoluc,
            name: "Cơm gạo lứt xào rau củ",
        },
        {
            image: comsuonnac,
            name: "Cơm gạo lứt sườn nạc",
        },
        {
            image: thitboxaodongco,
            name: "Cơm thịt bò xào nấm đông cô",
        }
    ]

    return (
        <div className="grid gap-y-[calc(40px-36px)]">
            <h2 className="text-center text-4xl font-bold">Món mới mỗi tuần</h2>

            <Carousel opts={{align: "start", duration: 50}}>
                <p className="w-fit text-lg flex justify-self-end items-center underline underline-offset-4 mb-2 hover:text-sky-600 cursor-pointer">
                    Xem thực đơn
                    <ArrowRight />
                </p>

                <CarouselContent className="flex">
                    {SectionThree.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/4 w-4/5 relative">
                            <img src={item.image} alt="" className="rounded-xl border border-slate-300" />

                            <div className="overlay flex flex-col justify-between absolute bottom-0 w-[95%] p-4 pt-8">
                                <p className="text-2xl font-semibold text-teal-100 z-2 whitespace-nowrap mb-2">{item.name}</p>
                                
                                <Button className='text-slate-200 z-2 h-12 rounded-lg bg-transparent border border-[var(--text-base)] text-md hover:text-[var(--text-base-color)] font-semibold hover:bg-teal-600 hover:border-teal-600 shadow-lg'>
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
};

export default SectionThree;
