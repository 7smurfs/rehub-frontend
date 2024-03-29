import Footer from '../components/Footer';
import Header from '../components/Header';
import PageLayout from '../components/PageLayout';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import api from "../http/api";
import {toast, ToastContainer} from "react-toastify";
import hide from "../assets/hide-pass.svg";
import show from "../assets/show-pass.svg";

function SetNewPassword() {

    const navigate = useNavigate();
    const {tkn} = useParams();

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [data, setData] = useState({
        newPass: '',
        confirmPass: '',
        token: tkn
    });

    useEffect(() => {
        if (tkn.length !== 36)
            navigate('/');
    }, [navigate, tkn.length]);

    const togglePass = () => {
        setShowPass(prevState => !prevState);
    }

    const toggleConfirmPass = () => {
        setShowConfirmPass(prevState => !prevState);
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/auth/reset/password", data).then(() => navigate("/login")).catch(
            () => toast.error("Dogodila se pogreška. Provjerite internetsku vezu.")
        );
    }

    return (
        <PageLayout>

            <Header/>
            <div className="flex justify-center dark:bg-black">
                <div
                    className="bg-white dark:bg-darkestSky w-full mx-6 mb-10 sm:w-2/3 sm:mx-14 lg:w-1/3 shadow-xl rounded-[10px] mt-8 flex flex-col">
                    <div
                        className="w-full h-24 bg-mediumSky dark:bg-darkSky opacity-50 dark:opacity-100 rounded-tl-[10px] rounded-tr-[10px] flex justify-center items-center text-center">
                        <span className="text-white dark:text-lightSky font-bold text-3xl ml-1">Unesite novu lozinku</span>
                    </div>
                    <form className="flex flex-col gap-0 w-full justify-items-center p-10">
                        <label className="font-bold text-mediumSky dark:text-lightSky text-lg mt-[30px] self-start ml-2">Lozinka:</label>
                        <div className="relative">
                            <input type={showPass ? "text" : "password"} name="newPass" id="newPass"
                                   className="w-full h-[40px] bg-lightSky opacity-50 dark:opacity-70 mb-[2px] rounded-[5px] p-2"
                                   value={data.newPass} onChange={handleChange}/>
                            <img src={showPass ? hide : show} onClick={togglePass}
                                 className="w-6 absolute top-[22%] left-[89%] cursor-pointer" alt={'passEye'}/>
                        </div>
                        <label
                            className="font-bold text-mediumSky dark:text-lightSky text-lg mt-[15px] self-start ml-2">Potvrdi
                            lozinku:</label>
                        <div className="relative">
                            <input type={showConfirmPass ? "text" : "password"} name="confirmPass" id="confirmPass"
                                   className="w-full h-[40px] bg-lightSky opacity-50 dark:opacity-70 mb-[2px] rounded-[5px] p-2"
                                   value={data.confirmPass} onChange={handleChange}/>
                            <img src={showConfirmPass ? hide : show} onClick={toggleConfirmPass}
                                 className="w-6 absolute top-[22%] left-[89%] cursor-pointer" alt={'passEye'}/>
                        </div>
                        <button
                            className="transition-all duration-300 sm:w-1/2 mx-auto bg-mediumSky dark:bg-darkerSky shadow-md hover:bg-darkSky shadow-darkerSky hover:dark:bg-darkSky dark:shadow-md dark:shadow-black text-white font-semibold px-5 py-3 my-10 rounded-[5px]"
                            onClick={handleSubmit}>Promijeni lozinku
                        </button>
                    </form>
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

export default SetNewPassword;