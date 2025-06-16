import { Button } from "@/libs/shadcn/button";



const SectionFour = () => {
    return (
        <div className="grid place-items-center gap-y-6">
            <div className="grid gap-y-4 place-items-center">
                <h2 className="text-4xl font-bold">Tự tay nấu ăn thật sự rất đơn giản ?</h2>
                <p>Đúng vậy! Thật sự rất đơn giản. Công thức có hướng dẫn từng bước, nguyên liệu dễ tìm, ai cũng có thể bắt đầu dù chưa từng nấu ăn.</p>
            </div>

            <div className="border-4 border-slate-400/90 place-self-start rounded-tr-full rounded-br-full w-[70%] h-60 z-2 relative bg-[url(../assets/images/cooking.jpg)] bg-cover bg-center shadow-xl">
                <Button className="h-12 rounded-lg border border-slate-400 bg-slate-300 text-md hover:text-[var(--text-base-color)] font-semibold hover:bg-cyan-600 hover:border-cyan-600 absolute -right-1/4 top-1/2 -translate-y-1/2 shadow-lg">
                    Xem công thức
                </Button>
            </div>
        </div>
    );
};

export default SectionFour;
