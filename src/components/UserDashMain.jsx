import React from "react";
import Summary from "./TherapySummary";

function UserDashMain() {

    /* Za isprobati radi li učitavanje prikaza u ovisnosti o broju terapija (0 ili 1 i više) */
    let ct = 2;

    return(
        <div className="grid grid-cols-2 grid-rows-1 h-4/5 gap-5 p-5">
            <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                <div className="bg-sky-600 rounded-t-[5px] h-14">
                    <h3 className="font-bold text-lg text-white p-3">Kalendar</h3>
                </div>
                <div className="bg-sky-400">

                </div>
            </div>

            <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                <div className="bg-sky-600 rounded-t-[5px] h-14">
                    <h3 className="font-bold text-lg text-white p-3">Moji termini</h3>
                </div>

                <div className="h-full -mt-14 pt-14 flex flex-col items-center justify-between">

                    {ct === 0 ? (
                        <>
                            <div className="h-5/6 w-11/12 mt-4 flex justify-center items-center bg-white">
                                <span>Ovdje će biti prikazani Vaši termini</span>

                            </div>

                            <div className="h-1/6 w-full flex flex-col justify-center items-center">
                                <button
                                    className="bg-sky-600 p-5 h-2/3 flex items-center justify-center text-white font-semibold rounded-[5px]">Dodaj
                                    novi termin
                                </button>
                            </div>
                        </>


                    ) : (
                        <>
                            <div
                                className="h-5/6 w-11/12 mt-4 p-5 flex flex-col items-center gap-3 bg-white overflow-y-scroll">

                                {/* Stavljeno za isprobati overflow scroll */}

                                <Summary/>
                                <Summary/>
                                <Summary/>
                                <Summary/>
                                <Summary/>
                                <Summary/>
                                <Summary/>
                                <Summary/>
                            </div>

                            <div className="h-1/6 w-full flex flex-col justify-center items-center">
                                <button className="bg-sky-600 p-5 h-2/3 flex items-center justify-center text-white font-semibold rounded-[5px]">Dodaj novi termin</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDashMain;