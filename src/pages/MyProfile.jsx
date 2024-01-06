import React, {useEffect, useState} from "react";
import PopupJS from "reactjs-popup";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../http/api";

import 'reactjs-popup/dist/index.css';
import hide from "../assets/hide-pass.svg";
import show from "../assets/show-pass.svg";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {

    const [profileData, setProfileData] = useState({
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        roles: []
    });


    useEffect(() => {
        const fetchData = async () => {
            await api.get('/stats/user', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => setProfileData(res.data));
        };
        fetchData().catch((error) => {
            toast("Dogodila se greška.");
        });

    }, []);

    const invalidatePatient = async () => {
        await api.delete('/patient/' + profileData.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).catch(() => toast.error("Dogodila se greška."));
    };

    const [showOldPass, setShowOldPass] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [data, setData] = useState({
        newPass: '',
        confirmPass: '',
        oldPass: ''
    });
    const toggleOldPass = () => {
        setShowOldPass(prevState => !prevState);
    }
    const togglePass = () => {
        setShowPass(prevState => !prevState);
    }
    const toggleConfirmPass = () => {
        setShowConfirmPass(prevState => !prevState);
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const validateChangingPasswordData = () => {
        if (!/^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(data.newPass)) {
            toast.warn("Lozinka se mora sastoji od minimalno 8 brojeva i slova.")
            return;
        }
        if (data.newPass !== data.confirmPass) {
            toast.warn("Lozinke se ne podudaraju")
            return;
        }
        if (!data.oldPass.length || !data.newPass.length || !data.confirmPass.length) {
            toast.info("Popunite sva polja.")
            return;
        }
        if (data.oldPass === data.newPass) {
            toast.warn("Nova lozinka ne smije biti ista kao stara.")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateChangingPasswordData();
        await api.post("/auth/change/password", data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => {
            setOpen(false);
            toast.success("Uspjesno promjenjena lozinka")
        }).catch(() => toast.error("Dogodila se greška."));
    }

    const [open, setOpen] = useState(false);
    const [openInvalidate, setOpenInvalidate] = useState(false);
    const contentStyle = {borderRadius: '10px', width: '40%'};


    return (
        <PageLayout>
            <Header/>
            <span
                className="text-sky-700 font-bold text-3xl justify-self-center self-center mt-5 mb-5 ">Moj profil</span>

            <PopupJS open={openInvalidate} closeOnDocumentClick={false} onClose={() => setOpenInvalidate(false)}
                     modal {...{contentStyle}}>
                <div className="flex justify-center my-10">
                    <div className="flex-1 items-center rounded-bl-[10px] rounded-br-[10px] flex flex-col">
                        <label className="font-bold text-sky-600 text-2xl mt-[30px] text-center">Želite li deaktivirati
                            račun?</label>

                        <div className="w-full flex justify-around mt-[45px]">
                            <button className="bg-red-600 text-white px-9 py-2 font-semibold rounded-[5px]"
                                    onClick={() => {
                                        setOpenInvalidate(false);
                                    }}>Ne
                            </button>
                            <button className="bg-green-800 text-white px-9 py-2 font-semibold rounded-[5px]"
                                    onClick={() => {
                                        invalidatePatient().then(r => setOpenInvalidate(false));
                                    }}>Da
                            </button>
                        </div>
                    </div>
                </div>
            </PopupJS>

            <PopupJS open={open} closeOnDocumentClick={false} onClose={() => setOpen(false)} modal {...{contentStyle}}>
                <div className="flex justify-center relative">
                    <form className="flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col items-center">
                        <label className="font-bold text-sky-600 text-lg mt-[30px]">Stara lozinka:</label>
                        <div className="relative">
                            <input type={showOldPass ? "text" : "password"} name="oldPass" id="oldPass"
                                   value={data.oldPass}
                                   onChange={handleChange}
                                   className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>
                            <img src={showOldPass ? hide : show} onClick={toggleOldPass}
                                 className="w-6 absolute top-[22%] left-[89%] cursor-pointer" alt={'passEye'}/>

                        </div>

                        <label className="font-bold text-sky-600 text-lg mt-[30px]">Nova lozinka:</label>
                        <div className="relative">
                            <input type={showPass ? "text" : "password"} name="newPass" id="newPass"
                                   value={data.newPass}
                                   onChange={handleChange}
                                   className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>
                            <img src={showPass ? hide : show} onClick={togglePass}
                                 className="w-6 absolute top-[22%] left-[89%] cursor-pointer" alt={'passEye'}/>

                        </div>

                        <label className="font-bold text-sky-600 text-lg mt-[30px]">Potvrdite novu
                            lozinku:</label>
                        <div className="relative">
                            <input type={showConfirmPass ? "text" : "password"} name="confirmPass" id="confirmPass"
                                   value={data.confirmPass}
                                   onChange={handleChange}
                                   className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>

                            <img src={showConfirmPass ? hide : show} onClick={toggleConfirmPass}
                                 className="w-6 absolute top-[22%] left-[89%] cursor-pointer" alt={'passEye'}/>
                        </div>
                        <button className="bg-sky-600 text-white px-6 py-2 font-semibold rounded-[5px] mt-[45px] mb-8"
                                onClick={handleSubmit}>Nastavi
                        </button>

                    </form>
                    <button
                        className="bg-sky-600 text-white p-1 rounded-[5px] absolute top-0 right-0 w-[32px] font-bold font-extrabold"
                        onClick={() => setOpen(false)}>X
                    </button>
                </div>
            </PopupJS>
            <div>
                {profileData ? (
                    <table className="flex justify-center items-center">

                        <tbody className={'bg-sky-200 p-8 rounded-[10px]'}>
                        {!profileData.roles.includes("SUPERADMIN") && (
                            <>
                                <tr>
                                    <td className={'font-bold text-sky-600 text-end text-2xl  pr-10'}>Ime:</td>
                                    <td className={'text-sky-700  text-start text-2xl p-5 pl-10'}>{profileData.firstName}</td>
                                </tr>
                                <tr>
                                    <td className={'font-bold text-sky-600 text-end text-2xl  p-5 pr-10'}>Prezime:</td>
                                    <td className={'text-sky-700  text-start text-2xl p-5 pl-10'}>{profileData.lastName}</td>
                                </tr>
                            </>
                        )}
                        <tr>
                            <td className={'font-bold text-sky-600 text-end text-2xl p-5 pr-10'}>Email:</td>
                            <td className={'text-sky-700 text-start text-2xl p-5 pl-10'}>{profileData.username}</td>
                        </tr>
                        <tr>
                            <td className={'font-bold text-sky-600 text-end text-2xl p-5 pr-10'}>Uloga:</td>
                            <td className={'text-sky-700 text-start text-2xl p-5 pl-10'}>
                                {profileData.roles.includes('ADMIN') ? 'ADMINISTRATOR' :
                                    (profileData.roles.includes('PATIENT') ? 'PACIJENT' :
                                        (profileData.roles.includes('SUPERADMIN') ? 'SUPER ADMINISTRATOR' :
                                            (profileData.roles.includes('EMPLOYEE') && profileData.roles.length === 1 ? 'ZAPOSLENIK' :
                                                'Nije poznata uloga.')))}
                            </td>
                        </tr>
                        <tr>
                            {profileData.roles.includes("PATIENT") && (
                                <>
                                    <td className={' text-sky-600 text-center text-2xl p-5 pr-5'}>
                                        <button
                                            className={'bg-sky-600 text-white p-2 px-4 border-none cursor-pointer text-base font-semibold rounded-md'}
                                            onClick={() => {
                                                setOpenInvalidate(true);
                                            }}>
                                            Deaktiviraj račun
                                        </button>
                                    </td>
                                </>
                            )}
                            <td className={'text-sky-600 text-center text-2xl p-5 pl-5'}>
                                <button
                                    className={'bg-sky-600 text-white p-2 px-4 border-none cursor-pointer text-base font-semibold rounded-md'}
                                    onClick={() => {
                                        setOpen(true);
                                    }}>
                                    Promijeni lozinku
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Učitavanje...</p>
                )};
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
            <Footer/>
        </PageLayout>
    );
}

export default MyProfile;
