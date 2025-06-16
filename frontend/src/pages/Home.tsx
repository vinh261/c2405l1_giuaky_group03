import CarouselHome from "@/components/ui/home/CarouselHome";
import SearchHome from "@/components/ui/home/SearchHome";
import SectionFive from "@/components/ui/home/SectionFive";
import SectionFour from "@/components/ui/home/SectionFour";
import SectionSix from "@/components/ui/home/SectionSix";
import SectionThree from "@/components/ui/home/SectionThree";
import SectionTwo from "@/components/ui/home/SectionTwo";
import { cn } from "@/libs/utils";
import React from "react";


const Home = () => {
    const HomeProps = [
        { name: <SectionTwo />},
        { name: <SectionThree />},
        { name: <SectionFour />},
        { name: <SectionFive />},
        { name: <SectionSix />}
    ]

    return (
        <React.Fragment>
            <CarouselHome />
            <SearchHome />

            {HomeProps.map((item, index) => (
                <section key={index} className={cn("bg-slate-100 text-slate-700 py-20", 
                    index%2 === 0 ? "" : "bg-slate-50", 
                    index === HomeProps.length - 1 && "bg-slate-50",
                )}>
                    <div className="container-page">
                        {item.name}
                    </div>
                </section>
            ))}
        </React.Fragment>
    )
};

export default Home;
