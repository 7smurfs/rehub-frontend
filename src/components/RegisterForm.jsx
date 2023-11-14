import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import api from "../http/api";


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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegisterData({...registerData, [name]: value});

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/patient/register', registerData);
            console.log("User registered successfully: ", response.data);
            navigate('/login');

        } catch (err) {
            console.error("Error registering user: ", err)
        }

    };


    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <span className="text-sky-700 font-bold text-3xl justify-self-center self-center my-10">Registracija</span>
            <div className="grid grid-cols-2 grid-rows-5 gap-0 w-screen justify-items-center pl-64 pr-64">
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
                    <input type="text" name="username" id="username" value={registerData.username}
                           onChange={handleChange}
                           className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                </div>

                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Broj telefona:</label>
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
                    <input type="password" name="password" id="password" value={registerData.password}
                           onChange={handleChange}
                           className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                </div>

                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Ponovljena
                        lozinka:</label>
                    <input type="password" name="confirmPassword" id="confirmPassword"
                           value={registerData.confirmPassword} onChange={handleChange}
                           className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                </div>

                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Datum rođenja:</label>
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

            </div>
            <button className="bg-sky-600 text-white font-semibold px-8 py-4 my-10 rounded-[5px]"
                    onClick={handleSubmit}>Registriraj se
            </button>

        </div>

    );
}


export default RegisterForm;