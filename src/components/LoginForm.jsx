import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import userIcon from "../assets/user-icon.svg";

function LoginForm() {

    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password);
    }

    return (
        <div className="flex justify-center">

            {/*Za manje ekrane*/}
            {/* <div className="min-[1024px]:hidden flex flex-col flex-wrap">
            <img src={ LogoWText } alt="Rehub logo" className=""/>
            <label className="font-bold text-sky-600 text-lg mt-[30px] self-start">E-mail:</label>
            <input type="text" name="email" id="email" className="w-[350px] h-[40px] bg-sky-200 opacity-50 rounded-[5px]"/>
            <label className="font-bold text-sky-600 text-lg mt-[15px] self-start">Lozinka:</label>
            <input type="password" name="pass" id="pass" className="w-[350px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px]"/>
            <span className="text-sky-600 self-start">Zaboravljena lozinka?</span>
            <button className="bg-sky-600 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] mt-[45px]">Prijava</button>

            <div className="flex flex-col items-center">
                <span className="text-sky-600 font-bold text-lg mt-[40px]">Kontakt</span>
                <span className="text-sky-600 font-bold text-lg mt-[10px]">Registracija</span>
            </div>
        </div> */}
            {/* TODO: Ovo je za manje ekrane, ali ne radi kako treba, pa sam zakomentarisao */}

            {/*Za desktop*/}
            <div className="w-[420px] h-[430px] bg-white [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] rounded-[10px] mt-8 flex flex-col">
                <div className="w-full h-24 bg-sky-600 opacity-50 rounded-tl-[10px] rounded-tr-[10px] flex justify-center items-end pb-4">
                    <img src={ userIcon } alt="User icon" className="w-[32px] h-[32px] mr-1" />
                    <span className="text-white font-bold text-3xl ml-1">Prijava</span>
                </div>
                <div className="flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col items-center">
                    <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-[60px]">E-mail:</label>
                    <input type="text" name="email" id="email" className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px]" value={email} onChange={e => setEmail(e.target.value)}/>

                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start ml-[60px]">Lozinka:</label>
                    <input type="password" name="pass" id="pass" className="w-[300px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px]" value={password} onChange={e => setPassword(e.target.value)}/>

                    <span className="text-sky-600 self-start ml-[60px]">Zaboravljena lozinka?</span>
                    <button className="bg-sky-600 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] mt-[45px]" onClick={handleSubmit}>Prijava</button>

                </div>
            </div>
        </div>
    );
};

export default LoginForm;