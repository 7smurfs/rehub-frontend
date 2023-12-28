import React from "react";

function AdminDashboard() {
    return(
        <div className="flex flex-col h-full">
            <div className={'grid grid-cols-4 font-bold text-2xl tracking-wider text-center text-sky-800 my-3'}>
                <div className={'bg-sky-200 rounded-xl h-full p-3 mx-3 cursor-pointer'}>OSOBLJE</div>
                <div className={'bg-sky-200 rounded-xl h-full p-3 mx-3 cursor-pointer'}>PACIJENTI</div>
                <div className={'bg-sky-200 rounded-xl h-full p-3 mx-3 cursor-pointer'}>SOBE</div>
                <div className={'bg-sky-200 rounded-xl h-full p-3 mx-3 cursor-pointer'}>OPREMA</div>
            </div>
            
        </div>
    );
}

export default AdminDashboard;