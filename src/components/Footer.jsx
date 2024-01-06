import React from "react";
import "../index.css";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={'cursor-default'}>
            <div className="bg-sky-200 text-sm text-sky-950 font-semibold w-full flex justify-center items-center h-12">
                <span className={'z-20'}>&copy; Copyright {currentYear}, ReHub</span>
                <span className={'min-[330px]:text-gray-700 absolute font-thin right-0 mr-1 text-sm text-sky-200'}>
                    {process.env.REACT_APP_NAME}&nbsp;{process.env.REACT_APP_VERSION}
                </span>
            </div>
        </footer>
    );
}

export default Footer; 