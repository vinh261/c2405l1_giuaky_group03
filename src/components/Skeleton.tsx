import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonPage = () => {
    return (
        <div className="animate-pulse transition-all duration-700 ease-in">
            <header className="flex justify-between items-center px-10 h-[60px] shadow-lg bg-white dark:bg-gray-800 mb-4">
                {/* Logo */}
                <Skeleton
                    circle={true}
                    height={40}
                    width={40}
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                />

                {/* Nav Items */}
                <div className="flex w-1/2 justify-center items-center gap-x-4">
                    <Skeleton
                        height={20}
                        width={80}
                        baseColor="#e0e0e0"
                        highlightColor="#f5f5f5"
                    />

                    <Skeleton
                        height={20}
                        width={80}
                        baseColor="#e0e0e0"
                        highlightColor="#f5f5f5"
                    />

                    <Skeleton
                        height={20}
                        width={80}
                        baseColor="#e0e0e0"
                        highlightColor="#f5f5f5"
                    />
                </div>

                {/* Profile */}
                <div className="flex items-center justify-center w-[12%]">
                    <div className="flex gap-x-4">
                        <Skeleton
                            height={20}
                            width={60}
                            baseColor="#e0e0e0"
                            highlightColor="#f5f5f5"
                        />

                        <Skeleton
                            height={20}
                            width={50}
                            baseColor="#e0e0e0"
                            highlightColor="#f5f5f5"
                        />
                    </div>

                    {/* Theme */}
                    <Skeleton
                        circle={true}
                        height={30}
                        width={30}
                        style={{ marginLeft: "16px" }}
                        baseColor="#e0e0e0"
                        highlightColor="#f5f5f5"
                    />
                </div>
            </header>

            {/* ------ Content ------------ */}
            <main className="p-10">
                {/* Tiêu đề trang placeholder */}
                <Skeleton
                    height={30}
                    width={"40%"}
                    style={{ marginBottom: 20 }}
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                />

                {/* Một vài dòng text placeholder */}
                <Skeleton
                    count={3}
                    height={20}
                    style={{ marginBottom: 8 }}
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                />

                {/* Một khối nội dung lớn placeholder */}
                <Skeleton
                    height={200}
                    style={{ marginTop: 20, marginBottom: 20 }}
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                />

                <Skeleton
                    count={2}
                    height={20}
                    style={{ marginBottom: 8 }}
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                />
            </main>
        </div>
    );
};

export default SkeletonPage;
