import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppointmentResultMain from "../components/AppointmentResultMain";

function AppointmentResult() {
    return(
        <PageLayout>
            <Header />
            <AppointmentResultMain />
            <Footer />
        </PageLayout>
    );
}

export default AppointmentResult;