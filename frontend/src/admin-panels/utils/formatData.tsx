import no_img from "../../assets/images/image.png"


export const formatImage = (image: string | null) => {
    return image ? image : no_img;
}

export const formatData = (value: string) => {
    return value ? value : "Chưa có dữ liệu";
};


export const formatDate = (dateInput: Date | string | null | undefined): string => {
    // Kiểm tra nếu dateInput là null, undefined hoặc chuỗi rỗng
    if (!dateInput) {
        return 'N/A'; // Hoặc một giá trị mặc định khác bạn muốn
    }

    try {
        // Tạo đối tượng Date từ input.
        // Nếu dateInput đã là Date object, new Date(dateInput) vẫn hoạt động đúng.
        const date = new Date(dateInput);

        // Kiểm tra xem date có phải là một ngày hợp lệ không
        // (ví dụ: nếu dateInput là một chuỗi không thể parse thành ngày)
        if (isNaN(date.getTime())) {
            console.warn("formatDate nhận vào một ngày không hợp lệ:", dateInput);
            return 'Ngày không hợp lệ';
        }

        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    } catch (error) {
        console.error("Lỗi khi format ngày:", dateInput, error);
        // Có thể trả về chuỗi gốc nếu không format được, hoặc một thông báo lỗi
        return String(dateInput); // Hoặc 'Lỗi ngày'
    }
};