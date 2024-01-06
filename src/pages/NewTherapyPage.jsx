import Footer from '../components/Footer';
import Header from '../components/Header';
import PageLayout from '../components/PageLayout';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../http/api";

function NewTherapyPage() {

    let navigate = useNavigate();
    const [userTherapies, setUserTherapies] = useState([]);

    const [newTherapyData, setNewTherapyData] = useState({
        type: '',
        request: '',
        doctorFullName: '',
        referenceId: ''
    });

    useEffect(() => {
        let roles = localStorage.getItem('roles');
        if (!roles.includes('PATIENT')) {
            navigate('/');
        }

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
    }, [navigate]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewTherapyData({...newTherapyData, [name]: value});
    };

    const requestNewTherapy = async (e) => {
        e.preventDefault();
        if (newTherapyData.type.match(/^ *$/) !== null) {
            toast.info("Unesite vrstu terapije")
            return;
        }
        if (newTherapyData.request.match(/^ *$/) !== null) {
            toast.info("Unesite opis oboljenja")
            return;
        }
        const regexForTwoWords = /^\w+\s\w+$/;
        if (newTherapyData.doctorFullName.match(/^ *$/) !== null && !regexForTwoWords.test(newTherapyData.doctorFullName)) {
            toast.info("Neispravno ime i prezime doktora")
            return;
        }
        await api.post('/patient/therapy', newTherapyData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            navigate('/');
        }).catch(() => {
            toast.error('Nemoguce zatraziti terapiju. Dogodila se pogreska.');
        })
    };

    return (
        <PageLayout>
            <Header/>
            <div className={'flex flex-col h-full items-center justify-center text-sky-900 font-bold text-center'}>
                <form onSubmit={requestNewTherapy}
                      className={'w-full md:w-5/6 xl:w-1/2 flex flex-col justify-center items-center bg-sky-200 p-5 h-full my-5 md:rounded-lg'}>
                    <h1 className={'font-bold mb-8 text-3xl'}>Zahtjev za novu terapiju</h1>
                    <label htmlFor={'therapyType'} className={'text-start p-2'}>Vrsta oboljenja:</label>
                    <input id={'therapyType'} name={'type'} value={newTherapyData.type}
                           className={'w-4/5 lg:w-1/2 h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2'}
                           onChange={handleChange}
                           type={'text'}/>
                    <label htmlFor={'therapyRequest'} className={'text-start p-2'}>Opis oboljenja:</label>
                    <textarea id={'therapyRequest'} name={'request'} value={newTherapyData.request}
                              className={'w-4/5 lg:w-1/2 h-[120px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2'}
                              maxLength={255}
                              onChange={handleChange}/>
                    <label htmlFor={'doctorFullName'} className={'text-start p-2'}>Uputnicu izdao/la (Ime
                        prezime):</label>
                    <input id={'doctorFullName'} name={'doctorFullName'} value={newTherapyData.doctorFullName}
                           onChange={handleChange}
                           className={'w-4/5 lg:w-1/2 h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2'}
                           type={'text'}/>
                    <label htmlFor={'referenceId'} className={'text-start p-2'}>Referenca na prijašnju terapiju:</label>
                    <select id={'referenceId'} name={'referenceId'} value={newTherapyData.referenceId}
                            className="w-4/5 lg:w-1/2 h-[40px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2"
                            onChange={handleChange}>
                        <option value={""}>Odaberite terapiju po potrebi...</option>
                        {userTherapies.map((therapy, key) => (
                            <option key={key} value={therapy.id}>{therapy.type}</option>
                        ))}
                    </select>
                    <button className={'text-white p-4 bg-sky-600 rounded-xl my-4'} type={"submit"}>Zatraži terapiju
                    </button>
                </form>
            </div>
            <Footer/>
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
        </PageLayout>
    );
}

export default NewTherapyPage;