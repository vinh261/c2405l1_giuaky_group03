import no_img from "@/assets/images/image.png"
import meal_no_img from "@/assets/images/menu/no-image.jpg"


export const formatImage = (image: string | undefined) => {
    return image ? image : no_img;
}

export const formatMealImage = (image: string | undefined) => {
    return image ? image : meal_no_img;
}

export const formatData = (value: string) => {
    return value ? value : "Chưa có dữ liệu";
};
