import React from "react";

function LandingMain() {
    return(
        <div className="w-screen h-screen bg-landing-bg bg-cover bg-center pt-28">
            <h1 className="whitespace-pre-line text-8xl font-bold text-sky-700 ml-10">Mi brinemo{'\n'} o Vašem{'\n'} oporavku.</h1>
            <div className="flex justify-start pl-11">
                <button className="bg-sky-600 p-5 text-white font-bold rounded-[5px] mt-12 mb-10"> PRIJAVI SE </button>
            </div>
        </div>
    );
}

export default LandingMain;