import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import api from "../http/api";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";
import show from "../assets/show-pass.svg";
import hide from "../assets/hide-pass.svg";
import userIcon from "../assets/user-icon.svg";


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

    const [showPass, setShowPass] = useState(false);
    const [showRepeatPass, setShowRepeatPass] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegisterData({...registerData, [name]: value});
    };

    const validateRegisterData = () => {
        if (registerData.firstName.match(/^ *$/) !== null) {
            toast.info("Unesite ime")
            setStep(() => 0)
            return;
        }
        if (registerData.lastName.match(/^ *$/) !== null) {
            toast.info("Unesite prezime")
            setStep(() => 0)
            return;
        }
        if (!registerData.username.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            toast.info("Unesite valjanu e-mail adresu")
            setStep(() => 1)
            return;
        }
        if (!/^\+3859(1|2|5|8|9|76|77)\d{6,7}$/.test(registerData.phoneNumber)) {
            toast.info("Neispravan format broja. Koristite predbroj +385.")
            setStep(() => 1)
            return;
        }
        if (/^\d+$/.test(registerData.pin)) {
            if (registerData.pin.length !== 11) {
                toast.info("OIB nije ispravne duljine")
                setStep(() => 2)
                return;
            }
        } else {
            toast.info("OIB mora sadržavati 11 brojki.")
            setStep(() => 2)
            return;
        }
        if (/^\d+$/.test(registerData.phin)) {
            if (registerData.phin.length !== 9) {
                toast.info("MBO nije ispravne duljine")
                setStep(() => 2)
                return;
            }
        } else {
            toast.info("MBO mora sadržavati 9 brojki.")
            setStep(() => 2)
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
            setStep(tmp => 3)
            return;
        }
        if (!captchaValid)
            toast.warn("Potvrdite da niste robot")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateRegisterData();
        await api.post('/patient/register', registerData)
            .then(() => navigate('/login'))
            .catch((err) => {
                if (err.code === "ERR_NETWORK") {
                    toast.error("Greška. Provjerite internet vezu ili kontaktirajte podršku.")
                } else {
                    toast.warn("Podaci nisu valjani. Provjerite svoje osobne podatke.");
                }
            });
    };

    const togglePass = () => {
        setShowPass(prevState => !prevState);
    }

    const toggleRepeatPass = () => {
        setShowRepeatPass(prevState => !prevState);
    }

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordColor, setPasswordColor] = useState('');

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setRegisterData({...registerData, [name]: value});
        if (value.length === 0) {
            setPasswordStrength(0);
            return;
        }
        if (value.length < 8 && value.length > 0) {
            setPasswordColor("h-2 bg-redLight transition-all duration-500");
            setPasswordStrength(1);
            return;
        }
        if (/^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(value) && !/^(?=.*[A-Za-z])(?=.*[0-9]).{10,}$/.test(value)) {
            setPasswordColor("h-2 bg-lightYellow transition-all duration-500");
            setPasswordStrength(2);
            return;
        }
        if (/^(?=.*[A-Za-z])(?=.*[0-9]).{10,}$/.test(value)) {
            setPasswordColor("h-2 bg-green transition-all duration-500");
            setPasswordStrength(3);
            return;
        }
        if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$/.test(value)) {
            setPasswordColor("h-2 bg-green transition-all duration-500");
            setPasswordStrength(3);
            return;
        }
        if (value.length > 0) {
            setPasswordStrength(1);
            setPasswordColor("h-2 bg-redLight transition-all duration-500");
        }
    };

    const [step, setStep] = useState(0);
    const incrementStep = () => {
        if (step < 4) {
            setStep(tmp => tmp + 1);
        }
    }
    const decrementStep = () => {
        if (step > 0) {
            setStep(tmp => tmp - 1);
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <div
                    className="w-full mx-6 sm:w-2/3 sm:mx-14 lg:w-1/3 bg-white [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] rounded-[10px] mt-8 flex flex-col">
                    <div
                        className="w-full h-24 bg-mediumSky opacity-50 rounded-tl-[10px] rounded-tr-[10px] flex justify-center items-end pb-4">
                        <img src={userIcon} alt="User icon" className="w-8 mr-1"/>
                        <span className="text-white font-bold text-3xl ml-1">Registracija</span>
                    </div>
                    <div className={step === 4 ? "h-2 w-full bg-[#80c1e3]" : "hidden"}>
                        <div
                            className={passwordColor}
                            style={{width: `${(passwordStrength / 3) * 100}%`}}></div>
                    </div>
                    <div className="h-2 w-full bg-mediumSky opacity-50">
                        <div className="h-2 bg-darkerSky transition-all duration-500"
                             style={{width: `${(step / 4) * 100}%`}}></div>
                    </div>
                    <form className="flex flex-col gap-0 w-full justify-items-center p-10">
                        {step === 0 && (<section>
                            <div className="">
                                <label
                                    className="font-bold text-mediumSky text-lg mt-[15px] self-start block">Ime:</label>
                                <input type="text" name="firstName" id="firstName" value={registerData.firstName}
                                       onChange={handleChange}
                                       className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2"/>
                            </div>

                            <div className="">
                                <label
                                    className="font-bold text-mediumSky text-lg mt-[15px] self-start block">Prezime:</label>
                                <input type="text" name="lastName" id="lastName" value={registerData.lastName}
                                       onChange={handleChange}
                                       className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2"/>
                            </div>
                        </section>)}
                        {step === 1 && (<section>
                            <div className="">
                                <label
                                    className="font-bold text-mediumSky text-lg mt-[15px] self-start block">E-mail:</label>
                                <input type="email" name="username" id="username" value={registerData.username}
                                       onChange={handleChange}
                                       className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2"/>
                            </div>

                            <div className="">
                                <label className="font-bold text-mediumSky text-lg mt-[15px] self-start block">Broj
                                    telefona:</label>
                                <input type="text" name="phoneNumber" id="phoneNumber" value={registerData.phoneNumber}
                                       onChange={handleChange}
                                       className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2"/>
                            </div>
                        </section>)}

                        {step === 2 && (<section>
                            <div className="">
                                <label
                                    className="font-bold text-mediumSky text-lg mt-[15px] self-start block">OIB:</label>
                                <input type="text" name="pin" id="pin" value={registerData.pin} onChange={handleChange}
                                       className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2"/>
                            </div>

                            <div className="col-span-1">
                                <label
                                    className="font-bold text-mediumSky text-lg mt-[15px] self-start block">MBO:</label>
                                <input type="text" name="phin" id="phin" value={registerData.phin}
                                       onChange={handleChange}
                                       className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2"/>
                            </div>

                        </section>)}
                        {step === 3 && (<section>
                            <div className="">
                                <label className="font-bold text-mediumSky text-lg mt-[15px] self-start block">Datum
                                    rođenja:</label>
                                <input type="date" name="dateOfBirth" id="dateOfBirth" value={registerData.dateOfBirth}
                                       onChange={handleChange}
                                       className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2"/>
                            </div>

                            <div className="">
                                <label htmlFor={'gender'}
                                       className="font-bold text-mediumSky text-lg mt-[15px] self-start block">Spol:</label>
                                <select name="gender" id="gender" value={registerData.gender} onChange={handleChange}
                                        className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2">
                                    <option value={""}>Odaberi spol</option>
                                    <option value={"MALE"}>Muško</option>
                                    <option value={"FEMALE"}>Žensko</option>
                                    <option value={"OTHER"}>Drugo</option>
                                </select>
                            </div>

                        </section>)}
                        {step === 4 && (<section>
                            <div className="">
                                <label
                                    className="font-bold text-mediumSky text-lg mt-[15px] self-start block">Lozinka:</label>
                                <div className="relative">
                                    <input type={showPass ? "text" : "password"} name="password" id="password"
                                           value={registerData.password}
                                           onChange={handlePasswordChange}
                                           className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2"/>
                                    <img src={showPass ? hide : show} onClick={togglePass}
                                         className="w-6 absolute top-[22%] left-[91%] cursor-pointer" alt={'passEye'}/>
                                </div>
                                <span className={'text-mediumGray ml-2'}>
                                    {passwordStrength === 1 && <>slaba</>}
                                    {passwordStrength === 2 && <>dobra</>}
                                    {passwordStrength === 3 && <>jaka</>}
                                </span>
                            </div>
                            <div className="">
                                <label className="font-bold text-mediumSky text-lg mt-[15px] self-start block">Ponovljena
                                    lozinka:</label>
                                <div className="relative">
                                    <input type={showRepeatPass ? "text" : "password"} name="confirmPassword"
                                           id="confirmPassword"
                                           value={registerData.confirmPassword} onChange={handleChange}
                                           className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2"/>
                                    <img src={showRepeatPass ? hide : show} onClick={toggleRepeatPass}
                                         className="w-6 absolute top-[22%] left-[91%] cursor-pointer" alt={'eyePass'}/>
                                </div>

                            </div>
                            <div className={"flex items-center justify-center mt-4 max-[390px]:scale-75"}>
                                <ReCAPTCHA
                                    sitekey={process.env.REACT_APP_RECAPTCHA_KEY.toString()}
                                    onChange={() => setCaptchaValid(true)}
                                />
                            </div>
                        </section>)}


                        <div className="flex justify-between space-x-4">
                            <button
                                disabled={step < 1}
                                type='button'
                                className="hover:bg-darkSky transition-all duration-300 bg-mediumSky text-white font-semibold px-6 py-3 my-10 rounded-[5px]"
                                onClick={decrementStep}>Natrag
                            </button>

                            {step === 0 &&
                                <button
                                    disabled={(/^\s*$/.test(registerData.firstName) || /^\s*$/.test(registerData.lastName))}
                                    type='button'
                                    className={(/^\s*$/.test(registerData.firstName) || /^\s*$/.test(registerData.lastName)) ?
                                        "bg-heavyGray text-white font-semibold px-9 py-3 my-10 rounded-[5px]"
                                        : " hover:bg-darkSky transition-all duration-300 bg-mediumSky text-white font-semibold px-9 py-3 my-10 rounded-[5px]"}
                                    onClick={incrementStep}>Dalje
                                </button>
                            }
                            {step === 1 &&
                                <button
                                    disabled={(/^\s*$/.test(registerData.username) || /^\s*$/.test(registerData.phoneNumber))}
                                    type='button'
                                    className={(/^\s*$/.test(registerData.username) || /^\s*$/.test(registerData.phoneNumber)) ?
                                        "bg-heavyGray text-white font-semibold px-9 py-3 my-10 rounded-[5px]"
                                        : "hover:bg-darkSky transition-all duration-300 bg-mediumSky text-white font-semibold px-9 py-3 my-10 rounded-[5px]"}
                                    onClick={incrementStep}>Dalje
                                </button>
                            }
                            {step === 2 &&
                                <button
                                    disabled={(/^\s*$/.test(registerData.pin) || /^\s*$/.test(registerData.phin))}
                                    type='button'
                                    className={(/^\s*$/.test(registerData.pin) || /^\s*$/.test(registerData.phin)) ?
                                        "bg-heavyGray text-white font-semibold px-9 py-3 my-10 rounded-[5px]"
                                        : "hover:bg-darkSky transition-all duration-300 bg-mediumSky text-white font-semibold px-9 py-3 my-10 rounded-[5px]"}
                                    onClick={incrementStep}>Dalje
                                </button>
                            }
                            {step === 3 &&
                                <button
                                    disabled={(/^\s*$/.test(registerData.dateOfBirth))}
                                    type='button'
                                    className={(/^\s*$/.test(registerData.dateOfBirth)) ?
                                        "bg-heavyGray text-white font-semibold px-9 py-3 my-10 rounded-[5px]"
                                        : "hover:bg-darkSky transition-all duration-300 bg-mediumSky text-white font-semibold px-9 py-3 my-10 rounded-[5px]"}
                                    onClick={incrementStep}>Dalje
                                </button>
                            }
                            {step > 3 && (
                                <button
                                    disabled={!captchaValid}
                                    className={captchaValid ?
                                        "hover:bg-darkSky transition-all duration-300 bg-mediumSky text-white font-semibold px-6 py-3 my-10 rounded-[5px]"
                                        :
                                        "bg-heavyGray text-white font-semibold px-6 py-3 my-10 rounded-[5px]"
                                    }
                                    onClick={handleSubmit}
                                >
                                    Registriraj se
                                </button>
                            )}
                        </div>
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
        </>
    );
}


export default RegisterForm;
