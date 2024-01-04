import React, {useEffect, useState} from "react";
import Arrow from "../assets/right-arrow.svg";
import {Link, useNavigate} from "react-router-dom";
import api from "../http/api";
import {toast} from "react-toastify";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function EmployeeDashMain() {

    const [roomList, setRoomList] = useState([]);
    /*const [room, setRoom] = useState('');*/
    const [equipmentList, setEquipmentList] = useState([]);
    const [apptsList, setApptsList] = useState([]);
    const [formatedTherapies, setFormatedTherapies] = useState([]);
    const [employeeTherapies, setEmployeeTherapies] = useState([]);

    let navigate = useNavigate();

    const showData = async () => {
        try {
            const [roomRes, equipmentRes, apptsRes] = await Promise.all([
                api.get('/employee/room', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }),

                api.get('/employee/equipment', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }),

                api.get('/employee/therapies', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
            ])

            setRoomList(roomRes.data);
            setEquipmentList(equipmentRes.data);
            setApptsList(apptsRes.data);
            console.log(equipmentRes.data)

        } catch (err) {
            toast.error("Provjerite internetsku vezu.");
        }
    };

    useEffect(() => {
        async function getEmployeeTherapies() {
            await api.get('/employee/accountable/therapies', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                let therapies = res.data;
                setEmployeeTherapies(therapies);
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

    /*const getRoom = async (roomId) => {
        await api.get('/employee/room/' + roomId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => {
            setRoom(res.data);
        }).catch(() => {
            toast.error("Provjerite internetsku vezu.");
        })
    }*/


    return(
        <div className="h-[75%] grid grid-cols-4 grid-rows-3 gap-2 p-2" onLoad={showData}>
            <div className={"h-full row-span-3 col-span-2 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 rounded-tl-[5px] rounded-tr-[5px] flex items-center justify-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Kalendar</span>
                </div>
                <div className={'h-4/5 w-full'}>
                    <div className={'h-full w-full'}>
                        <FullCalendar
                            height={"100%"}
                            text
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
            </div>
            <div className={"h-full row-span-1 col-span-1 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 flex justify-center items-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Pregled prijava</span>
                </div>
                {apptsList.length === 0 ? (
                    <div className={'bg-sky-50 h-5/6 mx-2 flex items-center justify-center'}>
                        <span className={'text-gray-500 text-lg'}>Trenutno nema aktivnih prijava.</span>
                    </div>
                ) : (
                    <div className={'h-5/6 overflow-y-scroll bg-sky-50 mx-2 p-3 flex flex-col gap-3'}>
                        {apptsList.map((appt, key) => (
                            <div key={key} className={'bg-sky-200 w-full flex justify-between py-3 pl-3'}>
                                <div className={'h-full flex items-center'}>
                                    <span
                                        className={'text-sky-800 font-bold'}>{appt.patientResponse.firstName} {appt.patientResponse.lastName}</span>
                                </div>
                                <div className={'w-20 flex items-center justify-center'}>
                                    <Link to={'/appointment'}>
                                        <img src={Arrow} alt="Arrow" className={'h-10'}/>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div className={"row-span-1 col-span-1 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 flex justify-center items-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Sobe/Ordinacije</span>
                </div>
                {roomList.length === 0 ? (
                    <div className={'h-4/6 bg-sky-50 mx-2 flex justify-center items-center'}>
                        <span className={'text-gray-500 text-lg'}>Nema dostupnih soba.</span>
                    </div>
                ) : (
                    <div className={'h-3/5 bg-sky-50 mx-2 overflow-y-scroll'}>
                        {roomList.map((room, key) => (
                            <div
                                key={key}
                                className={room.status === 'OPERABLE' ?
                                    'bg-white p-4 text-sky-900 flex flex-row justify-between text-sm m-4' :
                                    'bg-gray-300 p-4 text-gray-500 flex flex-row justify-between rounded-lg text-2xl m-4'}>
                                <span className={'font-bold text-sm'}>{room.label}</span>
                                <div className={'flex flex-row justify-center items-center'}>
                                    <span className={'font-bold'}>Kapacitet: {room.capacity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div className={"row-span-1 col-span-1 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 flex justify-center items-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Oprema</span>
                </div>
                {equipmentList.length === 0 ? (
                    <div className={'h-4/6 bg-sky-50 mx-2 flex justify-center items-center'}>
                        <span className={'text-gray-500 text-lg'}>Nema dostupne opreme.</span>
                    </div>
                ) : (
                    <div className={'h-3/5 bg-sky-50 mx-2 overflow-y-scroll'}>
                        {equipmentList.map((equipment, key) => (
                            <div
                                key={key}
                                className={equipment.status === 'OPERABLE' ?
                                    'bg-white p-4 text-sky-900 flex flex-row justify-between text-sm m-4' :
                                    'bg-gray-300 p-4 text-gray-500 flex flex-row justify-between rounded-lg text-2xl m-4'}>
                                <span className={'font-bold text-sm'}>{equipment.name}</span>
                                <div className={'flex flex-row justify-center items-center'}>
                                    <span className={'font-bold'}>Soba:</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div className={"row-span-1 col-span-1 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 flex justify-center items-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Dodijeljeni termini</span>
                </div>
                <div className={'h-4/6 bg-sky-50 mx-2 overflow-y-scroll p-3'}>

                    <div className={'bg-sky-200 flex justify-between items-center p-3'}>
                        <div>
                            <span className={'font-bold text-sky-900'}>Iva Ivić</span>
                            <p className={'text-sky-800 text-sm'}>Vježbe nogu</p>
                        </div>
                        <div>
                            <Link to={'/'}>

                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <div className={"row-span-1 col-span-1 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 flex justify-center items-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Rezultati terapija</span>
                </div>
                <div className={'h-4/6 bg-sky-50 mx-2 overflow-y-scroll p-3'}>

                    <div className={'bg-sky-200 flex justify-between items-center p-3'}>
                        <div>
                            <span className={'font-bold text-sky-900'}>Iva Ivić</span>
                            <p className={'text-sky-800 text-sm'}>Vježbe nogu</p>
                        </div>
                        <div>
                            <Link to={'/appointmentResult'}>
                                <img src={Arrow} alt="Arrow" className={'h-10'}/>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <div className={"row-span-1 col-span-1 bg-sky-100 rounded-[5px]"}>
                <div className={'h-10 flex justify-center items-center'}>
                    <span className={'text-sky-600 font-bold text-2xl'}>Pacijenti i terapije</span>
                </div>
                <div className={'h-4/6 bg-sky-50 mx-2 overflow-y-scroll p-3'}>

                    <div className={'bg-sky-200 flex justify-between items-center p-3'}>
                        <div>
                            <span className={'font-bold text-sky-900'}>Iva Ivić</span>
                            <p className={'text-sky-800 text-sm'}>Vježbe nogu</p>
                        </div>
                        <div>
                            <Link to={'/appointmentResult'}>
                                <img src={Arrow} alt="Arrow" className={'h-10'}/>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default EmployeeDashMain;