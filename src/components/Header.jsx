import React from "react";
import LogoWText from "../assets/RH-logo-with-text.svg";

function Header() {
    return(
        <div>
            <header className="bg-sky-200 w-screen h-28 flex justify-between">
                <img src={ LogoWText } alt="ReHub logo with text" className="w-56 mb-2 max-[1024px]:hidden"/>
                <div className="flex justify-between">
                    <button className="bg-sky-600 mr-2 flex w-36 h-24 rounded-br-[5px] rounded-bl-[5px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.4)] justify-center max-[1024px]:hidden">
                        <span className="text-white font-bold p-5 self-end">Kontakt</span>
                    </button>
                    <button className="bg-sky-600 mr-6 ml-2 flex w-36 h-24 rounded-br-[5px] rounded-bl-[5px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.4)] justify-center max-[1024px]:hidden">
                        <span className="text-white font-bold p-5 self-end">Registracija</span>
                    </button>
                </div>
            </header>

            <div className="bg-sky-600 w-screen h-9 opacity-50"></div>
        </div>
    );
}

export default Header;