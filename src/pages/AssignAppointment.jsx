import React, {useEffect, useState} from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppointmentPopup from "../components/AppointmentPopup";
import {useNavigate, useLocation} from "react-router-dom";
import api from "../http/api";
import {toast, ToastContainer} from "react-toastify";
import CollapsibleRoomTab from "../components/CollapsibleRoomTab";

function AssignAppointment() {

    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state;

    const [employeeTherapies, setEmployeeTherapies] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [equipment, setEquipment] = useState([]);

    const [apptData, setApptData] = useState({
        startAt: '',
        endAt: '',
        therapyId: state.id,
        roomId: -1
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setApptData({...apptData, [name]: value});
    };


    useEffect(() => {
        async function getEmployeeTherapies() {
            await api.get('/employee/accountable/therapies', {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
                }
            }).then(res => {
                setEmployeeTherapies(res.data);
            });
        }

        async function getRooms() {
            await api.get('/employee/room', {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
                }
            }).then((res) => {
                setRooms(res.data);
            })
        }

        async function getEquipment() {
            await api.get('/employee/equipment', {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
                }
            }).then((res) => {
                setEquipment(res.data);
            })
        }

        getEmployeeTherapies().catch(() => toast.error('Dogodila se pogreška.'));
        getRooms().catch(() => toast.error("Dogodila se pogreška."));
        getEquipment().catch(() => toast.error("Provjerite internetsku vezu."));

    }, []);


    const handleOptionChange = (e) => {
        const {name, value} = e.target;

        setApptData({
            ...apptData,
            [name]: parseInt(value)
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

    const fetchTherapyScan = async (therapyId) => {
        await api.get('/employee/therapy/scan/' + therapyId, {
            responseType: 'blob',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then((res) => {
            const pdfUrl = URL.createObjectURL(new Blob([res.data], {type: 'application/pdf'}));
            window.open(pdfUrl, '_blank', 'noopener,noreferrer');
        }).catch(() => toast.error("Dogodila se pogreška."));
    };

    return (<>
            <PageLayout>
                <Header/>
                <div className={'h-full flex flex-col'}>
                    <div className={'h-min grid grid-cols-4 grid-rows-3 gap-3 p-3'}>
                        <div
                            className={'p-2 h-full row-span-4/5 col-span-2 bg-lighterSky rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)]'}>
                            <div className={'h-14 flex items-center pl-5'}>
                                <h1 className={'text-darkSky font-bold text-2xl underline'}>Pacijent {state.patientResponse.firstName} {state.patientResponse.lastName}</h1>
                            </div>
                            <div className={'h-8 flex items-center pl-3'}>
                                <span className={'w-52 font-bold text-mediumSky'}>Vrsta oboljenja:</span>
                                <span>{state.type}</span>
                            </div>
                            <div className={'h-8 flex items-center pl-3'}>
                                <span className={'w-52 font-bold text-mediumSky'}>Opis oboljenja:</span>
                                <span>{state.request}</span>
                            </div>
                            <div className={'h-8 flex items-center pl-3'}>
                                <span className={'w-52 font-bold text-mediumSky'}>Uputnicu izdao/la:</span>
                                <span>{state.doctorName}</span>
                            </div>
                            <div className={'h-8 flex items-center pl-3'}>
                                <span className={'w-52 font-bold text-mediumSky'}>Skenirana uputnica:</span>
                                <button
                                    onClick={() => fetchTherapyScan(state.id)}
                                    className={'bg-darkerSky font-semibold text-white rounded-[5px] px-3 py-1'}>PRIKAŽI
                                </button>
                            </div>
                        </div>
                        <div
                            className={'bg-lighterSky col-span-2 p-3 row-span-2 h-full rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)]'}>
                            <div className={'h-8 flex items-center'}>
                                <h3 className={'text-darkSky font-semibold text-lg'}>Slobodne sobe</h3>
                            </div>
                            {rooms.length === 0 ? (
                                <div className={'h-5/6 flex flex-col justify-center items-center p-3'}>
                                    <span className={'text-gray'}>Trenutno nema slobodnih soba.</span>
                                </div>
                            ) : (
                                <div
                                    className={'h-5/6 bg-white flex flex-col gap-3 p-3 rounded-[5px] overflow-y-scroll'}>
                                    {rooms.map((room, key) => (
                                        <div key={key} className="bg-lighterSky pl-3 rounded-[5px]">
                                            <div className={'flex w-full'}>
                                                <input type="radio" value={room.id} name="roomId" id={`room${room.id}`}
                                                       onChange={handleOptionChange}/>
                                                {room.status === 'OPERABLE' && (
                                                    <CollapsibleRoomTab key={key} title={(
                                                        <>
                                                            <span
                                                                className={'font-bold block text-xl'}>{room.label}</span>
                                                            <span
                                                                className={'font-semibold text-md'}>Kapacitet: {room.capacity}</span>
                                                        </>

                                                    )} content={(
                                                        <div>
                                                            {equipment.map((eq, key) => (
                                                                eq.status === 'OPERABLE' && eq.roomId === room.id &&
                                                                <div key={key}>
                                                                    <span className={'text-darkerSky'}>{eq.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}/>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}


                        </div>
                        <div
                            className={'bg-lighterSky col-span-2  p-2 row-span-2 h-full w-full h-100 rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] overflow-y-scroll'}>
                            <div className={'h-8 flex items-center pl-2'}>
                                <h3 className={'text-darkSky font-semibold text-lg'}>Moji termini</h3>
                            </div>

                            {employeeTherapies.length === 0 ? (
                                <div className={'h-5/6 flex flex-col justify-center items-center p-3'}>
                                    <span className={'text-gray'}>Trenutno nema terapija.</span>
                                </div>
                            ) : (
                                employeeTherapies.map((therapy, key) => (
                                    <div key={key} className={'h-min flex flex-col items-center p-3 '}>
                                        <div className={'bg-mediumSky w-full h-min p-2 text-darkerSky rounded-[5px]'}>
                                            <h1 className={'font-bold text-white'}>{therapy.patientResponse.firstName} {therapy.patientResponse.lastName}</h1>
                                            <span className={'block text-white'}>{therapy.type}</span>
                                            <span className={'block text-white'}>{therapy.roomLabel}</span>
                                            <span
                                                className={'block font-semibold text-white'}>{formatDateTime(therapy.startAt, therapy.endAt).dateStart} {formatDateTime(therapy.startAt, therapy.endAt).start} - {formatDateTime(therapy.startAt, therapy.endAt).end}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div
                            className={'bg-lighterSky col-span-1 h-full row-span-1 px-3 [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] rounded-[10px]'}>
                            <div className={'h-8 flex items-center'}>
                                <h3 className={'text-darkSky font-semibold text-lg'}>Trajanje zahvata</h3>
                            </div>
                            <div className={'h-3/5 bg-white flex flex-col gap-2 px-3 py-1 rounded-[5px]'}>
                                <div className={'flex'}>
                                    <label className={'w-20'}>Početak: </label>
                                    <input type="datetime-local" name={'startAt'} id={'startAt'}
                                           onChange={handleChange}/>
                                </div>
                                <div className={'flex'}>
                                    <label className={'w-20'}>Kraj: </label>
                                    <input type="datetime-local" name={'endAt'} id={'endAt'} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="bg-lighterSky rounded-[10px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)]">

                        </div>

                    </div>
                    <div className={'w-full flex justify-center pb-3 gap-3'}>
                        <AppointmentPopup data={apptData} name={{
                            fname: state.patientResponse.firstName,
                            lname: state.patientResponse.lastName
                        }}/>
                        <button onClick={() => navigate('/dashboard')}
                                className={'bg-darkSky w-24 p-2 rounded-[5px] text-white font-semibold'}>Odustani
                        </button>
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
                <Footer/>
            </PageLayout>
        </>
    );
}

export default AssignAppointment;