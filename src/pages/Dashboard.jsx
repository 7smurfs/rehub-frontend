import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import addBtn from "../assets/add-button.svg";
import arrow from "../assets/right-arrow.svg";

function Dashboard() {
    return (
        <PageLayout>
            <Header/>

            {/*TODO: na temelju broja termina prikazivati div1 panel (ako ih je 0) ili div2 panel (ako ih je 1 i vise)*/}

            <div className="grid grid-cols-2 grid-rows-1 gap-5 p-5 h-full">
                <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                    <div className="bg-sky-600 rounded-t-[5px]">
                        <h3 className="font-bold text-lg text-white p-3">Kalendar</h3>
                    </div>
                    <div className="bg-sky-400">

                    </div>
                </div>

                {/* div1 panel */}
                <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                    <div className="bg-sky-600 rounded-t-[5px] h-14">
                        <h3 className="font-bold text-lg text-white p-3">Moji termini</h3>
                    </div>

                    <div className="h-full -mt-14 pt-14 flex items-center justify-center">
                        <Link to={"/"}>
                            <div>
                                <img src={ addBtn } alt="Add appointment button" className="w-40"/>
                            </div>
                        </Link>

                    </div>
                </div>


                {/* div2 panel */}
                {/*<div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                    <div className="bg-sky-600 rounded-t-[5px] h-14">
                        <h3 className="font-bold text-lg text-white p-3">Moji termini</h3>
                    </div>




                </div>*/}
            </div>


            {/*<div className="grid grid-cols-2 grid-rows-1 gap-5 p-5 h-full">
                <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                    <div className="bg-sky-600 rounded-t-[5px]">
                        <h3 className="font-bold text-lg text-white p-3">Kalendar</h3>
                    </div>
                    <div className="bg-sky-400">

                    </div>
                </div>

                <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                    <div className="bg-sky-600 rounded-t-[5px] h-14 z-10">
                        <h3 className="font-bold text-lg text-white p-3">Moji termini</h3>
                    </div>

                     div2
                    <div
                        className="h-[450px] w-full -mt-14 pt-20 pl-5 pr-5 flex flex-col items-center justify-between gap-5 overflow-y-scroll">
                        <div className="w-full flex flex-col gap-3 ">
                            <div className="rounded-[5px]">
                                <div className="bg-blue-900 h-auto p-1 rounded-t-[5px]">
                                    <h5 className="text-white font-semibold">Terapija 1</h5>
                                </div>
                                <div className="bg-white h-14 p-3 flex justify-between rounded-b-[5px]">
                                        <span
                                            className="flex h-full items-center font-semibold">12.1.2024 08:00-09:00</span>
                                    <Link to={"/"}>
                                        <img src={arrow} alt="Arrow" className="h-8"/>
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-[5px]">
                                <div className="bg-blue-900 h-auto p-1 rounded-t-[5px]">
                                    <h5 className="text-white font-semibold">Terapija 2</h5>
                                </div>
                                <div className="bg-white h-14 p-3 flex justify-between rounded-b-[5px]">
                                    <span
                                        className="flex h-full items-center font-semibold">12.4.2024 07:00-08:30</span>
                                    <Link to={"/"}>
                                        <img src={arrow} alt="Arrow" className="h-8"/>
                                    </Link>

                                </div>
                            </div>

                            <div className="rounded-[5px]">
                                <div className="bg-blue-900 h-auto p-1 rounded-t-[5px]">
                                    <h5 className="text-white font-semibold">Terapija 1</h5>
                                </div>
                                <div className="bg-white h-14 p-3 flex justify-between rounded-b-[5px]">
                                        <span
                                            className="flex h-full items-center font-semibold">12.1.2024 08:00-09:00</span>
                                    <Link to={"/"}>
                                        <img src={arrow} alt="Arrow" className="h-8"/>
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-[5px]">
                                <div className="bg-blue-900 h-auto p-1 rounded-t-[5px]">
                                    <h5 className="text-white font-semibold">Terapija 1</h5>
                                </div>
                                <div className="bg-white h-14 p-3 flex justify-between rounded-b-[5px]">
                                        <span
                                            className="flex h-full items-center font-semibold">12.1.2024 08:00-09:00</span>
                                    <Link to={"/"}>
                                        <img src={arrow} alt="Arrow" className="h-8"/>
                                    </Link>
                                </div>
                            </div>


                            <div className="rounded-[5px]">
                                <div className="bg-blue-900 h-auto p-1 rounded-t-[5px]">
                                    <h5 className="text-white font-semibold">Terapija 1</h5>
                                </div>
                                <div className="bg-white h-14 p-3 flex justify-between rounded-b-[5px]">
                                        <span
                                            className="flex h-full items-center font-semibold">12.1.2024 08:00-09:00</span>
                                    <Link to={"/"}>
                                        <img src={arrow} alt="Arrow" className="h-8"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="bg-blue-900 text-white font-bold p-5 mb-3 rounded-[5px]">Dodaj novi
                    termin
                </button>

            </div>*/}
            <Footer/>
        </PageLayout>
    );
};

export default Dashboard;