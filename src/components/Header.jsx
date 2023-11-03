import React, { useContext, useState, useEffect } from "react";
import LogoWText from "../assets/RH-logo-with-text.svg";
import { AuthContext } from "../auth/AuthProvider"; // replace with the actual path
import { useNavigate } from "react-router-dom";

function Header() {

    const { isAuthenticated, logout } = useContext(AuthContext);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        setIsUserAuthenticated(isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div>
            <header className="bg-sky-200 w-screen h-28 flex justify-between">
                <img src={LogoWText} alt="ReHub logo with text" className="w-56 mb-2" />
                <div className="flex justify-between">
                    <button className="bg-sky-600 mr-2 flex w-36 h-24 rounded-br-[5px] rounded-bl-[5px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.4)] justify-center">
                        <span className="text-white font-bold p-5 self-end">Kontakt</span>
                    </button>
                    {isUserAuthenticated ? (
                        <button onClick={logout} className="bg-sky-600 mr-2 flex w-36 h-24 rounded-br-[5px] rounded-bl-[5px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.4)] justify-center">
                            <span className="text-white font-bold p-5 self-end">Logout</span>
                        </button>
                    ) : (
                        <button onClick={() => navigate("/register")} className="bg-sky-600 mr-6 ml-2 flex w-36 h-24 rounded-br-[5px] rounded-bl-[5px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.4)] justify-center">
                            <span className="text-white font-bold p-5 self-end">Registracija</span>
                        </button>
                    )}
                </div>
            </header>

            <div className="bg-sky-600 w-screen h-9 opacity-50"></div>
        </div>
    );
}

export default Header;