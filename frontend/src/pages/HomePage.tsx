import React from "react";
import { cn } from "@/utils/cn";
import CarouselHome from "@/components/homepage/carousel/CarouselHome";
import SectionSearch from "@/components/homepage/section-search/SectionSearch";
import SectionTwo from "@/components/homepage/section-two/SectionTwo";
import SectionThree from "@/components/homepage/section-three/SectionThree";
import SectionFour from "@/components/homepage/section-four/SectionFour";
import SectionFive from "@/components/homepage/section-five/SectionFive";
import SectionSix from "@/components/homepage/section-six/SectionSix";


const HomePage = () => {
    const homeProps = [
        { name: <SectionTwo />},
        { name: <SectionThree />},
        { name: <SectionFour />},
        { name: <SectionFive />},
        { name: <SectionSix />}
    ]

    return (
        <React.Fragment>
            <CarouselHome />
            <SectionSearch />

            {homeProps.map((item, index) => (
                <section key={index} className={cn("bg-slate-100 text-slate-700 py-20", 
                    index%2 === 0 ? "" : "bg-slate-50", 
                    index === homeProps.length - 1 && "bg-slate-50",
                )}>
                    <div className="container m-auto">
                        {item.name}
                    </div>
                </section>
            ))}
        </React.Fragment>
    )
}
export default HomePage;