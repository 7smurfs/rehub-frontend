import React, {useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import api from "../http/api";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function AppointmentPopup({ data }) {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    const navigate = useNavigate();

    const [room, setRoom] = useState('');




    useEffect(() => {
            async function getRoom(){
                await api.get('/employee/room/' + data.roomId, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((res) => {
                    setRoom(res.data);
                })
            }

            getRoom().catch((err) => console.log(err));
        }

    )
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/employee/therapy', data)
            .then(() => navigate('/'))
            .catch((err) => {
                if (err.code === "ERR_NETWORK") {
                    toast.error("Greška. Provjerite internet vezu ili kontaktirajte podršku.")
                } else {
                    toast.warn("Podaci nisu valjani. Provjerite unesene podatke.");
                }
            });
    }

    function formatDateTime(datetimeStart, datetimeEnd) {
        let splitStart = datetimeStart.split('T');
        let dateStart = splitStart[0];
        let start = splitStart[1];
        let splitEnd = datetimeEnd.split('T');
        let dateEnd = splitEnd[0];
        let end = splitEnd[1];

        let ymd, dd, mm, yyyy;

        ymd = dateStart.split('-');
        dd = ymd[2];
        mm = ymd[1];
        yyyy = ymd[0];

        let dmy = dd + '.' + mm + '.' + yyyy + '.';


        return {
            dateStart: dmy,
            start: start,
            dateEnd: dateEnd,
            end: end
        };
    }

    function timeDiff(start, end) {
        const sd = new Date(start);
        const ed = new Date(end);

        const diffMs = ed - sd;

        return diffMs / 3600000;
    }

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
                            <span>{formatDateTime(data.startAt, data.endAt).dateStart}</span>
                        </div>
                        <div className={'flex'}>
                            <span className={'w-28 font-semibold'}>VRIJEME:</span>
                            <span>{formatDateTime(data.startAt, data.endAt).start} - {formatDateTime(data.startAt, data.endAt).end} h (Trajanje {timeDiff(data.startAt, data.endAt)} h)</span>
                        </div>
                        <div className={'flex'}>
                            <span className={'w-28 font-semibold'}>LIJEČNIK:</span>
                            <span>Ivan Horvat dr. med.</span>
                        </div>
                        <div className={'flex'}>
                            <span className={'w-28 font-semibold'}>LOKACIJA:</span>
                            <span>{room.label}</span>
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