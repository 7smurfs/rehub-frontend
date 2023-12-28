import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserDashMain from "../components/UserDashMain";
import EmployeeDashMain from "../components/EmployeeDashMain";
import SuperAdminDashboard from "../components/SuperAdminDashboard";

function Dashboard() {

    /* Za isprobati ucitavanje potrebnog dashboarda */
    let user = "SUPERADMIN";

    return (
        <>
            <PageLayout>
                <Header/>
                {user === "PATIENT" ? (
                    <UserDashMain/>
                ) : user === "EMPLOYEE" ? (
                    <EmployeeDashMain/>
                ) : (
                    <SuperAdminDashboard/>
                )}
                <Footer/>
                {/* Kad se Footer koristi s UserMain-om pojavi se scroll x */}
                {/*<Footer/>*/}
            </PageLayout>
        </>
    );
}

export default Dashboard;