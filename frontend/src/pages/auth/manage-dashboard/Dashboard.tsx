import Chart from "@/components/auth/dashboard-chart/Chart";
import CardStatistic from "@/components/auth/dashboard-statistic/CardStats";
import { StatsOther } from "@/components/auth/dashboard-statistic/StatsOther";


const Dashboard = () => {

    return (
        <div className="flex flex-col gap-y-4">
            {/* <h1 className="title">Dashboard</h1> */}

            {/* head */}
            <CardStatistic />

            {/* chart view - member */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
                {/* chart view */}
                <div className="card col-span-1 md:col-span-2 lg:col-span-5">
                    <Chart />
                </div>

                {/* top member */}
                {/* <MemberData />
                <Member /> */}
            </div>

            {/* top san pham */}
            <StatsOther />
        </div>
    )
};
export default Dashboard;
