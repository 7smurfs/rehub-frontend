import React, {useEffect, useState} from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppointmentPopup from "../components/AppointmentPopup";
import {useNavigate, useLocation} from "react-router-dom";
import api from "../http/api";
import {toast} from "react-toastify";
import arrowDown from "../assets/arrow-down.svg";

function AssignAppointment() {

    const navigate = useNavigate();
    const location = useLocation();

    const [employeeTherapies, setEmployeeTherapies] = useState([]);
    const [rooms, setRooms] = useState([]);



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

        getEmployeeTherapies().catch(() => toast.error('Dogodila se pogreška.'));
        getRooms().catch((err) => toast.error("Dogodila se pogreška."));
    }, []);


    let ct = 1;

    return(
      <PageLayout>
          <Header />
          <div className={'h-full flex flex-col'}>
              <div className={'h-14 flex items-center pl-5'}>
                  <h1 className={'text-sky-800 font-bold text-2xl underline'}>Pacijent Luka Lukić</h1>
              </div>
              <div className={'h-full grid grid-cols-4 grid-rows-2 gap-3 pl-3 pr-3 pb-3'}>
                  <div className={'col-span-2 row-span-1 py-2'}>
                      <div className={'h-8 flex items-center pl-3'}>
                          <span className={'w-52 font-bold text-sky-600'}>Dolazak:</span>
                          <span>Prvi</span>
                      </div>
                      <div className={'h-8 flex items-center pl-3'}>
                          <span className={'w-52 font-bold text-sky-600'}>Vrsta oboljenja:</span>
                          <span>Prijelom potkoljenice</span>
                      </div>
                      <div className={'h-8 flex items-center pl-3'}>
                          <span className={'w-52 font-bold text-sky-600'}>Opis oboljenja:</span>
                          <span>Potrebna rehabilitacija nakon skidanja gipsa</span>
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
                  <div className={'bg-sky-100 col-span-1 row-span-2 px-3'}>
                      <div className={'h-8 flex items-center'}>
                          <h3 className={'text-sky-800 font-semibold text-lg'}>Slobodne sobe</h3>
                      </div>
                      {rooms.length === 0 ? (
                          <div className={'h-5/6 flex flex-col justify-center items-center p-3'}>
                              <span className={'text-gray-500'}>Trenutno nema slobodnih soba.</span>
                          </div>
                      ) : (
                          <div className={'h-5/6 bg-sky-50 overflow-y-scroll'}>
                              {rooms.map((room, key) => (
                                  room.status === 'OPERABLE' && (
                                      <div key={key} className={'bg-white p-4 text-sky-900 rounded-lg flex justify-between items-center m-4 transition-all duration-500'}>
                                          <div>
                                              <span className={'font-bold block text-xl'}>{room.label}</span>
                                              <span className={'font-semibold text-md'}>Kapacitet: {room.capacity}</span>
                                          </div>
                                          <div>
                                              <img src={arrowDown} alt="arrow down" className={'w-8'} />
                                          </div>

                                      </div>
                                  )
                              ))}
                          </div>
                      )}


                  </div>
                  <div className={'bg-sky-100 col-span-1 row-span-1 px-3'}>
                      <div className={'h-8 flex items-center'}>
                          <h3 className={'text-sky-800 font-semibold text-lg'}>Dostupni djelatnici</h3>
                      </div>
                      <div className={'h-3/5 bg-sky-50'}></div>
                  </div>
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
                  <div className={'bg-sky-100 col-span-1 row-span-1 px-3'}>
                      <div className={'h-8 flex items-center'}>
                          <h3 className={'text-sky-800 font-semibold text-lg'}>Trajanje zahvata</h3>
                      </div>
                      <div className={'h-3/5 bg-sky-50'}></div>
                  </div>
              </div>
              <div className={'w-full flex justify-center pb-3 gap-3'}>
                  <AppointmentPopup/>
                  <button onClick={() => navigate('/dashboard')}
                          className={'bg-sky-800 w-24 p-2 rounded-[5px] text-white font-semibold'}>Odustani
                  </button>
              </div>

          </div>
          <Footer/>
      </PageLayout>
    );
}

export default AssignAppointment;