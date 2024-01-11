import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import api from "../http/api";
import InOperable from '../assets/inoperable_room.svg';
import Operable from '../assets/operable_room.svg';
import Cross from '../assets/cross.svg';
import AdminIcon from '../assets/user_admin.svg';


export default function SuperAdminDashboard() {

    const [selected, setSelected] = useState(0);
    const props = {selected, setSelected};
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        setStatistics(api.get('/stats', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then((res) => setStatistics(res.data)));
    }, []);


    return (
        <>
            <div className="flex flex-col h-full w-full dark:bg-heavyGray">
                <div
                    className='grid grid-cols-2 md:grid-cols-4 my-3 mx-3 gap-2 md:gap-8 font-semibold text-sm tracking-wide text-center text-darkSky'>
                    <div onClick={() => setSelected(1)}
                         className={`tab ${selected === 1 ? 'bg-mediumSky dark:bg-black text-white font-bold shadow-xl hover:bg-mediumSky' : 'bg-lightSky'}  rounded-lg p-3 cursor-pointer  hover:bg-lightSky transition-all duration-300`}>OSOBLJE
                    </div>
                    <div onClick={() => setSelected(2)}
                         className={`tab ${selected === 2 ? 'bg-mediumSky dark:bg-black text-white font-bold shadow-xl hover:bg-mediumSky' : 'bg-lightSky'}  rounded-lg p-3 cursor-pointer  hover:bg-lightSky transition-all duration-300`}>PACIJENTI
                    </div>
                    <div onClick={() => setSelected(3)}
                         className={`tab ${selected === 3 ? 'bg-mediumSky dark:bg-black text-white font-bold shadow-xl hover:bg-mediumSky' : 'bg-lightSky'}  rounded-lg p-3 cursor-pointer hover:bg-lightSky transition-all duration-300`}>SOBE
                    </div>
                    <div onClick={() => setSelected(4)}
                         className={`tab ${selected === 4 ? 'bg-mediumSky dark:bg-black text-white font-bold shadow-xl hover:bg-mediumSky' : 'bg-lightSky'}  rounded-lg p-3 cursor-pointer  hover:bg-lightSky transition-all duration-300`}>OPREMA
                    </div>
                </div>
                <div className={'flex justify-center h-full my-3'}>
                    {selected === 0 && <div
                        className={'w-full sm:w-1/2 mx-5 flex flex-col justify-center text-2xl text-darkerSky dark:text-lightGray'}>
                        <span className={'font-bold my-3'}>Broj zaposlenika: {statistics.noOfEmployees}</span>
                        <span className={'font-bold my-3'}>Broj pacijenata: {statistics.noOfPatients}</span>
                        <span className={'font-bold my-3'}>Broj soba: {statistics.noOfRooms}</span>
                        <span className={'font-bold my-3'}>Količina opreme: {statistics.noOfEquipment}</span>
                        <span className={'font-bold my-3'}>Aktivne terapije: {statistics.noOfActiveTherapies}</span>
                        <span
                            className={'font-bold my-3'}>Broj novih korisnika u mjesecu: {statistics.noOfNewUsersForThisMonth}</span>
                    </div>}
                    {selected === 1 && <Personel props={props}/>}
                    {selected === 2 && <Patients props={props}/>}
                    {selected === 3 && <Rooms props={props}/>}
                    {selected === 4 && <Equipment props={props}/>}
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

function Personel({props}) {

    const [employees, setEmployees] = useState([]);

    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        pin: '',
        phoneNumber: '',
        profession: '',
        gender: '',
        dateOfBirth: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegisterData({...registerData, [name]: value});
    };

    const validateRegisterData = () => {
        if (registerData.firstName.match(/^ *$/) !== null) {
            toast.info("Unesite ime")
            return;
        }
        if (registerData.lastName.match(/^ *$/) !== null) {
            toast.info("Unesite prezime")
            return;
        }
        if (!registerData.username.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            toast.info("Unesite valjanu e-mail adresu")
            return;
        }
        if (registerData.profession.match(/^ *$/) !== null) {
            toast.info("Unesite profesiju")
            return;
        }
        if (!/^\+3859(1|2|5|8|9|76|77)\d{6,7}$/.test(registerData.phoneNumber)) {
            toast.info("Neispravan format broja. Koristite predbroj +385.")
            return;
        }
        if (/^\d+$/.test(registerData.pin)) {
            if (registerData.pin.length !== 11)
                toast.info("OIB nije ispravne duljine")
        } else {
            toast.info("OIB mora sadržavati 11 brojki.")
            return;
        }
        if (registerData.dateOfBirth.match(/^ *$/) !== null) {
            toast.info("Unesite datum rođenja")
        }

    }

    const getEmployees = async () => {
        await api.get('/employee', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then((res) => {
            setEmployees(res.data.sort((a, b) => a.lastName.localeCompare(b.lastName)))
        }).catch((err) => {
            console.log(err);
            toast.error("Provjerite internetsku vezu.");
        });
    }

    const setEmployeeAsAdmin = async (employeeId) => {
        await api.post('/employee/' + employeeId, null, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success('Uspješno data admin prava zaposleniku');
            getEmployees();
        })
            .catch(() => toast.error('Dogodila se pogreška.'))
    };

    const invalidateEmployee = async (employeeId) => {
        await api.delete('/employee/' + employeeId, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success('Uspješno izbrisan zaposlenik');
            getEmployees();
        })
            .catch(() => toast.error('Dogodila se pogreška.'))
    };

    const registerNewEmployee = async (e) => {
        e.preventDefault();
        validateRegisterData();
        await api.post('/employee', registerData, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success("Uspješno unesen novi zaposlenik");
            setRegisterData({
                firstName: '',
                lastName: '',
                username: '',
                pin: '',
                phoneNumber: '',
                profession: '',
                gender: '',
                dateOfBirth: ''
            });
            getEmployees();
        }).catch((err) => {
            if (err.code === "ERR_NETWORK") {
                toast.error("Greška. Provjerite internet vezu ili kontaktirajte podršku.")
            } else {
                toast.warn("Podaci nisu valjani. Provjerite korisničke podatke.");
            }
        });
    };

    useEffect(() => {
        getEmployees();
    }, []);


    return (<div className='mx-2 w-full grid md:grid-cols-2 gap-2 grid-cols-1'>
        <div className={'bg-lightSky h-full rounded-xl overflow-y-scroll p-2'}>
            {employees.map((employee, key) => (
                <div
                    key={key}
                    className={
                        'bg-white p-4 text-darkerSky flex flex-row justify-between rounded-lg text-2xl m-4 transition-all duration-500'
                    }>
                    <span>{employee.firstName} {employee.lastName} {employee.user.roles.includes('ADMIN') &&
                        <span
                            className={'text-greenHeavy font-bold text-base align-middle'}>ADMIN</span>}</span>
                    <div className={'flex flex-row justify-center items-center'}>
                        <span>{employee.profession}</span>
                        <img src={Cross} alt={'cross'}
                             onClick={() => invalidateEmployee(employee.id)}
                             className={'h-7 mx-2 cursor-pointer'}/>
                        {!employee.user.roles.includes('ADMIN') &&
                            <img src={AdminIcon} alt={'admin_icon'} className={'cursor-pointer h-8'}
                                 onClick={() => setEmployeeAsAdmin(employee.id)}/>
                        }
                    </div>
                </div>
            ))}
        </div>
        <div className={'bg-lightSky h-full rounded-xl p-2 text-center'}>
            <span className={'font-bold text-2xl text-darkerSky'}>UNESI NOVOG ZAPOSLENIKA</span>
            <form className={'grid grid-cols-2'}>
                <div className={'pr-1'}>
                    <label
                        className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Ime:</label>
                    <input type="text" name="firstName" id="firstName"
                           value={registerData.firstName}
                           onChange={handleChange}
                           className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"/>
                </div>
                <div className={'pl-1'}>
                    <label
                        className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Prezime:</label>
                    <input type="text" name="lastName" id="lastName" value={registerData.lastName}
                           onChange={handleChange}
                           className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"/>
                </div>
                <div className={'pr-1'}>
                    <label
                        className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>E-mail:</label>
                    <input type="email" name="username" id="username" value={registerData.username}
                           onChange={handleChange}
                           className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"/>
                </div>
                <div className={'pl-1'}>
                    <label
                        className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>OIB:</label>
                    <input type="text" name="pin" id="pin" value={registerData.pin}
                           onChange={handleChange}
                           className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"/>
                </div>
                <div className={'pr-1'}>
                    <label className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Datum
                        rođenja:</label>
                    <input type="date" name="dateOfBirth" id="dateOfBirth"
                           value={registerData.dateOfBirth}
                           onChange={handleChange}
                           className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"/>
                </div>
                <div className={'pl-1'}>
                    <label
                        className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Profesija:</label>
                    <input type="text" name="profession" id="profession" onChange={handleChange}
                           value={registerData.profession}
                           className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"/>
                </div>
                <div className={'pr-1'}>
                    <label className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Broj
                        mobitela:</label>
                    <input type="text" name="phoneNumber" id="phoneNumber"
                           value={registerData.phoneNumber}
                           onChange={handleChange}
                           className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"/>
                </div>
                <div className={'pl-1'}>
                    <label
                        className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Spol:</label>
                    <select name="gender" id="gender" onChange={handleChange}
                            value={registerData.gender}
                            className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2">
                        <option value={""}>Odaberi spol</option>
                        <option value={"MALE"}>Muško</option>
                        <option value={"FEMALE"}>Žensko</option>
                        <option value={"OTHER"}>Drugo</option>
                    </select>
                </div>
            </form>
            <button onClick={registerNewEmployee}
                    className={'bg-darkestSky font-bold text-white p-3 rounded-xl my-3'}>UNESI
                ZAPOSLENIKA
            </button>
        </div>
    </div>);
}

function Patients({props}) {

    const [patientsList, setPatientsList] = useState([]);

    useEffect(() => {
        const getPatients = async () => {
            await api.get('/patient', {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
                }
            }).then((res) => {
                setPatientsList(res.data)
            }).catch(() => {
                toast.error("Provjerite internetsku vezu.");
            });
        }
        getPatients();
    }, []);

    return (
        <div className='mx-2 w-[90vw] h-full'>
            <div
                className={'bg-lightSky flex flex-col h-full items-center rounded-xl overflow-y-scroll p-2'}>
                {patientsList.map((patient, key) => (
                    <div
                        key={key}
                        className={
                            'bg-white p-4 text-darkerSky md:text-2xl flex flex-col sm:flex-row justify-between rounded-lg mx-4 my-2 w-3/4'
                        }>
                        <span className={'font-bold'}>{patient.firstName} {patient.lastName}</span>
                        <span>Datum rođenja: {patient.dateOfBirth.split('-')[2]}.{patient.dateOfBirth.split('-')[1]}.{patient.dateOfBirth.split('-')[0]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Rooms({props}) {

    const [rooms, setRooms] = useState([]);

    const [roomRegisterData, setRoomRegisterData] = useState({
        label: '',
        capacity: '',
        specialMessage: ''
    });

    const getRooms = async () => {
        await api.get('/employee/room', {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then((res) => {
            setRooms(res.data.sort((a, b) => a.id - b.id));
        }).catch((err) => {
            toast.error("Provjerite internetsku vezu.");
        });
    };

    const handleRoomChange = (e) => {
        const {name, value} = e.target;
        setRoomRegisterData({...roomRegisterData, [name]: value});
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
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success("Uspješno unesena nova soba");
            getRooms();
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
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success('Uspješno izbrisana soba');
            getRooms();
        })
            .catch(() => toast.error('Dogodila se pogreška.'))
    };

    const setRoomAsOperable = async (roomId) => {
        await api.post('/employee/room/operable/' + roomId, null, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success("Soba je postavljena kao operabilna");
            getRooms();
        }).catch(() => {
            toast.error("Dogodila se pogreška");
        })
    };

    const setRoomAsInOperable = async (roomId) => {
        await api.post('/employee/room/inoperable/' + roomId, null, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success("Soba je postavljena kao inoperabilna");
            getRooms();
        }).catch(() => {
            toast.error("Dogodila se pogreška");
        })
    };

    useEffect(() => {
        getRooms();
    }, []);

    return (<div className='mx-2 w-full grid md:grid-cols-2 grid-cols-1 gap-2'>
        <div className='bg-lightSky h-full rounded-xl overflow-y-scroll p-2'>
            {rooms.map((room, key) => (
                <div
                    key={key}
                    className={room.status === 'OPERABLE' ?
                        'bg-white p-4 text-darkerSky flex flex-row justify-between rounded-lg text-2xl m-4 transition-all duration-500' :
                        'bg-lightGray p-4 text-gray flex flex-row justify-between rounded-lg text-2xl m-4 transition-all duration-500'}>
                    <span className={'font-bold'}>{room.label}</span>
                    <div className={'flex flex-row justify-center items-center'}>
                        <span className={'font-bold'}>Kapacitet: {room.capacity}</span>
                        <img src={Cross} alt={'cross'}
                             onClick={() => invalidateRoom(room.id)}
                             className={'h-7 mx-2 cursor-pointer'}/>
                        {room.status === 'OPERABLE' ? <img src={InOperable} alt={'inoperable'}
                                                           onClick={() => setRoomAsInOperable(room.id)}
                                                           className={'h-7 mx-2 cursor-pointer'}/> :
                            <img src={Operable} alt={'operable'}
                                 onClick={() => setRoomAsOperable(room.id)}
                                 className={'h-7 mx-2 cursor-pointer'}/>}

                    </div>
                </div>
            ))}

        </div>
        <div className={'bg-lightSky h-full rounded-xl p-2 text-center'}>
            <span className={'font-bold text-2xl text-darkerSky'}>UNESI NOVU SOBU</span>
            <form className={'grid grid-cols-2'}>
                <div className={'pr-1'}>
                    <label
                        className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Oznaka
                        sobe:</label>
                    <input type="text" name="label" id="label"
                           value={roomRegisterData.label}
                           onChange={handleRoomChange}
                           className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"/>
                </div>
                <div className={'pl-1'}>
                    <label
                        className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Kapacitet:</label>
                    <input type="text" name="capacity" id="capacity" value={roomRegisterData.capacity}
                           onChange={handleRoomChange}
                           className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"/>
                </div>
                <div className={'col-span-2'}>
                    <label className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Dodatne
                        informacije:</label>
                    <textarea name={'specialMessage'} id={'specialMessage'} maxLength={255}
                              className="text-start h-56 text-ellipsis w-full bg-white opacity-80 mb-[2px] rounded-[5px] p-2"
                              onChange={handleRoomChange} value={roomRegisterData.specialMessage}/>
                </div>
            </form>
            <button onClick={registerNewRoom}
                    className={'bg-darkestSky font-bold text-white p-3 rounded-xl my-2'}>UNESI
                SOBU
            </button>
        </div>
    </div>);
}

function Equipment({props}) {


    const [equipmentList, setEquipmentList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [equipmentRegisterData, setEquipmentRegisterData] = useState({
        name: '',
        specialMessage: '',
        roomId: 0
    });

    const getEquipment = async () => {
        try {
            const [roomRes, equipmentRes] = await Promise.all([
                api.get('/employee/room', {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
                    }
                }),
                api.get('/employee/equipment', {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
                    }
                })
            ])
            setEquipmentList(equipmentRes.data.sort((a, b) => a.id - b.id));
            setRoomList(roomRes.data);

        } catch (err) {
            toast.error("Provjerite internetsku vezu.");
        }
    }

    const invalidateEquipment = async (equipmentId) => {
        await api.delete('/employee/equipment/' + equipmentId, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success('Uspješno izbrisana oprema.');
            getEquipment();
        })
            .catch(() => toast.error('Dogodila se pogreška.'))
    };

    const setEquipmentAsOutOfService = async (equipmentId) => {
        await api.post('/employee/equipment/inoperable/' + equipmentId, null, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success("Oprema je postavljena kao inoperabilna.");
            getEquipment();
        }).catch(() => {
            toast.error("Dogodila se pogreška.");
        })
    };

    const setEquipmentAsOperable = async (equipmentId) => {
        await api.post('/employee/equipment/operable/' + equipmentId, null, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success("Oprema je postavljena kao operabilna.");
            getEquipment();
        }).catch(() => {
            toast.error("Dogodila se pogreška.");
        })
    };

    const handleEquipmentChange = (e) => {
        const {name, value} = e.target;
        setEquipmentRegisterData({...equipmentRegisterData, [name]: value});
    }

    const validateEquipmentRegisterData = () => {
        if (equipmentRegisterData.name.match(/^ *$/) !== null) {
            toast.info("Unesite naziv opreme");
        }
    };

    const registerNewEquipment = async (e) => {
        e.preventDefault();
        validateEquipmentRegisterData();
        await api.post('/employee/equipment', equipmentRegisterData, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            toast.success("Uspješno unesena nova oprema");
            getEquipment();
            setEquipmentRegisterData({
                name: '',
                specialMessage: ''
            });
        }).catch((err) => {
            if (err.code === "ERR_NETWORK") {
                toast.error("Greška. Provjerite internet vezu ili kontaktirajte podršku.")
            } else {
                toast.warn("Podaci nisu valjani. Provjerite podatke opreme.");
            }
        });
    };

    useEffect(() => {
        getEquipment();
    }, []);

    return (<div className='mx-2 w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
        <div className={'bg-lightSky h-full rounded-xl overflow-y-scroll p-2'}>
            {equipmentList.map((equipment, key) => (
                <div key={key}
                     className={equipment.status === 'OPERABLE' ? 'bg-white p-4 text-darkerSky flex flex-row justify-between rounded-lg text-2xl m-4 transition-all duration-500' : 'bg-lightGray p-4 text-gray flex flex-row justify-between rounded-lg text-2xl m-4 transition-all duration-500'}>
                    <span className={'font-bold'}>{equipment.name}</span>
                    <div className={'flex flex-row justify-center items-center'}>
                        <img src={Cross} alt={'cross'}
                             onClick={() => invalidateEquipment(equipment.id)}
                             className={'h-7 mx-2 cursor-pointer'}/>
                        {
                            equipment.status === 'OPERABLE' ? <img src={InOperable} alt={'inoperable'}
                                                                   onClick={() => setEquipmentAsOutOfService(equipment.id)}
                                                                   className={'h-7 mx-2 cursor-pointer'}/> :
                                <img src={Operable} alt={'operable'}
                                     onClick={() => setEquipmentAsOperable(equipment.id)}
                                     className={'h-7 mx-2 cursor-pointer'}/>
                        }

                    </div>
                </div>
            ))}
        </div>
        <div className={'bg-lightSky h-full rounded-xl p-2 text-center'}>
            <span className={'font-bold text-2xl text-darkerSky'}>UNESI NOVU OPREMU</span>
            <form className={'grid grid-cols-2'}>
                <div className={'pr-1'}>
                    <label
                        className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Naziv
                        opreme:</label>
                    <input type="text" name="name" id="name"
                           value={equipmentRegisterData.name}
                           onChange={handleEquipmentChange}
                           className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"/>
                </div>

                <div className={'pl-1'}>
                    <label
                        className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Soba:</label>

                    <select name="roomId" id="roomId" onChange={handleEquipmentChange}
                            value={equipmentRegisterData.roomId}
                            className="w-full h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2">
                        <option value={""}>Odaberite sobu...</option>
                        {roomList.map((room, key) => (
                            <option key={key} value={room.id}>{room.label}</option>
                        ))}
                    </select>
                </div>

                <div className={'col-span-2'}>
                    <label className={'font-bold text-mediumSky text-lg mt-[15px] self-start block'}>Dodatne
                        informacije:</label>
                    <textarea name={'specialMessage'} id={'specialMessage'} maxLength={255}
                              className="text-start h-56 text-ellipsis w-full bg-white opacity-80 mb-[2px] rounded-[5px] p-2"
                              onChange={handleEquipmentChange}
                              value={equipmentRegisterData.specialMessage}/>
                </div>
            </form>
            <button onClick={registerNewEquipment}
                    className={'bg-darkestSky font-bold text-white p-3 rounded-xl my-2'}>UNESI
                OPREMU
            </button>
        </div>
    </div>);
}