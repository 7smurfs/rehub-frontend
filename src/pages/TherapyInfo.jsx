import React, {useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
import {useParams} from "react-router-dom";

function TherapyInfo() {
    const params = useParams();

    useEffect(() => {
        console.log(params);
    }, [params]);
    return(
        <PageLayout>
            <Header />
            <></>
            <Footer />
        </PageLayout>
    );
}

export default TherapyInfo;