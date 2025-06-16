import React from "react";
import Header from "./layouts/Header";
import { Outlet } from "react-router";
import Footer from "./layouts/Footer";



const UserLayout = () => {
    return (
        <React.Fragment>
            <Header />

            <main>
                <Outlet />
            </main>
            
            <Footer />
        </React.Fragment>
    )
};
export default UserLayout;