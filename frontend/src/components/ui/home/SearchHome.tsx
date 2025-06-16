import { Button } from "@/libs/shadcn/button";
import Search from "../search/Search";
import React from "react";
import { Carrot, Citrus } from "lucide-react";
import transparent from "@/assets/images/transparent.png"


const SearchHome = () => {
    return (
        <React.Fragment>
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                <clipPath id="search-curve" clipPathUnits="objectBoundingBox">
                    <path d="M 0,1 
                            L 0.25,0.15 
                            Q 0.3,0 0.35,0
                            L 1,0.2 
                            L 1,1 
                            Z" />
                </clipPath>
                </defs>
            </svg>
            
            <div className="clip-path w-full grid place-items-center relative -mt-[199.5px] h-50">
                <div className="flex items-center gap-x-2 z-2 text-slate-700">
                    <Search
                        inputClassName="placeholder:text-slate-400 focus:placeholder:text-slate-300"
                        placeholder="Bạn cần tìm gì?"
                    />

                    <Carrot className="absolute left-150 top-5 text-slate-200" size={50} />
                    <Citrus className="absolute right-100 bottom-5 text-slate-200" size={50} />

                    <Button className="py-5 border border-slate-400 bg-slate-300 transition-colors duration-300 hover:border-cyan-600 hover:bg-cyan-600 hover:text-slate-200">
                        Tìm kiếm
                    </Button>
                </div>

                <img src={transparent} alt="" className="absolute z-2 right-10 top-10 object-cover h-36 opacity-60" />
            </div>
        </React.Fragment>
    );
};

export default SearchHome;
