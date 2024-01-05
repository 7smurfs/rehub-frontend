import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../http/api";
import show from "../assets/show-pass.svg";
import hide from "../assets/hide-pass.svg";

function SetNewPasswordMain() {

    const navigate = useNavigate();
    const { tkn } = useParams();

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [data, setData] = useState({
        newPass : '',
        confirmPass : '',
        token : tkn
    });

    const togglePass = () => {
        setShowPass(prevState => !prevState);
    }

    const toggleConfirmPass = () => {
        setShowConfirmPass(prevState => !prevState);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({...data, [name] : value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/reset/password", data);
            navigate("/login");

        } catch (err) {
            toast("An error occured.");
        }

    }

    return(
        <>
            <div className="flex justify-center">
                <div
                    className="w-[420px] h-[430px] bg-white [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] rounded-[10px] mt-8 flex flex-col">
                    <div className="w-full h-24 bg-sky-600 opacity-50 rounded-tl-[10px] rounded-tr-[10px] flex justify-center items-center">
                        <span className="text-white font-bold text-lg ml-1 w-5/6 text-center">Upišite novu lozinku i potvrdite ju</span>
                    </div>
                    <form className="flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col items-center">
                        <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-[60px]">Nova lozinka:</label>
                        <div className="relative">
                            <input type="password" name="newPass" id="newPass" value={data.newPass}
                                   onChange={handleChange}
                                   className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>

                            <img src={showPass ? hide : show} onClick={togglePass}
                                 className="w-6 absolute top-[22%] left-[89%] cursor-pointer" alt={'passEye'}/>
                        </div>

                        <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-[60px]">Potvrdite novu
                            lozinku:</label>
                        <div className="relative">
                            <input type="password" name="confirmPass" id="confirmPass"
                                   value={data.confirmPass}
                                   onChange={handleChange}
                                   className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>

                            <img src={showConfirmPass ? hide : show} onClick={toggleConfirmPass}
                                 className="w-6 absolute top-[22%] left-[89%] cursor-pointer" alt={'passEye'}/>
                        </div>

                        <button className="bg-sky-600 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] mt-[45px]"
                                onClick={handleSubmit}>Nastavi
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default SetNewPasswordMain;