import React, { useContext, useState, useEffect } from "react";
import LogoWText from "../assets/RH-logo-with-text.svg";
import { AuthContext } from "../auth/AuthProvider"; // replace with the actual path
import { useNavigate } from "react-router-dom";

function Header() {

    const { isAuthenticated, logout, userInfo } = useContext(AuthContext);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        setIsUserAuthenticated(isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div>
            <header className="bg-sky-200 w-screen h-28 flex justify-between">
                <img src={LogoWText} alt="ReHub logo with text" onClick={() => navigate("/")} className="w-56 mb-2 cursor-pointer" />
                <div className="flex justify-between">
                    {/* If authenticated then Moj profil, kontakt, odjava. Else: kontakt, register, prijava */}
                    {isUserAuthenticated ? (
                        <>
                            <Button text={`${userInfo.firstName} ${userInfo.lastName}`} onClick={() => navigate("/profile")} />
                            <Button text="Kontakt" onClick={() => navigate("/contact")} />
                            <Button text="Odjava" onClick={logout} />
                        </>
                    ) : (
                        <>
                            <Button text={"FAQ"} onClick={() => navigate('/faq')} />
                            <Button text="Kontakt" onClick={() => navigate("/contact")} />
                            <Button text="Registracija" onClick={() => navigate("/register")} />
                            <Button text="Prijava" onClick={() => navigate("/login")} />
                        </>
                    )}
                </div>
            </header>
            <div className="bg-sky-600 w-screen h-9 opacity-50"></div>
        </div>
    );
}

function Button({ text, onClick }) {
    return (
        <button onClick={onClick} className="bg-sky-600 mr-2 flex w-36 h-24 rounded-br-[5px] rounded-bl-[5px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.4)] justify-center">
            <span className="text-white font-bold p-5 self-end">{text}</span>
        </button>
    );
}

export default Header;