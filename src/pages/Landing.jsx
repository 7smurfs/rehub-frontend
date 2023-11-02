import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";

function Index() {
    return (
        <PageLayout>
            <Header />
            <h1>This is the some random shit</h1>
            <Footer />
        </PageLayout>
    );
};

export default Index;