import React from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/right-arrow.svg";

function TherapySummary() {
    return (
        <div className="rounded-[5px] w-full">
            <div className="bg-blue-900 h-auto p-1 rounded-t-[5px]">
                <h5 className="text-white font-semibold">Terapija x</h5>
            </div>
            <div className="bg-sky-100 h-14 p-3 flex justify-between rounded-b-[5px]">
                <span className="flex h-full items-center font-semibold">dd.mm.yyyy hh:mm-hh:mm</span>
                <Link to={"/"}>
                    <img src={ arrow } alt="Arrow" className="h-8"/>
                </Link>
            </div>
        </div>
    );
}

export default TherapySummary;