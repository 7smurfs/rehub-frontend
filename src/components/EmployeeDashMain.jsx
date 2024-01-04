import React from "react";
import AppointmentRequest from "./AppointmentRequest";

function EmployeeDashMain() {

    let ct = 1;

    return(
        <div className="h-[75%] grid grid-cols-4 grid-rows-2 gap-2 p-2">
            <div className={"h-full row-span-2 col-span-2 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 rounded-tl-[5px] rounded-tr-[5px] flex items-center justify-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Kalendar</span>
                </div>
                <div className={'h-4/5 w-full'}>

                </div>
            </div>
            <div className={"h-full row-span-2 col-span-1 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 flex justify-center items-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Pregled prijava</span>
                </div>
                {ct === 0 ? (
                    <div className={'bg-sky-50 h-5/6 mx-2 flex items-center justify-center'}>
                        <span className={'text-gray-500 text-lg'}>Trenutno nema aktivnih prijava.</span>
                    </div>
                ) : (
                    <div className={'h-5/6 overflow-y-scroll bg-sky-50 mx-2 p-3 flex flex-col gap-3'}>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                        <AppointmentRequest/>
                    </div>
                )}

            </div>
            <div className={"row-span-1 col-span-1 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 flex justify-center items-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Sobe/Ordinacije</span>
                </div>
                <div className={'h-4/5 bg-sky-50 mx-2 overflow-y-scroll'}>

                </div>
            </div>
            <div className={"row-span-1 col-span-1 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 flex justify-center items-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Oprema</span>
                </div>
                <div className={'h-4/5 bg-sky-50 mx-2 overflow-y-scroll'}>

                </div>
            </div>
        </div>
    );
}

export default EmployeeDashMain;