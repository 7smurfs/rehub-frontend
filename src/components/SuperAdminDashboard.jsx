import React, { useEffect, useState, useReducer } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../http/api";
import InOperable from '../assets/inoperable_room.svg';
import Operable from '../assets/operable_room.svg';
import Cross from '../assets/cross.svg';



export default function SuperAdminDashboard() {

    const [selected, setSelected] = useState(0);
    const props = { selected, setSelected };

    return (
        <>
            <div className="flex flex-col h-full w-full">
                <div className='grid grid-cols-2 md:grid-cols-4 my-3 mx-3 gap-2 md:gap-8 font-semibold text-sm tracking-wide text-center text-sky-800'>
                    <div onClick={() => setSelected(1)} className={`tab ${selected === 1 ? 'bg-sky-600 text-white font-bold shadow-xl hover:bg-sky-700' : 'bg-sky-200'}  rounded-lg p-3 cursor-pointer  hover:bg-sky-300 transition-all duration-300`}>OSOBLJE
                    </div>
                    <div onClick={() => setSelected(2)} className={`tab ${selected === 2 ? 'bg-sky-600 text-white font-bold shadow-xl hover:bg-sky-700' : 'bg-sky-200'}  rounded-lg p-3 cursor-pointer  hover:bg-sky-300 transition-all duration-300`}>PACIJENTI
                    </div>
                    <div onClick={() => setSelected(3)} className={`tab ${selected === 3 ? 'bg-sky-600 text-white font-bold shadow-xl hover:bg-sky-700' : 'bg-sky-200'}  rounded-lg p-3 cursor-pointer hover:bg-sky-300 transition-all duration-300`}>SOBE
                    </div>
                    <div onClick={() => setSelected(4)} className={`tab ${selected === 4 ? 'bg-sky-600 text-white font-bold shadow-xl hover:bg-sky-700' : 'bg-sky-200'}  rounded-lg p-3 cursor-pointer  hover:bg-sky-300 transition-all duration-300`}>OPREMA
                    </div>
                </div>
                <div className={'flex justify-center h-full my-3'}>
                    {selected === 1 && <Personel props={props} />}
                    {selected === 2 && <Patients props={props} />}
                    {selected === 3 && <Rooms props={props} />}
                    {selected === 4 && <Equipment props={props} />}
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
        </>
    );
}

function Personel({ props }) {
    return (<div className='mx-2 w-full grid grid-cols-2 gap-2'>

    </div>);
}

function Patients({ props }) {
    return (<div className='mx-2 w-[90vw] h-full'>

    </div>);
}

function Rooms({ props }) {

    const [rooms, setRooms] = useState([]);
    const [reducerValue, forceChange] = useReducer(x => x + 1, 0);

    const [roomRegisterData, setRoomRegisterData] = useState({
        label: '',
        capacity: '',
        specialMessage: ''
    });

    const handleRoomChange = (e) => {
        const { name, value } = e.target;
        setRoomRegisterData({ ...roomRegisterData, [name]: value });
    }

    const validateRoomRegisterData = () => {
        if (roomRegisterData.label.match(/^ *$/) !== null) {
            toast.info("Unesite oznaku sobe")
            return;
        }
        if (!/^\d+$/.test(roomRegisterData.capacity)) {
            toast.info("Kapacitet sobe mora biti broj.")
        }
    };

    const registerNewRoom = async (e) => {
        e.preventDefault();
        validateRoomRegisterData();
        await api.post('/employee/room', roomRegisterData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            toast.success("Uspješno unesena nova soba");
            forceChange();
            setRoomRegisterData({
                label: '',
                capacity: '',
                specialMessage: ''
            });
        }).catch((err) => {
            if (err.code === "ERR_NETWORK") {
                toast.error("Greška. Provjerite internet vezu ili kontaktirajte podršku.")
            } else {
                toast.warn("Podaci nisu valjani. Provjerite podatke sobe.");
            }
        });
    };

    const invalidateRoom = async (roomId) => {
        await api.delete('/employee/room/' + roomId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            toast.success('Uspješno izbrisana soba');
            forceChange();
        })
            .catch(() => toast.error('Dogodila se pogreška.'))
    };

    const setRoomAsOperable = async (roomId) => {
        await api.post('/employee/room/operable/' + roomId, null, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            toast.success("Soba je postavljena kao operabilna");
            forceChange();
        }).catch(() => {
            toast.error("Dogodila se pogreška");
        })
    };

    const setRoomAsInOperable = async (roomId) => {
        await api.post('/employee/room/inoperable/' + roomId, null, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            toast.success("Soba je postavljena kao inoperabilna");
            forceChange();
        }).catch(() => {
            toast.error("Dogodila se pogreška");
        })
    };

    const getRooms = async () => {
        await api.get('/employee/room', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => {
            setRooms(res.data);
            console.log(rooms)
        }).catch((err) => {
            console.log(err);
            toast.error("Provjerite internetsku vezu.");
        });
    };

    useEffect(() => {
        getRooms();
    }, [reducerValue]);

    return (<div className='mx-2 w-full grid grid-cols-2 gap-2'>
        <div className='bg-sky-200 h-full rounded-xl overflow-y-scroll p-2'>
            {rooms.map((room, key) => (
                <div
                    key={key}
                    className={room.status === 'OPERABLE' ?
                        'bg-white p-4 text-sky-900 flex flex-row justify-between rounded-lg text-2xl m-4' :
                        'bg-gray-300 p-4 text-gray-500 flex flex-row justify-between rounded-lg text-2xl m-4'}>
                    <span className={'font-bold'}>{room.label}</span>
                    <div className={'flex flex-row justify-center items-center'}>
                        <span className={'font-bold'}>Kapacitet: {room.capacity}</span>
                        <img src={Cross} alt={'cross'}
                            onClick={() => invalidateRoom(room.id)}
                            className={'h-7 mx-2 cursor-pointer'} />
                        {room.status === 'OPERABLE' ? <img src={InOperable} alt={'inoperable'}
                            onClick={() => setRoomAsInOperable(room.id)}
                            className={'h-7 mx-2 cursor-pointer'} /> :
                            <img src={Operable} alt={'operable'}
                                onClick={() => setRoomAsOperable(room.id)}
                                className={'h-7 mx-2 cursor-pointer'} />}

                    </div>
                </div>
            ))}

        </div>
        <div className={'bg-sky-200 h-full rounded-xl p-2 text-center'}>
            <span className={'font-bold text-2xl text-sky-900'}>UNESI NOVU SOBU</span>
            <form className={'grid grid-cols-2'}>
                <div className={'pr-1'}>
                    <label
                        className={'font-bold text-sky-600 text-lg mt-[15px] self-start block'}>Oznaka
                        sobe:</label>
                    <input type="text" name="label" id="label"
                        value={roomRegisterData.label}
                        onChange={handleRoomChange}
                        className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2" />
                </div>
                <div className={'pl-1'}>
                    <label
                        className={'font-bold text-sky-600 text-lg mt-[15px] self-start block'}>Kapacitet:</label>
                    <input type="text" name="capacity" id="capacity" value={roomRegisterData.capacity}
                        onChange={handleRoomChange}
                        className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2" />
                </div>
                <div className={'col-span-2'}>
                    <label className={'font-bold text-sky-600 text-lg mt-[15px] self-start block'}>Dodatne
                        informacije:</label>
                    <textarea name={'specialMessage'} id={'specialMessage'} maxLength={255}
                        className="text-start h-56 text-ellipsis w-full bg-white opacity-80 mb-[2px] rounded-[5px] p-2"
                        onChange={handleRoomChange} value={roomRegisterData.specialMessage} />
                </div>
            </form>
            <button onClick={registerNewRoom}
                className={'bg-sky-950 font-bold text-white p-3 rounded-xl my-2'}>UNESI
                SOBU
            </button>
        </div>
    </div>);
}

function Equipment({ props }) {
    return (<div className='mx-2 w-full grid grid-cols-2 gap-2'>

    </div>);
}