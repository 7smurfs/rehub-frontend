import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../auth/AuthProvider";
import {useNavigate, useLocation} from "react-router-dom";
import closedHamburger from '../assets/hamburger_menu.svg';
import openedHamburger from '../assets/hamburger_menu_closed.svg';
import whiteLogo from "../assets/RH-logo-with-text-white.svg";
import LogoWText from "../assets/RH-logo-with-text.svg"

function Header() {

    const {isAuthenticated, logout, userInfo} = useContext(AuthContext);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(isAuthenticated);

    const [openHamburger, setOpenHamburger] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsUserAuthenticated(isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div>
            <header
                className={openHamburger ? "h-[100vh] fixed top-0 right-0 flex flex-col items-center w-full lg:hidden bg-lightSky dark:bg-heavyGray z-20" :
                    "bg-lightSky dark:bg-darkestSky h-28 flex justify-between"}>
                <img src={LogoWText} alt="logo_text" onClick={() => navigate("/")}
                     className="w-40 sm:w-56 mb-2 cursor-pointer block dark:hidden"/>
                <img src={whiteLogo} alt="logo_text" onClick={() => navigate("/")}
                     className="w-40 sm:w-56 mb-2 cursor-pointer dark:block hidden"/>
                <div
                    className={openHamburger ? "flex flex-col justify-around h-1/2 my-5" : "lg:flex justify-between hidden"}>
                    {isUserAuthenticated ? (location.pathname === '/profile' ? (
                        <>
                            <button onClick={() => navigate("/contact")}
                                    className="hover:bg-darkSky hover:dark:bg-darkSky dark:bg-darkerSky transition-all duration-300 bg-mediumSky mr-2 flex w-36 lg:h-24 rounded-[5px] lg:rounded-t-none lg:shadow-md lg:dark:shadow-lg lg:shadow-darkSky lg:dark:shadow-black justify-center">
                                <span className="text-white font-bold p-5 self-end">Kontakt</span>
                            </button>
                            <button onClick={logout}
                                    className="hover:bg-darkSky hover:dark:bg-darkSky dark:bg-darkerSky transition-all duration-300 bg-mediumSky mr-2 flex w-36 lg:h-24 rounded-[5px] lg:rounded-t-none lg:shadow-md lg:dark:shadow-lg lg:shadow-darkSky lg:dark:shadow-black justify-center">
                                <span className="text-white font-bold p-5 self-end">Odjava</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/profile")}
                                    className="hover:bg-darkSky hover:dark:bg-darkSky dark:bg-darkerSky transition-all duration-300 bg-mediumSky mr-2 flex w-36 lg:h-24 rounded-[5px] lg:rounded-t-none lg:shadow-md lg:dark:shadow-lg lg:shadow-darkSky lg:dark:shadow-black justify-center">
                                <span
                                    className="text-white font-bold p-5 self-end">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                            </button>
                            <button onClick={() => navigate("/contact")}
                                    className="hover:bg-darkSky hover:dark:bg-darkSky dark:bg-darkerSky transition-all duration-300 bg-mediumSky mr-2 flex w-36 lg:h-24 rounded-[5px] lg:rounded-t-none lg:shadow-md lg:dark:shadow-lg lg:shadow-darkSky lg:dark:shadow-black justify-center">
                                <span className="text-white font-bold p-5 self-end">Kontakt</span>
                            </button>
                            <button onClick={logout}
                                    className="hover:bg-darkSky hover:dark:bg-darkSky dark:bg-darkerSky transition-all duration-300 bg-mediumSky mr-2 flex w-36 lg:h-24 rounded-[5px] lg:rounded-t-none lg:shadow-md lg:dark:shadow-lg lg:shadow-darkSky lg:dark:shadow-black justify-center">
                                <span className="text-white font-bold p-5 self-end">Odjava</span>
                            </button>
                        </>
                    )) : (
                        <>
                            <button onClick={() => navigate("/faq")}
                                    className="hover:bg-darkSky hover:dark:bg-darkSky dark:bg-darkerSky transition-all duration-300 bg-mediumSky mr-2 flex w-36 lg:h-24 rounded-[5px] lg:rounded-t-none lg:shadow-md lg:dark:shadow-lg lg:shadow-darkSky lg:dark:shadow-black justify-center">
                                <span className="text-white font-bold p-5 self-end">FAQ</span>
                            </button>
                            <button onClick={() => navigate("/contact")}
                                    className="hover:bg-darkSky hover:dark:bg-darkSky dark:bg-darkerSky transition-all duration-300 bg-mediumSky mr-2 flex w-36 lg:h-24 rounded-[5px] lg:rounded-t-none lg:shadow-md lg:dark:shadow-lg lg:shadow-darkSky lg:dark:shadow-black justify-center">
                                <span className="text-white font-bold p-5 self-end">Kontakt</span>
                            </button>
                            <button onClick={() => navigate("/register")}
                                    className="hover:bg-darkSky hover:dark:bg-darkSky dark:bg-darkerSky transition-all duration-300 bg-mediumSky mr-2 flex w-36 lg:h-24 rounded-[5px] lg:rounded-t-none lg:shadow-md lg:dark:shadow-lg lg:shadow-darkSky lg:dark:shadow-black justify-center">
                                <span className="text-white font-bold p-5 self-end">Registracija</span>
                            </button>
                            <button onClick={() => navigate("/login")}
                                    className="hover:bg-darkSky hover:dark:bg-darkSky dark:bg-darkerSky transition-all duration-300 bg-mediumSky mr-2 flex w-36 lg:h-24 rounded-[5px] lg:rounded-t-none lg:shadow-md lg:dark:shadow-lg lg:shadow-darkSky lg:dark:shadow-black justify-center">
                                <span className="text-white font-bold p-5 self-end">Prijava</span>
                            </button>
                        </>
                    )}
                </div>
                <div className={'lg:hidden flex justify-center items-center mx-4'}>
                    {openHamburger ?
                        <img onClick={() => setOpenHamburger(o => !o)} className={'h-7 cursor-pointer'}
                             src={openedHamburger}
                             alt={'openedHamburger'}/> :
                        <img onClick={() => setOpenHamburger(o => !o)} className={'h-7 cursor-pointer'}
                             src={closedHamburger}
                             alt={'closedHamburger'}/>}
                </div>

            </header>
            <div className="bg-mediumSky dark:bg-darkerSky dark:opacity-100 w-full h-9 opacity-50"></div>
        </div>
    );
}

export default Header;
