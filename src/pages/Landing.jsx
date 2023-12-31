import React, {useContext, useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../auth/AuthProvider";

import logo from '../assets/RH-logo-no-text.svg';

function Landing() {

    const {isAuthenticated} = useContext(AuthContext);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setIsUserAuthenticated(isAuthenticated);
        if (isUserAuthenticated) {
            navigate('/dashboard');
        }
        const delayedAction = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(delayedAction);
    }, [isUserAuthenticated, isAuthenticated, navigate]);

    return (
        <PageLayout>
            {
                isLoading ?
                    <div className={'h-[100vh] bg-sky-950 flex items-center justify-center z-30'}>
                        <img className={'w-1/2 sm:w-1/3 lg:w-1/5 xl:w-1/6 animate-bounce'} src={logo} alt={'logo-pulse'}/>
                    </div> :
                    <>
                        <Header/>
                        <div className="w-full h-full bg-landing-bg bg-cover bg-center pt-28">
                            <h1 className="whitespace-pre-line sm:text-8xl text-5xl font-bold text-sky-700 ml-10">Mi
                                brinemo{'\n'} o
                                Vašem{'\n'} oporavku</h1>
                            <button
                                className="ml-10 bg-sky-600 sm:p-5 p-2 text-white font-bold rounded-[5px] lg:mt-12 mt-5"
                                onClick={() => navigate('/login')} role='link'> PRIJAVI SE
                            </button>
                        </div>
                        <Footer/>
                    </>
            }
        </PageLayout>
    )
        ;
};

export default Landing;