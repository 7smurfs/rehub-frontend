import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../http/api";

function SetNewPasswordMain() {

    const navigate = useNavigate();
    const { tkn } = useParams();

    const [data, setData] = useState({
        newPass : '',
        confirmPass : '',
        token : tkn
    });

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
                        <div>
                            <input type="password" name="newPass" id="newPass" value={data.newPass} onChange={handleChange} className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>

                        </div>

                        <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-[60px]">Potvrdite novu lozinku:</label>
                        <div>
                            <input type="password" name="confirmPass" id="confirmPass" value={data.confirmPass}
                                   onChange={handleChange}
                                   className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>
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