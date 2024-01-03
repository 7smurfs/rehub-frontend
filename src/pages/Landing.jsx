import React, {useContext, useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
import LandingMain from "../components/LandingMain";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../auth/AuthProvider";

function Landing() {

    const { isAuthenticated } = useContext(AuthContext);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        setIsUserAuthenticated(isAuthenticated);
        if (isUserAuthenticated) {
            navigate('/dashboard');
        }
    }, [isUserAuthenticated, isAuthenticated, navigate]);

    return (
        <PageLayout>
            <Header />
            <LandingMain />
            <Footer />
        </PageLayout>
    );
};

export default Landing;