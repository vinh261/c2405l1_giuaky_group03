import MemberData from "../components/data/add-user/MemberData";
import Chart from "../components/ui/chart/Chart";
import CardStatistic from "../components/ui/dashboard/CardStatistic";
import Member from "../components/ui/dashboard/Member";
import PopularMeal from "../components/ui/dashboard/PopularMeal";
import Footer from "../layouts/Footer";



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
                <MemberData />
                <Member />
            </div>

            {/* top san pham */}
            <PopularMeal />

            {/* <Footer /> */}
            <Footer />
        </div>
    )
};

export default Dashboard;