import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../http/api";
import {toast} from "react-toastify";

function PassResetMain() {

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

    return(
        <>
            <div className="flex justify-center">
                <div
                    className="w-[420px] h-[430px] bg-white [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] rounded-[10px] mt-8 flex flex-col">
                    <div className="w-full h-40 bg-sky-600 opacity-50 rounded-tl-[10px] rounded-tr-[10px] flex justify-center items-center">
                        <span className="text-white font-bold text-lg ml-1 w-2/3 text-center">Upišite e-mail adresu korisničkog računa za koji želite promijeniti lozinku</span>
                    </div>
                    <form className="flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col items-center">
                        <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-[60px]">E-mail:</label>

                        <input type="text" name="username" id="username" value={data.username} onChange={handleChange} className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>

                        <button className="bg-sky-600 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] mt-[45px]" onClick={handleSubmit}>Nastavi
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default PassResetMain;