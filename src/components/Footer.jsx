import React, {useEffect, useState} from "react";
import "../index.css";
import lightSwitch from "../assets/light_switch.svg";
import darkSwitch from "../assets/night_switch.svg";

function Footer() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = sessionStorage.getItem('theme');
        setIsDarkMode(storedTheme === 'dark');
    }, []);

    const toggleDarkMode = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        sessionStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', isDarkMode);
    };
    const currentYear = new Date().getFullYear();
    return (
        <footer className={'cursor-default'}>
            <div className="bg-lightSky text-sm text-darkestSky font-semibold w-full flex justify-center items-center h-12">
                <img onClick={toggleDarkMode} className={'cursor-pointer absolute h-7 ml-1 left-0'} src={isDarkMode ? lightSwitch : darkSwitch}
                     alt={'theme_switch'}/>
                <span className={'z-20'}>&copy; Copyright {currentYear}, ReHub</span>
                <span className={'min-[330px]:text-heavierGray absolute font-thin right-0 mr-1 text-sm text-lightSky'}>
                    {process.env.REACT_APP_NAME}&nbsp;{process.env.REACT_APP_VERSION}
                </span>
            </div>
        </footer>
    );
}

export default Footer; 