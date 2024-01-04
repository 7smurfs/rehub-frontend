import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import arrow from "../assets/right-arrow.svg";
import api from "../http/api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function UserDashMain() {

    const [userTherapies, setUserTherapies] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        async function getUserTherapies() {
            await api.get('/patient/therapies', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setUserTherapies(res.data);
            });
        }

        getUserTherapies().catch(() => toast.error('Dogodila se pogreška.'));
    }, []);

    const goToNewTherapy = (e) => {
        e.preventDefault();
        navigate('/dashboard/new-therapy');
    };

    const handleEventClick = (e) => {
        console.log(e.event.title);
    };

    return (
        <div className="grid grid-cols-2 grid-rows-1 h-4/5 gap-5 p-5">
            <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                <div className="bg-sky-600 rounded-t-[5px] h-14">
                    <h3 className="font-bold text-lg text-white p-3">Kalendar</h3>
                </div>
                <div className={'h-5/6 m-2'}>
                    <div className={'h-full w-full overflow-y-scroll'}>
                        <FullCalendar
                            text
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="timeGridWeek"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek'
                            }}
                            slotEventOverlap
                            weekends={false}
                            events={[
                                {title: 'terapija', start: '2024-01-02T13:30:00', end: '2024-01-02T15:30:00'},
                                {title: 'terapija', start: '2024-01-03T13:30:00', end: '2024-01-02T15:30:00'},
                                {title: 'terapija', start: '2024-01-04T14:30:00', end: '2024-01-02T16:30:00'},
                                {title: 'terapija', start: '2024-01-04T13:30:00', end: '2024-01-02T16:30:00'},
                            ]}
                            eventClick={handleEventClick}
                        />
                    </div>
                </div>
            </div>

            <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                <div className="bg-sky-600 rounded-t-[5px] h-14">
                    <h3 className="font-bold text-lg text-white p-3">Moji termini</h3>
                </div>
                <div className="h-full -mt-14 pt-14 flex flex-col items-center">
                    {userTherapies.length === 0 ? (
                        <>
                            <div className="h-full w-11/12 my-4 flex flex-col justify-center items-center bg-white">
                                <span
                                    className={'font-bold text-xl text-sky-950'}>Ovdje će biti prikazani Vaši termini</span>
                                <button
                                    className="bg-sky-600 p-4 my-5 flex items-center justify-center text-white font-semibold rounded-[5px]"
                                    onClick={goToNewTherapy}>
                                    Dodaj novi termin
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="w-11/12 h-full my-4 p-5 flex flex-col items-center gap-3 bg-white overflow-y-scroll">
                                {userTherapies.map((therapy, key) => (
                                    <div key={key} className="rounded-[5px] w-full">
                                        <div className={
                                            therapy.status === 'PENDING_APPROVAL' ? 'bg-yellow-800 p-1 rounded-t-md' :
                                                therapy.status === 'APPROVED' ? 'bg-sky-900 p-1 rounded-t-md' :
                                                    'bg-gray-700 p-1 rounded-t-md'
                                        }>
                                            <h5 className="text-white font-semibold p-1">{therapy.type}</h5>
                                        </div>
                                        <div
                                            className="bg-sky-100 p-3 flex flex-col justify-between rounded-b-[5px]">
                                            <span className={'text-ellipsis'}><span
                                                className={'font-semibold'}>Zahtjev: </span>{therapy.request}</span>
                                            <div className={'flex flex-row items-center justify-between'}>
                                                <span
                                                    className="flex h-full items-center font-semibold">Soba: {therapy.roomLabel}</span>
                                                {therapy.referenceTherapyId && <span className={'font-semibold'}>Šifra ref. terapije: {therapy.referenceTherapyId}</span>}
                                                <img src={arrow} alt="arrow"
                                                     onClick={() => navigate('/therapy/info/' + therapy.id)}
                                                     className="h-8 cursor-pointer"/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="bg-sky-600 p-4 my-3 flex items-center justify-center text-white font-semibold rounded-[5px]"
                                onClick={goToNewTherapy}>
                                Dodaj novi termin
                            </button>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>

    );
}

export default UserDashMain;