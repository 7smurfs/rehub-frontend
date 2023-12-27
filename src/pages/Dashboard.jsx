import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserDashMain from "../components/UserDashMain";
import EmployeeDashMain from "../components/EmployeeDashMain";
import AdminDashMain from "../components/AdminDashMain";

function Dashboard() {

    /* Za isprobati ucitavanje potrebnog dashboarda */
    let user = "User";

    return (
        <PageLayout>
            <Header/>

            {user === "User" ? (

                <UserDashMain />

            ) : user === "Employee" ? (
                <>
                    <EmployeeDashMain />
                    <Footer />
                </>

                ) : (
                    <>
                        <AdminDashMain />
                        <Footer />
                    </>

                )}

            {/* Kad se Footer koristi s UserMain-om pojavi se scroll x */}
            {/*<Footer/>*/}
        </PageLayout>
    );
}

export default Dashboard;