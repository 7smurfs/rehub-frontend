import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import api from "../http/api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";
import show from "../assets/show-pass.svg";
import hide from "../assets/hide-pass.svg";


function RegisterForm() {

    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        pin: '',
        phoneNumber: '',
        phin: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dateOfBirth: ''
    });
    const [captchaValid, setCaptchaValid] = useState(false);

    const [showPass, setShowPass] = useState(true);
    const [showRepeatPass, setShowRepeatPass] = useState(true);

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
        if (/^\d+$/.test(registerData.phin)) {
            if (registerData.phin.length !== 9)
                toast.info("MBO nije ispravne duljine")
        } else {
            toast.info("MBO mora sadržavati 9 brojki.")
            return;
        }
        if (!/^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(registerData.password)) {
            toast.info("Lozinka se mora sastoji od minimalno 8 brojeva i slova.")
            return;
        }
        if (registerData.password !== registerData.confirmPassword) {
            toast.warn("Lozinke se ne podudaraju")
            return;
        }
        if (registerData.dateOfBirth.match(/^ *$/) !== null) {
            toast.info("Unesite datum rođenja")
            return;
        }
        if (!captchaValid)
            toast.warn("Potvrdite da niste robot")

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            validateRegisterData();
            await api.post('/patient/register', registerData);
            navigate('/login');
        } catch (err) {
            if (err.code === "ERR_NETWORK") {
                toast.error("Greška. Provjerite internet vezu ili kontaktirajte podršku.")
            } else {
                toast.warn("Podaci nisu valjani. Provjerite svoje osobne podatke.");
            }
        }
    };

    const togglePass = () => {
        setShowPass(prevState => !prevState);
    }

    const toggleRepeatPass = () => {
        setShowRepeatPass(prevState => !prevState);
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen w-screen">
                <span
                    className="text-sky-700 font-bold text-3xl justify-self-center self-center my-10">Registracija</span>
                <form className="grid grid-cols-2 grid-rows-5 gap-0 w-screen justify-items-center pl-64 pr-64">
                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Ime:</label>
                        <input type="text" name="firstName" id="firstName" value={registerData.firstName}
                               onChange={handleChange}
                               className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Prezime:</label>
                        <input type="text" name="lastName" id="lastName" value={registerData.lastName}
                               onChange={handleChange}
                               className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">E-mail:</label>
                        <input type="email" name="username" id="username" value={registerData.username}
                               onChange={handleChange}
                               className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Broj
                            telefona:</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" value={registerData.phoneNumber}
                               onChange={handleChange}
                               className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">OIB:</label>
                        <input type="text" name="pin" id="pin" value={registerData.pin} onChange={handleChange}
                               className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">MBO:</label>
                        <input type="text" name="phin" id="phin" value={registerData.phin} onChange={handleChange}
                               className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Lozinka:</label>
                        <div className="relative">
                            <input type={showPass ? "password" : "text"} name="password" id="password" value={registerData.password}
                                   onChange={handleChange}
                                   className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>

                            <img src={showPass ? hide : show} onClick={togglePass}
                                 className="w-6 absolute top-[22%] left-[91%] cursor-pointer" alt={'passEye'}/>
                        </div>

                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Ponovljena lozinka:</label>
                        <div className="relative">
                            <input type={showRepeatPass ? "password" : "text"} name="confirmPassword" id="confirmPassword"
                                   value={registerData.confirmPassword} onChange={handleChange}
                                   className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                            <img src={showRepeatPass ? hide : show} onClick={toggleRepeatPass}
                                 className="w-6 absolute top-[22%] left-[91%] cursor-pointer" alt={'eyePass'}/>
                        </div>

                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Datum
                            rođenja:</label>
                        <input type="date" name="dateOfBirth" id="dateOfBirth" value={registerData.dateOfBirth}
                               onChange={handleChange}
                               className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                    </div>

                    <div className="col-span-1">
                        <label htmlFor={'gender'}
                               className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Spol:</label>
                        <select name="gender" id="gender" value={registerData.gender} onChange={handleChange}
                                className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2">
                            <option value={""}>Odaberi spol</option>
                            <option value={"MALE"}>Muško</option>
                            <option value={"FEMALE"}>Žensko</option>
                            <option value={"OTHER"}>Drugo</option>
                        </select>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_RECAPTCHA_KEY.toString()}
                            onChange={() => setCaptchaValid(true)}
                        />
                    </div>
                    <button
                        disabled={!captchaValid && true}
                        className={captchaValid ?
                            "bg-sky-600 text-white font-semibold px-8 py-4 my-10 rounded-[5px]"
                            :
                            "bg-gray-600 text-white font-semibold px-8 py-4 my-10 rounded-[5px]"
                        }
                        onClick={handleSubmit}>Registriraj se
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
        </>
    );
}


export default RegisterForm;
