import React from "react";
import userIcon from "../assets/user-icon.svg";
import hide from "../assets/hide-pass.svg";
import show from "../assets/show-pass.svg";
import {Link} from "react-router-dom";

function PassResetMain() {
    return(
        <>
            <form className="flex justify-center">
                <div
                    className="w-[420px] h-[430px] bg-white [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] rounded-[10px] mt-8 flex flex-col">
                    <div className="w-full h-40 bg-sky-600 opacity-50 rounded-tl-[10px] rounded-tr-[10px] flex justify-center items-center">
                        <span className="text-white font-bold text-lg ml-1 w-2/3 text-center">Upišite e-mail adresu korisničkog računa za koji želite promijeniti lozinku</span>
                    </div>
                    <form className="flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col items-center">
                        <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-[60px]">E-mail:</label>
                        <input type="text" name="email" id="email"
                               className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>

                        <button className="bg-sky-600 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] mt-[45px]">Nastavi
                        </button>
                    </form>
                </div>
            </form>

        </>
    );
}

export default PassResetMain;