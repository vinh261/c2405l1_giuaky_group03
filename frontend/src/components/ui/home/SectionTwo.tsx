import calc from "@/assets/images/Calculator-pana.svg"
import choise from "@/assets/images/manual-rafiki.svg"
import foods from "@/assets/images/foods.svg"


const SectionTwo = () => {
    const SectionTwo = [
        {
            image: calc,
            alt: "Calculator",
            title: "Kiểm soát calo như chuyên gia",
            desc: "Công thức nấu ăn, thực đơn phù hợp thể trạng, không nhàm chán và không rối rắm."
        },
        {
            image: choise,
            alt: "Choise",
            title: "Tự do xây dựng thực đơn theo ý thích",
            desc: "Bạn có thể dùng thử miễn phí ngay hôm nay, và nếu bạn từng thất bại trước đó, đây chính là điều bạn cần để bắt đầu lại."
        },
        {
            image: foods,
            alt: "Fooos",
            title: "Đa Dạng Vùng Miền, Quốc Gia",
            desc: "Công thức nấu ăn đa dạng được cập nhật thường xuyên, không còn xoay quanh những món tẻ nhạt như luộc hay hấp nữa."
        },
    ]

    return (
        <div className="grid gap-y-10">
            <h2 className="text-center text-4xl font-bold">Tăng cường năng lượng, cải thiện sức khỏe</h2>

            <div className="w-full grid grid-cols-3 gap-x-4">
                {SectionTwo.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 gap-x-4 border rounded-xl p-6 border-slate-300 transition-colors bg-white shadow-lg">
                        <img src={item.image} alt={item.alt} className="object-cover image-container" />

                        <span className="flex flex-col justify-evenly">
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-justify italic">{item.desc}</p>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SectionTwo;