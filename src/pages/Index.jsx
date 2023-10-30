import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Index() {
    return (
        <div className="w-screen h-screen bg-white flex flex-col justify-between">
            <Header />
            <h1>This is the some random shit</h1>
            <Footer />
        </div>
    );
};

export default Index;