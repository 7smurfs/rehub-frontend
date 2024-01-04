import React from "react";
import { useNavigate } from "react-router-dom";

function AssignApptMain() {

    const navigate = useNavigate();

    return(
        <div className={'h-full flex flex-col'}>
            <div className={'h-14 flex items-center pl-5'}>
                <h1 className={'text-sky-800 font-bold text-2xl underline'}>Pacijent Luka Lukić</h1>
            </div>
            <div className={'h-full grid grid-cols-4 grid-rows-2 gap-3 pl-3 pr-3 pb-3'}>
                <div className={'col-span-2 row-span-1 py-2'}>
                    <div className={'h-8 flex items-center pl-3'}>
                        <span className={'w-52 font-bold text-sky-600'}>Dolazak:</span>
                        <span>Prvi</span>
                    </div>
                    <div className={'h-8 flex items-center pl-3'}>
                        <span className={'w-52 font-bold text-sky-600'}>Vrsta oboljenja:</span>
                        <span>Prijelom potkoljenice</span>
                    </div>
                    <div className={'h-8 flex items-center pl-3'}>
                        <span className={'w-52 font-bold text-sky-600'}>Opis oboljenja:</span>
                        <span>Potrebna rehabilitacija nakon skidanja gipsa</span>
                    </div>
                    <div className={'h-8 flex items-center pl-3'}>
                        <span className={'w-52 font-bold text-sky-600'}>Uputnicu izdao/la:</span>
                        <span>Iva Ivanić dr. med.</span>
                    </div>
                    <div className={'h-8 flex items-center pl-3'}>
                        <span className={'w-52 font-bold text-sky-600'}>Postupak liječenja:</span>
                        <span>Vježbe za poboljšanje mobilnosti, vježbe za vraćanje snage mišića</span>
                    </div>
                </div>
                <div className={'bg-sky-100 col-span-1 row-span-2 px-3'}>
                    <div className={'h-8 flex items-center'}>
                        <h3 className={'text-sky-800 font-semibold text-lg'}>Slobodne sobe</h3>
                    </div>
                    <div className={'h-5/6 bg-sky-50'}></div>
                </div>
                <div className={'bg-sky-100 col-span-1 row-span-1 px-3'}>
                    <div className={'h-8 flex items-center'}>
                        <h3 className={'text-sky-800 font-semibold text-lg'}>Dostupni djelatnici</h3>
                    </div>
                    <div className={'h-3/5 bg-sky-50'}></div>
                </div>
                <div className={'bg-sky-100 col-span-2 row-span-2 w-1/2 justify-self-center'}>
                    <div className={'h-8 flex items-center pl-2'}>
                        <h3 className={'text-sky-800 font-semibold text-lg'}>Kalendar</h3>
                    </div>
                    <div></div>
                </div>
                <div className={'bg-sky-100 col-span-1 row-span-1 px-3'}>
                    <div className={'h-8 flex items-center'}>
                        <h3 className={'text-sky-800 font-semibold text-lg'}>Trajanje zahvata</h3>
                    </div>
                    <div className={'h-3/5 bg-sky-50'}></div>
                </div>
            </div>
            <div className={'w-full flex justify-center pb-3 gap-3'}>
                <button className={'bg-sky-800 w-24 p-2 rounded-[5px] text-white font-semibold'}>Dodaj</button>
                <button onClick={() => navigate('/dashboard')} className={'bg-sky-800 w-24 p-2 rounded-[5px] text-white font-semibold'}>Odustani</button>
            </div>

        </div>
    );
}

export default AssignApptMain;