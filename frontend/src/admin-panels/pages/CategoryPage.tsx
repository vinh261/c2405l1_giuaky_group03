import React from "react";
import { CategoryItem } from "../components/data/categories/CategoryItem";


const CategoryPage = () => {
    return (
        <React.Fragment>
            <div className="grid gap-y-20">
                <p className="title">Danh mục</p>

                <div className="grid grid-cols-3 gap-4 w-fit m-auto">
                    {CategoryItem.map((items, index) => (
                        <div key={index} className="card w-90 h-150 overflow-hidden cursor-pointer">
                            <img src={items.img} alt="" className="object-cover hover:scale-90 duration-300" />

                            <p className="title text-center content-center h-full">
                                {items.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
};

export default CategoryPage;
