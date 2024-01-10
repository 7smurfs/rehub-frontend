import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import arrow from "../assets/right-arrow.svg";
import api from "../http/api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import Popup from "reactjs-popup";

function UserDashMain() {

    const [userTherapies, setUserTherapies] = useState([]);
    const [formattedTherapies, setFormattedTherapies] = useState([]);
    const [popupTherapy, setPopupTherapy] = useState(null);
    const [open, setOpen] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        async function getUserTherapies() {
            await api.get('/patient/therapies', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                let therapies = res.data;
                setUserTherapies(therapies);
                setFormattedTherapies(formatTherapies(therapies));
            });
        }

        getUserTherapies().catch(() => toast.error('Dogodila se pogreška.'));
    }, []);

    const formatTherapies = (therapies) => {
        return therapies.map(therapy => {
            return {
                id: therapy.id,
                title: therapy.type,
                start: therapy.startAt,
                end: therapy.endAt,
                status: therapy.status
            };
        });
    }

    const cancelTherapy = async (id) => {
        await api.delete('/patient/therapy/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            toast.success("Uspješno otkazana terapija.");
            navigate('/');
        })
            .catch(() => toast.error("Dogodila se pogreska"));
    };

    const goToNewTherapy = (e) => {
        e.preventDefault();
        navigate('/dashboard/new-therapy');
    };

    const shiftTherapyData = () => {
        const approvedTherapies = formattedTherapies.filter(therapy => therapy.start);
        if (approvedTherapies.length < 4) {
            return;
        }
        const newArray = [...formattedTherapies];
        const firstElement = newArray.shift();
        newArray.push(firstElement);
        setFormattedTherapies(newArray);
    };

    const fetchTherapyScan = async (therapyId) => {
        await api.get('/patient/therapy/scan/' + therapyId, {
            responseType: 'blob',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => {
            const pdfUrl = URL.createObjectURL(new Blob([res.data], {type: 'application/pdf'}));
            window.open(pdfUrl, '_blank', 'noopener,noreferrer');
        });
    };

    return (
        <div className="flex flex-col lg:h-4/5 lg:grid lg:grid-cols-2 lg:grid-rows-1 gap-5 p-5">
            <div className="row-span-1 col-span-1 bg-sky-100 rounded-[5px]">
                <div className="bg-sky-600 rounded-t-[5px] h-14">
                    <h3 className="font-bold text-lg text-white p-3">Kalendar</h3>
                </div>
                <div className={'lg:h-5/6 m-2'}>
                    <div className={'lg:hidden h-full flex flex-col md:flex-row items-center justify-around mx-2 my-5'}>
                        {formattedTherapies.slice(0, 3).map((therapy, key) => (
                            <>
                                {therapy.start && <div key={key} className={'w-full'}>
                                    <div
                                        className={
                                            therapy.status === 'PENDING_APPROVAL' ? 'md:w-[200px] h-36 p-4 flex flex-col bg-yellow-800 text-white rounded-[10px] my-3 overflow-clip' :
                                                therapy.status === 'APPROVED' ? 'md:w-[200px] h-36 p-4 flex flex-col bg-sky-600 text-white rounded-[10px] my-3 overflow-clip' :
                                                    'md:w-[200px] h-36 p-4 flex flex-col bg-gray-700 text-white rounded-[10px] my-3 overflow-clip'
                                        }>
                                        <span className={'text-ellipsis font-semibold text-lg'}>{therapy.title}</span>
                                        <span
                                            className={'font-semibold'}>{new Date(therapy.start).getDay().toString().padStart(2, '0')}.{(new Date(therapy.start).getMonth() + 1).toString().padStart(2, '0')}.{new Date(therapy.start).getFullYear()}</span>
                                        <span
                                            className={'font-semibold'}>{new Date(therapy.start).getHours().toString().padStart(2, '0')}:{new Date(therapy.start).getMinutes().toString().padStart(2, '0')} - {new Date(therapy.end).getHours().toString().padStart(2, '0')}:{new Date(therapy.end).getMinutes().toString().padStart(2, '0')}</span>
                                    </div>
                                </div>}
                            </>
                        ))}
                        {formattedTherapies.length !== 0 &&
                            <img className={'w-8 rotate-90 md:rotate-0 cursor-pointer'} src={arrow} alt={'arrow'}
                                 onClick={() => shiftTherapyData()}/>
                        }
                    </div>
                    <div className={'h-full hidden lg:block w-full'}>
                        <FullCalendar
                            height={"100%"}
                            plugins={[dayGridPlugin, timeGridPlugin]}
                            initialView="timeGridWeek"
                            businessHours={{
                                daysOfWeek: [1, 2, 3, 4, 5],
                                startTime: '08:00',
                                endTime: '20:00'
                            }}
                            displayEventEnd={true}
                            editable={false}
                            eventTimeFormat={{
                                hour: 'numeric',
                                minute: '2-digit',
                                meridiem: 'short'
                            }}
                            headerToolbar={{
                                left: 'prev,next',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek'
                            }}
                            slotEventOverlap={true}
                            weekends={false}
                            events={formattedTherapies}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-sky-100 rounded-[5px]">
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
                                className="w-5/6 h-full my-4 p-5 flex flex-col items-center gap-3 bg-white overflow-y-scroll">
                                {userTherapies.map((therapy, key) => (
                                    <div key={key} className="rounded-[5px] w-full">
                                        <div className={
                                            therapy.status === 'PENDING_APPROVAL' ? 'bg-yellow-800 p-1 rounded-t-md' :
                                                therapy.status === 'APPROVED' ? 'bg-sky-900 p-1 rounded-t-md' :
                                                    'bg-gray-700 p-1 rounded-t-md'
                                        }>
                                            <h5 className="text-white overflow-clip text-ellipsis font-semibold p-1">{therapy.type}</h5>
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
                                                     onClick={() => {
                                                         setPopupTherapy(therapy);
                                                         setOpen(true);
                                                         fetchTherapyScan(therapy.id).catch(() => toast.error("Dogodila se pogreška."));
                                                     }}
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
                <Popup open={open} closeOnDocumentClick={false} onClose={() => setOpen(false)} modal>
                    <div className={'bg-sky-100 h-[40vh] text-sky-950 text-xl p-5 tracking-wider'}>
                        <div className={'h-1/6 pb-3'}>
                            <h2 className={'font-semibold text-2xl'}>Terapija
                                - {popupTherapy !== null && popupTherapy.patientResponse['firstName']}
                                &nbsp;{popupTherapy !== null && popupTherapy.patientResponse['lastName']}</h2>
                        </div>
                        <div className={'h-4/6 px-2 flex flex-col gap-2 py-2'}>
                            <div className={'flex'}>
                                <span className={'w-28 font-semibold'}>VRSTA: </span>
                                <span>{popupTherapy !== null && popupTherapy.type}</span>
                            </div>
                            <div className={'flex'}>
                                <span className={'w-28 font-semibold'}>ZAHTJEV: </span>
                                <span>{popupTherapy !== null && popupTherapy.request}</span>
                            </div>
                            {
                                popupTherapy !== null &&
                                <>
                                    {popupTherapy.startAt &&
                                        <div className={'flex'}>
                                            <span className={'w-28 font-semibold'}>DATUM: </span>
                                            <span>{new Date(popupTherapy.startAt).getDay()}.{(new Date(popupTherapy.startAt).getMonth() + 1).toString().padStart(2, '0')}.{new Date(popupTherapy.startAt).getFullYear()}</span>
                                        </div>
                                    }
                                    {popupTherapy.endAt &&
                                        <div className={'flex'}>
                                            <span className={'w-28 font-semibold'}>VRIJEME: </span>
                                            <span>{new Date(popupTherapy.startAt).getHours().toString().padStart(2, '0')}:{new Date(popupTherapy.startAt).getMinutes().toString().padStart(2, '0')} - {new Date(popupTherapy.endAt).getHours().toString().padStart(2, '0')}:{new Date(popupTherapy.endAt).getMinutes().toString().padStart(2, '0')}</span>
                                        </div>
                                    }
                                </>
                            }
                            {
                                popupTherapy !== null &&
                                <div className={'flex'}>
                                    {
                                        popupTherapy.roomLabel &&
                                        <>
                                            <span className={'w-28 font-semibold'}>LOKACIJA: </span>
                                            <span>{popupTherapy.roomLabel}</span>
                                        </>
                                    }

                                </div>
                            }
                            {
                                popupTherapy !== null &&
                                <div className={'flex'}>
                                    {
                                        popupTherapy.scan &&
                                        <>
                                            <button className={'font-semibold p-2 text-white bg-sky-950 rounded-lg'}
                                                    onClick={() => fetchTherapyScan(popupTherapy.id).catch(() => toast.error("Dogodila se greska."))}>UPUTNICA
                                            </button>
                                        </>
                                    }

                                </div>
                            }
                        </div>
                        <div className={'flex justify-around items-center'}>
                            <button onClick={() => setOpen(false)}
                                    className={'w-1/3 p-3 bg-sky-800 text-white rounded-xl font-semibold'}>
                                ZATVORI
                            </button>
                            <button onClick={() => {
                                cancelTherapy(popupTherapy.id);
                                setOpen(false);
                            }}
                                    className={'w-1/3 p-3 bg-red-950 text-white rounded-xl font-semibold'}>
                                OTKAŽI
                            </button>
                        </div>
                    </div>
                </Popup>
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