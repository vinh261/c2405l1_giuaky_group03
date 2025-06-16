import type { CarouselApi } from "@/libs/shadcn/ui/carousel";
import { useCallback, useEffect, useState } from "react";


export const useSectionFiveLogic = () => {
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

    return {
        setCarouselApi, activeIndex, scrollSnaps, carouselApi
    }
}