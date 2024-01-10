import React, {useContext, useState} from "react";
import {AuthContext} from "../auth/AuthProvider";
import userIcon from "../assets/user-icon.svg";
import {toast, ToastContainer} from "react-toastify";
import show from "../assets/show-pass.svg";
import hide from "../assets/hide-pass.svg";
import {Link} from "react-router-dom";

function LoginForm() {

    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            console.log(err);
            if (err.code === "ERR_NETWORK") {
                toast.error("Greška. Provjerite internet vezu ili kontaktirajte podršku.")
            } else {
                toast.warn("Podaci nisu valjani.");
            }
        }
    }

    const togglePass = () => {
        setShowPass(prevState => !prevState);
    }

    return (
        <>
            <div className="flex justify-center mb-10">
                <div
                    className="w-full mx-6 sm:w-2/3 sm:mx-14 lg:w-1/3 bg-white [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] rounded-[10px] mt-8 flex flex-col">
                    <div
                        className="w-full h-24 bg-mediumSky opacity-50 rounded-tl-[10px] rounded-tr-[10px] flex justify-center items-end pb-4">
                        <img src={userIcon} alt="User icon" className="w-[32px] h-[32px] mr-1"/>
                        <span className="text-white font-bold text-3xl ml-1">Prijava</span>
                    </div>
                    <form className="flex flex-col gap-0 w-full justify-items-center p-10">
                        <label className="font-bold text-mediumSky text-lg mt-[30px] self-start ml-2">E-mail:</label>
                        <input type="text" name="email" id="email"
                               className="w-full h-[40px] bg-lightSky opacity-50 rounded-[5px] p-2" value={email}
                               onChange={e => setEmail(e.target.value)}/>

                        <label
                            className="font-bold text-mediumSky text-lg mt-[15px] self-start ml-2">Lozinka:</label>
                        <div className="relative">
                            <input type={showPass ? "text" : "password"} name="pass" id="pass"
                                   className="w-full h-[40px] bg-lightSky opacity-50 mb-[2px] rounded-[5px] p-2"
                                   value={password} onChange={e => setPassword(e.target.value)}/>
                            <img src={showPass ? hide : show} onClick={togglePass}
                                 className="w-6 absolute top-[22%] left-[89%] cursor-pointer" alt={'passEye'}/>
                        </div>
                        <Link to="/passwordReset" className="self-start ml-2 pt-2"><span className="text-mediumSky">Zaboravljena lozinka?</span></Link>
                        <button className="hover:bg-darkSky transition-all duration-300 sm:w-1/2 mx-auto bg-mediumSky text-white font-semibold px-5 py-3 my-10 rounded-[5px]"
                                onClick={handleSubmit}>Prijava
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
        </>
    );
}

export default LoginForm;
