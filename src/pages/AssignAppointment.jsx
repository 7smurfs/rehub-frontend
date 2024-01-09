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
    let { state } = useLocation();

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
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setEmployeeTherapies(res.data);
            });
        }

        async function getRooms(){
            await api.get('/employee/room', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                setRooms(res.data);
            })
        }

        async function getEquipment(){
            await api.get('/employee/equipment', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
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
        const  { name, value } = e.target;

        setApptData({
            ...apptData,
            [name]: parseInt(value)
        });
    }


    return(
      <PageLayout>
          <Header />
          <div className={'h-full flex flex-col'}>
              <div className={'h-14 flex items-center pl-5'}>
                  <h1 className={'text-sky-800 font-bold text-2xl underline'}>Pacijent {state.patientResponse.firstName} {state.patientResponse.lastName}</h1>
              </div>
              <div className={'h-full grid grid-cols-4 grid-rows-2 gap-3 pl-3 pr-3 pb-3'}>
                  <div className={'col-span-2 row-span-1 py-2'}>
                      {/*<div className={'h-8 flex items-center pl-3'}>
                          <span className={'w-52 font-bold text-sky-600'}>Dolazak:</span>
                          <span>
                              {state.referenceTherapyId ? 'Prvi' : 'Ponovni'}
                          </span>
                      </div>*/}
                      <div className={'h-8 flex items-center pl-3'}>
                          <span className={'w-52 font-bold text-sky-600'}>Vrsta oboljenja:</span>
                          <span>{state.type}</span>
                      </div>
                      <div className={'h-8 flex items-center pl-3'}>
                          <span className={'w-52 font-bold text-sky-600'}>Opis oboljenja:</span>
                          <span>{state.request}</span>
                      </div>
                      <div className={'h-8 flex items-center pl-3'}>
                          <span className={'w-52 font-bold text-sky-600'}>Uputnicu izdao/la:</span>
                          <span>Iva Ivanić dr. med.</span>
                      </div>
                      <div className={'h-8 flex items-center pl-3'}>
                          <span className={'w-52 font-bold text-sky-600'}>Postupak liječenja:</span>
                          <span>Vježbe za poboljšanje mobilnosti, vježbe za vraćanje snage mišića</span>
                      </div>
                  </div>
                  <div className={'bg-sky-200 col-span-1 row-span-2 px-3'}>
                      <div className={'h-8 flex items-center'}>
                          <h3 className={'text-sky-800 font-semibold text-lg'}>Slobodne sobe</h3>
                      </div>
                      {rooms.length === 0 ? (
                          <div className={'h-5/6 flex flex-col justify-center items-center p-3'}>
                              <span className={'text-gray-500'}>Trenutno nema slobodnih soba.</span>
                          </div>
                      ) : (
                          <div className={'h-5/6 bg-white flex flex-col gap-3 p-3 overflow-y-scroll'}>
                              {rooms.map((room, key) => (
                                  <div key={key} className={'flex'}>
                                      <input type="radio" value={room.id} name="roomId" id={`room${room.id}`} onChange={handleOptionChange}/>
                                      {room.status === 'OPERABLE' && (
                                      <CollapsibleRoomTab key={key} title={(
                                          <>
                                              <span className={'font-bold block text-xl'}>{room.label}</span>
                                              <span
                                                  className={'font-semibold text-md'}>Kapacitet: {room.capacity}</span>
                                          </>

                                      )} content={(
                                          <div>
                                              {equipment.map((eq, key) => (
                                                  eq.status === 'OPERABLE' && eq.roomId === room.id &&
                                                  <div key={key}>
                                                      <span className={'text-sky-950'}>{eq.name}</span>
                                                  </div>
                                              ))}
                                          </div>
                                      )}/>
                                      )}
                                  </div>

                              ))}


                          </div>
                      )}


                  </div>
                  <div className={'bg-sky-200 col-span-1 row-span-1 px-3'}>
                      <div className={'h-8 flex items-center'}>
                          <h3 className={'text-sky-800 font-semibold text-lg'}>Trajanje zahvata</h3>
                      </div>
                      <div className={'h-3/5 bg-sky-50 flex flex-col gap-2 px-3 py-1'}>
                          <div className={'flex'}>
                              <label className={'w-20'}>Početak: </label>
                              <input type="datetime-local" name={'startAt'} id={'startAt'} onChange={handleChange}/>
                          </div>
                          <div className={'flex'}>
                              <label className={'w-20'}>Kraj: </label>
                              <input type="datetime-local" name={'endAt'} id={'endAt'} onChange={handleChange}/>
                          </div>
                      </div>
                  </div>
                  {/*<div className={'bg-sky-200 col-span-1 row-span-1 px-3'}>
                      <div className={'h-8 flex items-center'}>
                          <h3 className={'text-sky-800 font-semibold text-lg'}>Dostupni djelatnici</h3>
                      </div>
                      <div className={'h-3/5 bg-sky-50'}></div>
                  </div>*/}
                  <div className={'bg-sky-100 col-span-2 row-span-2 w-1/2 justify-self-center'}>
                      <div className={'h-8 flex items-center pl-2'}>
                          <h3 className={'text-sky-800 font-semibold text-lg'}>Moji termini</h3>
                      </div>

                      {employeeTherapies.length === 0 ? (
                          <div className={'h-5/6 flex flex-col justify-center items-center p-3'}>
                              <span className={'text-gray-500'}>Trenutno nema terapija.</span>
                          </div>
                      ) : (
                          employeeTherapies.map((therapy, key) => (
                              <div key={key} className={'h-5/6 flex flex-col items-center p-3 overflow-y-scroll'}>
                                  <div className={'bg-sky-500 w-full h-auto p-2 text-sky-950 rounded-[5px]'}>
                                      <h1 className={'font-bold'}>{therapy.patientResponse.firstName} {therapy.patientResponse.lastName}</h1>
                                      <span className={'block'}>{therapy.type}</span>
                                      <span className={'block'}>{therapy.roomLabel}</span>
                                      <span className={'block'}>{therapy.startAt} - {therapy.endAt}</span>
                                  </div>
                              </div>
                          ))
                      )}

                  </div>

              </div>
              <div className={'w-full flex justify-center pb-3 gap-3'}>
                  <AppointmentPopup data={apptData} name={{fname: state.patientResponse.firstName, lname: state.patientResponse.lastName}}/>
                  <button onClick={() => navigate('/dashboard')}
                          className={'bg-sky-800 w-24 p-2 rounded-[5px] text-white font-semibold'}>Odustani
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
    );
}

export default AssignAppointment;