import React from "react";
import "../index.css";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={'cursor-default'}>
            <div className="bg-lightSky text-sm text-darkestSky font-semibold w-full flex justify-center items-center h-12">
                <span className={'z-20'}>&copy; Copyright {currentYear}, ReHub</span>
                <span className={'min-[330px]:text-heavierGray absolute font-thin right-0 mr-1 text-sm text-lightSky'}>
                    {process.env.REACT_APP_NAME}&nbsp;{process.env.REACT_APP_VERSION}
                </span>
            </div>
        </footer>
    );
}

export default Footer; 