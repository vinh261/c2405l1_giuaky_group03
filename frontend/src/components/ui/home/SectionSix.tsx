import { Button } from "@/libs/shadcn/button";


const SectionSix = () => {
    return (
        <div className="grid gap-y-4 place-items-center border rounded-full border-slate-300 bg-slate-200 py-10 relative -mb-50 z-2">
            <h2 className="text-4xl font-bold">Bạn đã sẵn sàng bắt đầu cho hành trình nâng cao sức khỏe ?</h2>

            <p className="text-lg font-semibold text-center">
                Hãy để chúng tôi đồng hành cùng bạn! <br />
                Đăng ký thành viên để thực hiện kế hoạch cân bằng dinh dưỡng cùng HealthyVN
            </p>

            <Button className="shadow-lg bg-slate-300 border border-slate-400 text-lg h-12 hover:text-slate-200 hover:bg-cyan-600 hover:border-cyan-600">
                Đăng ký ngay
            </Button>
        </div>
    );
};
export default SectionSix;
