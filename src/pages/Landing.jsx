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
        }, 1333);
        return () => clearTimeout(delayedAction);
    }, [isUserAuthenticated, isAuthenticated, navigate]);

    return (
        <PageLayout>
            <div className="bg-landing-bg" style={{width: 0, height: 0}}></div>
            {
                isLoading ?
                    <div
                        className={sessionStorage.getItem('theme') === 'dark' ?
                            'h-[100vh] bg-black flex items-center justify-center z-30' :
                            'h-[100vh] bg-darkerSky flex items-center justify-center z-30'}>
                        <img className={'w-1/2 sm:w-1/3 lg:w-1/5 xl:w-1/6 animate-bounce'} src={logo}
                             alt={'logo-pulse'}/>
                    </div> :
                    <>
                        <Header/>
                        <div className="w-full h-full bg-landing-bg dark:bg-landing-bg-dark bg-cover bg-center pt-28">
                            <h1 className="dark:drop-shadow-lg whitespace-pre-line sm:text-8xl text-5xl font-bold text-darkSky dark:text-darkestSky ml-10">Mi
                                brinemo{'\n'} o
                                Vašem{'\n'} oporavku</h1>
                            <button
                                className="ml-10 mb-10 bg-mediumSky dark:bg-darkestSky hover:bg-darkSky hover:dark:bg-darkerSky shadow-md shadow-darkestSky dark:shadow-md dark:shadow-black transition-all duration-300 sm:p-5 p-2 text-white font-bold rounded-[5px] lg:mt-12 mt-5"
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