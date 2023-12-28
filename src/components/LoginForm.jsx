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
            <div className="flex justify-center">
                <div
                    className="w-[420px] h-[430px] bg-white [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] rounded-[10px] mt-8 flex flex-col">
                    <div
                        className="w-full h-24 bg-sky-600 opacity-50 rounded-tl-[10px] rounded-tr-[10px] flex justify-center items-end pb-4">
                        <img src={userIcon} alt="User icon" className="w-[32px] h-[32px] mr-1"/>
                        <span className="text-white font-bold text-3xl ml-1">Prijava</span>
                    </div>
                    <form className="flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col items-center">
                        <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-[60px]">E-mail:</label>
                        <input type="text" name="email" id="email"
                               className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2" value={email}
                               onChange={e => setEmail(e.target.value)}/>

                        <label
                            className="font-bold text-sky-600 text-lg mt-[15px] self-start ml-[60px]">Lozinka:</label>
                        <div className="relative">
                            <input type={showPass ? "text" : "password"} name="pass" id="pass"
                                   className="w-[300px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"
                                   value={password} onChange={e => setPassword(e.target.value)}/>
                            <img src={showPass ? hide : show} onClick={togglePass} className="w-6 absolute top-[22%] left-[89%] cursor-pointer" alt={'passEye'}/>
                        </div>

                        <Link to="/passwordReset" className="self-start ml-[60px]"><span className="text-sky-600">Zaboravljena lozinka?</span></Link>

                        <button className="bg-sky-600 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] mt-[45px]"
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
