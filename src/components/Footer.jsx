import React from "react";
import "../index.css";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={'cursor-default'}>
            <div className="bg-sky-200 text-sm text-sky-950 font-semibold w-full flex justify-center items-center h-12">
                &copy; Copyright  {currentYear}, ReHub
            </div>
        </footer>
    );
}

export default Footer; 