import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function AppointmentPopup() {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    return(
        <>
            <button onClick={() => setOpen(o => !o)} className={'bg-sky-800 w-24 p-2 rounded-[5px] text-white font-semibold'}>
                Nastavi
            </button>
            <Popup open={open} closeOnDocumentClick={false} onClose={close} modal>
                <div className={'bg-white h-80 p-3'}>
                    <div className={'h-1/6 pb-3'}>
                        <h2 className={'font-semibold text-lg'}>Termin pacijenta Luka Lukić</h2>
                    </div>
                    <div className={'bg-sky-50 h-4/6 px-2 flex flex-col gap-2 py-2'}>
                        <div className={'flex'}>
                            <span className={'w-28 font-semibold'}>DATUM:</span>
                            <span>23.01.2024.</span>
                        </div>
                        <div className={'flex'}>
                            <span className={'w-28 font-semibold'}>VRIJEME:</span>
                            <span>08:00 - 10:00 h (Trajanje 2 h)</span>
                        </div>
                        <div className={'flex'}>
                            <span className={'w-28 font-semibold'}>LIJEČNIK:</span>
                            <span>Ivan Horvat dr. med.</span>
                        </div>
                        <div className={'flex'}>
                            <span className={'w-28 font-semibold'}>LOKACIJA:</span>
                            <span>Ordinacija 202, prizemlje</span>
                        </div>
                    </div>
                    <div className={'h-1/6 flex justify-center items-center gap-3'}>
                        <button className={'w-24 bg-sky-800 text-white rounded-[5px] p-1 font-semibold'}>
                            Potvrdi
                        </button>
                        <button onClick={close} className={'w-24 bg-sky-800 text-white rounded-[5px] p-1 font-semibold'}>
                            Odustani
                        </button>
                    </div>
                </div>
            </Popup>
        </>

    );


}

export default AppointmentPopup;