import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    }
});

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
        dateOfBirth: '2002-11-25'
        // TODO: add date of birth input, remove hardcoded value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        {/*console.log("INPUT:", name, value);
        Just for testing purposes*/}

        setRegisterData({ ...registerData, [name]: value });

        {/*console.log(registerData);*/}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(registerData);
            const response = await axiosInstance.post('/patient', registerData);

            console.log("User registered successfully: ", response.data);

            navigate('/login');

        } catch (err) {
            console.error("Error registering user: ", err);
        }

    };


    return(
        <div className="flex h-screen w-screen">
            <div className="grid grid-cols-2 grid-rows-6 gap-0 w-screen justify-items-center pl-64 pr-64">
                <span className="text-sky-700 font-bold text-3xl col-span-2 justify-self-center self-center">Registracija</span>
                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Ime:</label>
                    <input type="text" name="firstName" id="firstName" value={registerData.firstName} onChange={handleChange} className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                </div>

                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Prezime:</label>
                    <input type="text" name="lastName" id="lastName" value={registerData.lastName} onChange={handleChange} className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                </div>

                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">E-mail:</label>
                    <input type="text" name="username" id="username" value={registerData.username} onChange={handleChange} className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                </div>

                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Broj telefona:</label>
                    <input type="text" name="phoneNumber" id="phoneNumber" value={registerData.phoneNumber} onChange={handleChange} className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                </div>

                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">OIB:</label>
                    <input type="text" name="pin" id="pin" value={registerData.pin} onChange={handleChange} className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                </div>

                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">MBO:</label>
                    <input type="text" name="phin" id="phin" value={registerData.phin} onChange={handleChange} className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                </div>

                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Lozinka:</label>
                    <input type="password" name="password" id="password" value={registerData.password} onChange={handleChange} className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                </div>

                <div className="col-span-1">
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Ponovljena lozinka:</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={registerData.confirmPassword} onChange={handleChange} className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                </div>

                {/*<div className="col-span-1">*/}
                {/*    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Datum rođenja:</label>*/}
                {/*    <input type="text" name="name" id="name" value={registerData.dateOfBirth} onChange={handleChange} className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />*/}
                {/*</div>*/}

                <button className="bg-sky-600 text-white font-semibold pl-9 pr-9 pt-1 pb-1 w-2/4 h-2/4 justify-self-center self-center rounded-[5px] col-span-1" onClick={handleSubmit}>Registriraj se</button>
            </div>
        </div>

    );
}


export default RegisterForm;