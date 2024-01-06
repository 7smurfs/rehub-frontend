import React, {useState} from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../http/api";
import {toast, ToastContainer} from "react-toastify";

function AppointmentResultMain() {

    const [therapyResultData , setTherapyResultData] = useState({
        therapyId: '',
        result: '',
        status: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTherapyResultData({...therapyResultData, [name]: value});
    }

    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/therapy/result", therapyResultData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            toast.success("Uspjesno unesen rezultat terapije")
        }).catch(() => toast.error("Dogodila se greška."));
    }

    return (
        <PageLayout>
            <div className={'flex flex-col h-full items-center justify-center text-sky-900 font-bold mx-3 text-center'}>
                <form onSubmit={handleSubmit}
                      className={'w-full md:w-5/6 xl:w-1/2 flex flex-col justify-center bg-sky-200 p-10 h-full my-5 rounded-lg'}>
                    <h1 className={'font-bold mb-8 text-3xl'}>Rezultati ciklusa terapije</h1>
                    <div style={{ display: 'flex'}}>
                        <label className={'text-start p-2 mr-10'}>Ime i prezime pacijenta: </label>
                        <label className={'text-start p-2 text-black font-medium'}>Luka vivoda</label>
                    </div>
                    <div style={{ display: 'flex'}}>
                        <label className={'text-start p-2 mr-10'}>Potrebno daljnje liječenje: </label>
                        <label className={'mr-10 p-2'}>
                            <input
                                type="radio"
                                value="option1"
                                checked={selectedOption === 'option1'}
                                onChange={handleOptionChange}
                            />
                            Da
                        </label>

                        <label className={'mr-10 p-2'}>
                            <input
                                type="radio"
                                value="option2"
                                checked={selectedOption === 'option2'}
                                onChange={handleOptionChange}
                            />
                            Ne
                        </label>
                    </div>
                    <label htmlFor={'therapyRequest'} className={'text-start pt-2 pl-2'}>Opaska:</label>
                    <textarea id={'therapyResult'} name={'result'} value={therapyResultData.result}
                              className={'w-4/5 lg:w-1/2 h-[120px] bg-white opacity-80 mb-[2px] rounded-[5px] p-2'}
                              maxLength={255}
                              onChange={handleChange}/>

                    <button className={'text-white p-4 bg-sky-600 rounded-xl my-4 w-1/6'} type={"submit"}>Unesi
                    </button>
                </form>
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
        </PageLayout>
    );

}

export default AppointmentResultMain;