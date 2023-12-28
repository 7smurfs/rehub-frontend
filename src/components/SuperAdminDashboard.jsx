import React, {useEffect, useState} from "react";
import api from "../http/api";

function SuperAdminDashboard() {

    const [statistics, setStatistics] = useState({});
    const [showComponent, setShowComponent] = useState(null);
    const [patientsList, setPatientsList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        setStatistics(api.get('/stats', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => setStatistics(res.data)));
    }, []);

    const showEmployeeComponent = async () => {
        await api.get('/employee', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => setEmployeeList(res.data))
        setShowComponent(1);
    }

    const showPatientComponent = async () => {
        await api.get('/patient', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) =>
            setPatientsList(res.data)
        )
        setShowComponent(2);
    }

    return (
        <div className="flex flex-col h-full">
            <div className={'grid grid-cols-4 font-bold text-2xl tracking-wider text-center text-sky-800 my-3'}>
                <div onClick={showEmployeeComponent}
                     className={'bg-sky-200 rounded-xl h-full p-3 mx-3 cursor-pointer'}>OSOBLJE
                </div>
                <div onClick={showPatientComponent}
                     className={'bg-sky-200 rounded-xl h-full p-3 mx-3 cursor-pointer'}>PACIJENTI
                </div>
                <div onClick={() => setShowComponent(3)}
                     className={'bg-sky-200 rounded-xl h-full p-3 mx-3 cursor-pointer'}>SOBE
                </div>
                <div onClick={() => setShowComponent(4)}
                     className={'bg-sky-200 rounded-xl h-full p-3 mx-3 cursor-pointer'}>OPREMA
                </div>
            </div>
            <div className={'flex justify-center my-auto'}>
                {
                    showComponent === 1 &&
                    <div className={'mx-2 w-full grid grid-cols-2 gap-2'}>
                        <div className={'bg-sky-200'}>
                            {employeeList.map((employee, key) => (
                                <div
                                    key={key}
                                    className={
                                        'bg-white p-4 flex flex-row items-center rounded-lg text-3xl m-4 w-3/4'
                                    }>
                                    <div
                                        key={key}
                                        className={
                                            'bg-white p-4 text-sky-900 flex flex-row justify-between rounded-lg text-2xl m-4 w-3/4'
                                        }>
                                        <span>{employee.firstName} {employee.lastName}</span>
                                        <span>{employee.profession}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={'bg-sky-200'}>
                            asdas
                        </div>
                    </div>
                }
                {
                    showComponent === 2 && <div className={'mx-2 w-full'}>
                        <div className={'bg-sky-200 flex flex-col justify-center items-center rounded-xl'}>
                            {patientsList.map((patient, key) => (
                                <div
                                    key={key}
                                    className={
                                        'bg-white p-4 text-sky-900 flex flex-row justify-between rounded-lg text-2xl m-4 w-3/4'
                                    }>
                                    <span>{patient.firstName} {patient.lastName}</span>
                                    <span>Datum rođenja: {patient.dateOfBirth.split('-')[2]}.{patient.dateOfBirth.split('-')[1]}.{patient.dateOfBirth.split('-')[0]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {
                    showComponent === 3 && <div></div>
                }
                {
                    showComponent === 4 && <div></div>
                }
                {
                    showComponent === null &&
                    <div className={'w-1/3 flex flex-col justify-center text-2xl text-sky-900'}>
                        <span className={'font-bold my-3'}>Broj zaposlenika: {statistics.noOfEmployees}</span>
                        <span className={'font-bold my-3'}>Broj pacijenata: {statistics.noOfPatients}</span>
                        <span className={'font-bold my-3'}>Broj soba: {statistics.noOfRooms}</span>
                        <span className={'font-bold my-3'}>Količina opreme: {statistics.noOfEquipment}</span>
                        <span className={'font-bold my-3'}>Aktivne terapije: {statistics.noOfActiveTherapies}</span>
                        <span
                            className={'font-bold my-3'}>Broj novih korisnika u mjesecu: {statistics.noOfNewUsersForThisMonth}</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default SuperAdminDashboard;