import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import addBtn from "../assets/add-button.svg";

function Dashboard() {
    return (
        <PageLayout>
            <Header />
                <div className="grid grid-cols-2 grid-rows-1 gap-5 p-5 h-full">
                    <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                        <div className="bg-sky-600 rounded-t-[5px]">
                            <h3 className="font-bold text-lg text-white p-3">Calendar</h3>
                        </div>
                        <div className="bg-sky-400">

                        </div>
                    </div>
                    <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                        <div className="bg-sky-600 rounded-t-[5px] h-14">
                            <h3 className="font-bold text-lg text-white p-3">Appts</h3>
                        </div>
                        <div className="h-full -mt-14 pt-14 flex items-center justify-center">
                            <Link to={"/"}>
                                <div>
                                    <img src={addBtn} alt="Add appointment button" className="w-40" />
                                </div>
                            </Link>

                        </div>
                    </div>



                </div>
            <Footer/>
        </PageLayout>
    );
};

export default Dashboard;