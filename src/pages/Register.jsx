import React from 'react';
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Register() {
    return(
        <PageLayout>
            <Header />
            <div className="flex h-screen w-screen">
                <div className="grid grid-cols-2 grid-rows-6 gap-0 w-screen justify-items-center pl-64 pr-64">
                    <span className="text-sky-700 font-bold text-3xl col-span-2 justify-self-center self-center">Registracija</span>
                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Ime:</label>
                        <input type="text" name="name" id="name" className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Prezime:</label>
                        <input type="text" name="surname" id="surname" className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">E-mail:</label>
                        <input type="text" name="email" id="email" className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Broj telefona:</label>
                        <input type="text" name="phone_number" id="phone_number" className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2"/>
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">OIB:</label>
                        <input type="text" name="oib" id="oib" className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">MBO:</label>
                        <input type="text" name="mbo" id="mbo" className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Lozinka:</label>
                        <input type="password" name="pass" id="pass" className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                    </div>

                    <div className="col-span-1">
                        <label className="font-bold text-sky-600 text-lg mt-[15px] self-start block">Ponovljena lozinka:</label>
                        <input type="password" name="pass_repeat" id="pass_repeat" className="w-[400px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px] p-2" />
                    </div>

                    <button className="bg-sky-600 text-white font-semibold pl-9 pr-9 pt-1 pb-1 w-1/6 h-2/4 justify-self-center self-center rounded-[5px] col-span-2">Registriraj se</button>
                </div>



            </div>
            <Footer />
        </PageLayout>
    );
}

export default Register;