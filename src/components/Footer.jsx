import React, {useEffect, useState} from "react";
import "../index.css";
import lightSwitch from "../assets/light_switch.svg";
import darkSwitch from "../assets/night_switch.svg";

function Footer() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = sessionStorage.getItem('theme');
        setIsDarkMode(storedTheme === 'dark');
        document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }, []);

    const toggleDarkMode = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        sessionStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', !isDarkMode);
    };

    const currentYear = new Date().getFullYear();
    return (
        <footer className={'cursor-default'}>
            <div className="bg-lightSky dark:bg-black text-sm text-darkestSky dark:text-white font-semibold w-full flex justify-center items-center h-12">
                <img onClick={toggleDarkMode} className={'cursor-pointer absolute h-7 ml-1 left-0'} src={isDarkMode ? darkSwitch : lightSwitch}
                     alt={'theme_switch'}/>
                <span className={'z-20'}>&copy; Copyright {currentYear}, ReHub</span>
                <span className={'min-[330px]:text-heavierGray absolute font-thin right-0 mr-1 text-sm text-lightSky dark:text-mediumGray'}>
                    {process.env.REACT_APP_NAME}&nbsp;{process.env.REACT_APP_VERSION}
                </span>
            </div>
        </footer>
    );
}

export default Footer; 