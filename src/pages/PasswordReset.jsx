import Footer from '../components/Footer';
import Header from '../components/Header';
import PageLayout from '../components/PageLayout';
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import api from "../http/api";
import {toast} from "react-toastify";

function PasswordReset() {
    const [data, setData] = useState({
        username : ''
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ [name] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/reset', data);
            navigate("/login");

        } catch (err) {
            if (err.code === "ERR_NETWORK") {
                toast.error("Greška. Provjerite internet vezu ili kontaktirajte podršku.")
            } else {
                toast.warn("Podaci nisu valjani. Provjerite svoje osobne podatke.");
            }
        }
    };

    return (

        <PageLayout>
            <Header />
            <div className="flex justify-center">
                <div
                    className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-[430px] bg-white [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] rounded-[10px] mt-8 mx-3 flex flex-col">
                    <div className="w-full h-32 bg-sky-600 p-2 opacity-50 rounded-t-[10px] flex justify-center items-center">
                        <span className="text-white font-bold text-2xl text-center">Unesite e-mail za promjenu lozinke</span>
                    </div>
                    <form className="flex rounded-b-[10px] flex-col justify-around items-center p-6 lg:p-10">
                        <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-3">E-mail:</label>
                        <input type="text" name="username" id="username" value={data.username} onChange={handleChange}
                               className="w-full h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>
                        <button className="bg-sky-600 font-semibold text-white text-lg px-6 py-2 mt-5 rounded-[5px]" onClick={handleSubmit}>Nastavi</button>
                    </form>
                </div>
            </div>
            <Footer />
        </PageLayout>
    );
}
export default PasswordReset;