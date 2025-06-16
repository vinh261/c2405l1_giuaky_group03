import { sectionTwoItems } from "./sectionTwoItems";


const SectionTwo = () => {
    return (
        <div className="grid gap-y-10">
            <h2 className="text-center text-4xl font-bold">Tăng cường năng lượng, cải thiện sức khỏe</h2>

            <div className="w-full grid grid-cols-3 gap-x-4">
                {sectionTwoItems.map((item, index) => (
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