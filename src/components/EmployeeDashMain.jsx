import React, { useEffect, useState } from "react";
import Arrow from "../assets/right-arrow.svg";
import { Link } from "react-router-dom";
import api from "../http/api";
import { toast } from "react-toastify";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function EmployeeDashMain() {
    return (<>
        <div className="h-[75%] grid grid-cols-4 grid-rows-3 gap-2 p-2" >
            <AppointmentCalendar />
            <AppointmentList />
            <RoomList />
            <EquipmentList />
            <AssignedApptList />
            <ResultList />
            <PatientAndTherapyList />
        </div>
    </>)
}

function AppointmentCalendar() {

    const [formatedTherapies, setFormatedTherapies] = useState([]);

    useEffect(() => {
        async function getEmployeeTherapies() {
            await api.get('/employee/accountable/therapies', {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
                }
            }).then(res => {
                let therapies = res.data;
                setFormatedTherapies(formatTherapies(therapies));
            });
        }

        getEmployeeTherapies().catch(() => toast.error('Dogodila se pogreška.'));
    }, []);

    const formatTherapies = (therapies) => {
        return therapies.map(therapy => {
            return {
                title: therapy.type,
                start: therapy.startAt,
                end: therapy.endAt
            };
        });
    }
    return (<div className={"h-full row-span-3 p-2 col-span-2 bg-lighterSky rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)]"}>
        <div className={'h-10 rounded-tl-[5px] rounded-tr-[5px] flex items-center justify-center'}>
            <span className={'text-mediumSky font-bold text-2xl'}>Kalendar</span>
        </div>
        <div className={'h-4/5 w-full'}>
            <div className={'h-full w-full'}>
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
                    events={formatedTherapies}
                />
            </div>
        </div>
    </div>)
}

function AppointmentList() {

    const [apptsList, setApptsList] = useState([]);

    useEffect(() => {
        api.get('/employee/therapies', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(res => {
            setApptsList(res.data);
        }).catch(() => toast.error('Dogodila se pogreška.'));
    }, []);


    return (<div className={"h-full row-span-1 col-span-1 bg-lighterSky rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)]"}>
        <div className={'h-10 flex justify-center items-center'}>
            <span className={'text-mediumSky font-bold text-2xl'}>Pregled prijava</span>
        </div>
        {apptsList.length === 0 ? (
            <div className={'bg-lighterSky h-4/6 mx-2 flex items-center justify-center'}>
                <span className={'text-gray text-lg'}>Trenutno nema aktivnih prijava.</span>
            </div>
        ) : (
            <div className={'h-4/6 overflow-y-scroll bg-lighterSky mx-2 p-3 flex flex-col gap-3'}>
                {apptsList.map((appt, key) => (
                    <div key={key} className={'bg-lightSky w-full flex justify-between py-3 pl-3'}>
                        <div className={'h-full flex items-center'}>
                            <span
                                className={'text-darkSky font-bold'}>{appt.patientResponse.firstName} {appt.patientResponse.lastName}</span>
                        </div>
                        <div className={'w-20 flex items-center justify-center'}>
                            <Link to={'/appointment'} state={appt}>
                                <img src={Arrow} alt="Arrow" className={'h-10'} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>)
}

function RoomList() {

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        api.get('/employee/room', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(res => {
            setRoomList(res.data);
        }).catch(() => toast.error('Dogodila se pogreška.'));
    }, []);

    return (<div className={"row-span-1 col-span-1 bg-lighterSky rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)]"}>
        <div className={'h-10 flex justify-center items-center'}>
            <span className={'text-mediumSky font-bold text-2xl'}>Sobe/Ordinacije</span>
        </div>
        {roomList.length === 0 ? (
            <div className={'h-4/6 bg-lighterSky mx-2 flex justify-center items-center'}>
                <span className={'text-gray text-lg'}>Nema dostupnih soba.</span>
            </div>
        ) : (
            <div className={'h-3/5 bg-lighterSky mx-2 overflow-y-scroll'}>
                {roomList.map((room, key) => (
                    <div
                        key={key}
                        className={room.status === 'OPERABLE' ?
                            'bg-white p-4 text-darkerSky flex flex-row justify-between text-sm m-4' :
                            'bg-lightGray p-4 text-gray flex flex-row justify-between rounded-lg text-2xl m-4'}>
                        <span className={'font-bold text-sm'}>{room.label}</span>
                        <div className={'flex flex-row justify-center items-center'}>
                            <span className={'font-bold'}>Kapacitet: {room.capacity}</span>
                        </div>
                    </div>
                ))}
            </div>
        )}

    </div>
    )
}

function EquipmentList() {

    const [equipmentList, setEquipmentList] = useState([]);

    useEffect(() => {
        api.get('/employee/equipment', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(res => {
            setEquipmentList(res.data);
        }).catch(() => toast.error('Dogodila se pogreška.'));
    }, []);

    return (
        <div className={"row-span-1 col-span-1 bg-lighterSky rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)]"}>
            <div className={'h-10 flex justify-center items-center'}>
                <span className={'text-mediumSky font-bold text-2xl'}>Oprema</span>
            </div>
            {equipmentList.length === 0 ? (
                <div className={'h-4/6 bg-lighterSky mx-2 flex justify-center items-center'}>
                    <span className={'text-gray text-lg'}>Nema dostupne opreme.</span>
                </div>
            ) : (
                <div className={'h-3/5 bg-lighterSky mx-2 overflow-y-scroll'}>
                    {equipmentList.map((equipment, key) => (
                        <div
                            key={key}
                            className={equipment.status === 'OPERABLE' ?
                                'bg-white p-4 text-darkerSky flex flex-row justify-between text-sm m-4' :
                                'bg-lightGray p-4 text-gray flex flex-row justify-between rounded-lg text-2xl m-4'}>
                            <span className={'font-bold text-sm'}>{equipment.name}</span>
                            <div className={'flex flex-row justify-center items-center'}>
                                <span className={'font-bold'}>Soba: {equipment.roomLabel}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function AssignedApptList() {

    const [assignedApptList, setAssignedApptList] = useState([]);

    useEffect(() => {
        api.get('/employee/accountable/therapies', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(res => {
            let therapies = res.data;
            setAssignedApptList(therapies);
        }).catch(() => toast.error('Dogodila se pogreška.'));
    }, []);

    return (
        <div className={"row-span-1 col-span-1 bg-lighterSky rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)]"}>
            <div className={'h-10 flex justify-center items-center'}>
                <span className={'text-mediumSky font-bold text-2xl'}>Dodijeljeni termini</span>
            </div>
            {assignedApptList.length === 0 ? (
                <div className={'h-4/6 bg-lighterSky mx-2 flex justify-center items-center'}>
                    <span className={'text-gray text-lg'}>Nema dostupne opreme.</span>
                </div>
            ) : (
                <div className={'h-4/6 bg-lighterSky mx-2 overflow-y-scroll p-3'}>
                    {assignedApptList.map((appt, key) => (
                        <div className={'bg-lightSky flex justify-between items-center p-3'}>
                            <div>
                                <span className={'font-bold text-darkerSky'}>{appt.patientResponse.firstName} {appt.patientResponse.lastName}</span>
                                <p className={'text-darkSky text-sm'}>{appt.type}</p>
                            </div>
                            <div>
                                <Link to={null}>
                                    <img src={Arrow} alt="Arrow" className={'h-10'} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function ResultList() {

    const [resultList, setResultList] = useState([]);

    useEffect(() => {
        api.get('/therapy/result', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(res => {
            setResultList(res.data);
        }).catch(() => toast.error('Dogodila se pogreška.'));
    }, []);



    return (
        <div className={"row-span-1 col-span-1 bg-lighterSky rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)]"}>
            <div className={'h-10 flex justify-center items-center'}>
                <span className={'text-mediumSky font-bold text-2xl'}>Rezultati terapija</span>
            </div>
            {resultList.length === 0 ? (
                <div className={'h-4/6 bg-lighterSky mx-2 flex justify-center items-center'}>
                    <span className={'text-gray text-lg'}>Nema dostupnih rezultata</span>
                </div>
            ) : (
                <div className={'h-4/6 bg-lighterSky mx-2 overflow-y-scroll p-3'}>
                    {resultList.map((appt, key) => (
                        <div className={'bg-lightSky flex justify-between items-center p-3'}>
                            <div>
                                <span className={'font-bold text-darkerSky'}>{}</span>
                                <p className={'text-darkSky text-sm'}>{"TODO"}</p>
                            </div>
                            <div>
                                <Link to={'/appointmentResult'}>
                                    <img src={Arrow} alt="Arrow" className={'h-10'} />
                                </Link>
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    )
}

function PatientAndTherapyList() {

    const [patientAndTherapyList, setPatientAndTherapyList] = useState([]);

    useEffect(() => {
        setPatientAndTherapyList([]);
    }, []);

    return (
        <div className={"row-span-1 col-span-1 bg-lighterSky rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)]"}>
            <div className={'h-10 flex justify-center items-center'}>
                <span className={'text-mediumSky font-bold text-2xl'}>Pacijenti i terapije</span>
            </div>
            {patientAndTherapyList.length === 0 ? (
                <div className={'h-4/6 bg-lighterSky mx-2 flex justify-center items-center'}>
                    <span className={'text-gray text-lg'}>Nema dostupnih informacija.</span>
                </div>
            ) : (
                <div className={'h-4/6 bg-lighterSky mx-2 overflow-y-scroll p-3'}>
                    {patientAndTherapyList.map((appt, key) => (
                        <div className={'bg-lightSky flex justify-between items-center p-3'}>
                            <div>
                                <span className={'font-bold text-darkerSky'}>{"TODO"}</span>
                                <p className={'text-darkSky text-sm'}>{"TODO"}</p>
                            </div>
                            <div>
                                <Link to={'/appointmentResult'}>
                                    <img src={Arrow} alt="Arrow" className={'h-10'} />
                                </Link>
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    )
}