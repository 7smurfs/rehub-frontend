import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
import LandingMain from "../components/LandingMain";

function Index() {
    return (
        <PageLayout>
            <Header />
            <LandingMain />
            <Footer />
        </PageLayout>
    );
};

export default Index;