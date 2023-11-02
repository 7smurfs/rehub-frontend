import React from "react";
import ButtonLink from './ButtonLink'

function LandingMain() {
    return(
        <div className="w-screen h-screen bg-landing-bg bg-cover bg-center pt-28">
            <h1 className="whitespace-pre-line text-8xl font-bold text-sky-700 ml-10">Mi brinemo{'\n'} o Vašem{'\n'} oporavku.</h1>
            <ButtonLink />
        </div>
    );
}

export default LandingMain;