import React from "react";
import {useNavigate} from "react-router-dom";

function LandingMain() {
    let navigate = useNavigate();
    return (
        <div className="w-full h-full bg-landing-bg bg-cover bg-center pt-28">
            <h1 className="whitespace-pre-line sm:text-8xl text-5xl font-bold text-sky-700 ml-10">Mi brinemo{'\n'} o
                Vašem{'\n'} oporavku</h1>
            <button className="ml-10 bg-sky-600 sm:p-5 p-2 text-white font-bold rounded-[5px] lg:mt-12 mt-5"
                    onClick={() => navigate('/login')} role='link'> PRIJAVI SE
            </button>
        </div>
    );
}

export default LandingMain;