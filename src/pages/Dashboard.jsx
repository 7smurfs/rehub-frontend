import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Dashboard() {
    return (
        <PageLayout>
            <Header />
                <h1 className={' text-center text-3xl'}>Uspjesna prijava. Dobrodosli u <span className={'font-bold'}>ReHub.</span> Stranica u razvoju.</h1>
            <Footer />
        </PageLayout>
    );
};

export default Dashboard;