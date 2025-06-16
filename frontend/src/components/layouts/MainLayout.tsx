import React from "react";
import Header from "../common/header/Header";
import { Outlet } from "react-router";
import Footer from "../common/footer/Footer";


const MainLayout = () => {
    return (
        <React.Fragment>
            <Header />

            <main>
                <Outlet />
            </main>
            
            <Footer />
        </React.Fragment>
    );
};
export default MainLayout;
