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
    const [therapyScan, setTherapyScan] = useState(null);


    useEffect(() => {
        let roles = sessionStorage.getItem('roles');
        if (!roles.includes('PATIENT')) {
            navigate('/');
        }

        async function getUserTherapies() {
            await api.get('/patient/therapies', {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
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
        if (therapyScan == null) {
            toast.warn('Priložite sken uputnice.')
            return;
        }
        const formData = new FormData();
        formData.append('type', newTherapyData.type);
        formData.append('request', newTherapyData.request);
        formData.append('doctorFullName', newTherapyData.doctorFullName);
        formData.append('referenceId', newTherapyData.referenceId);
        formData.append('therapyScan', therapyScan);

        await api.post('/patient/therapy', formData, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('access-token')
            }
        }).then(() => {
            navigate('/');
        }).catch(() => {
            toast.error('Nemoguce zatraziti terapiju. Dogodila se pogreska.');
        })
    };

    const onPdfChange = (e) => {
        if (e.target.value.length === 0)
            return;
        if (e.target.files) {
            if ((e.target.files[0].size / (1024 * 1024)) > 2) {
                toast.error('Najveća dozvoljena veličina je 2 MB.');
                return;
            }
            setTherapyScan(e.target.files[0]);
        } else {
            toast.error('Dogodila se greška.');
        }

    }

    return (
        <PageLayout>
            <Header/>
            <div className={'dark:bg-black flex flex-col h-full items-center justify-center text-darkerSky dark:text-lightSky font-bold text-center'}>
                <form onSubmit={requestNewTherapy}
                      className={'w-full md:w-5/6 xl:w-1/2 flex flex-col justify-center items-center bg-lightSky dark:bg-darkSky p-5 h-full my-5 rounded-lg'}>
                    <h1 className={'font-bold mb-8 text-3xl'}>Zahtjev za novu terapiju</h1>
                    <label htmlFor={'therapyType'} className={'text-start p-2'}>Vrsta oboljenja:</label>
                    <input id={'therapyType'} name={'type'} value={newTherapyData.type}
                           className={'w-4/5 lg:w-1/2 h-[40px] bg-white dark:text-darkestSky opacity-80 mb-[2px] rounded-[5px] p-2'}
                           onChange={handleChange}
                           type={'text'}/>
                    <label htmlFor={'therapyRequest'} className={'text-start p-2'}>Opis oboljenja:</label>
                    <textarea id={'therapyRequest'} name={'request'} value={newTherapyData.request}
                              className={'w-4/5 lg:w-1/2 h-[120px] bg-white dark:text-darkestSky opacity-80 mb-[2px] rounded-[5px] p-2'}
                              maxLength={255}
                              onChange={handleChange}/>
                    <label htmlFor={'doctorFullName'} className={'text-start p-2'}>Uputnicu izdao/la (Ime
                        prezime):</label>
                    <input id={'doctorFullName'} name={'doctorFullName'} value={newTherapyData.doctorFullName}
                           onChange={handleChange}
                           className={'w-4/5 lg:w-1/2 h-[40px] bg-white dark:text-darkestSky opacity-80 mb-[2px] rounded-[5px] p-2'}
                           type={'text'}/>
                    <label htmlFor={'referenceId'} className={'text-start p-2'}>Referenca na prijašnju terapiju:</label>
                    <select id={'referenceId'} name={'referenceId'} value={newTherapyData.referenceId}
                            className="w-4/5 lg:w-1/2 h-[40px] bg-white dark:text-darkestSky opacity-80 mb-[2px] rounded-[5px] p-2"
                            onChange={handleChange}>
                        <option value={""}>Odaberite terapiju po potrebi...</option>
                        {userTherapies.map((therapy, key) => (
                            <option key={key} value={therapy.id}>{therapy.type}</option>
                        ))}
                    </select>
                    <label>Priložite sken uputnice:</label>
                    <input type='file'
                           accept='application/pdf'
                           onChange={onPdfChange}
                           className='rounded-[10px] text-darkerSky dark:text-lightSky outline-dashed outline-2 dark:outline-black p-2 w-4/5 lg:w-1/2 my-2 outline-darkerSky cursor-pointer'>
                    </input>
                    <button className={'transition-all duration-300 dark:shadow-md dark:shadow-black text-white p-4 bg-mediumSky dark:bg-darkestSky hover:dark:bg-darkerSky rounded-md my-4'} type={"submit"}>Zatraži terapiju
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