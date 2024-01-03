import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQComponent from "../components/FAQComponent";

function FAQ() {

    return (
        <PageLayout>
            <Header />
            <FAQComponent />
            <Footer />
        </PageLayout>
    );
}

export default FAQ;
