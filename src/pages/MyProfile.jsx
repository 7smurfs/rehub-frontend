import React, {useEffect, useState} from "react";
import PopupJS from "reactjs-popup";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../http/api";

import 'reactjs-popup/dist/index.css';
import hide from "../assets/hide-pass.svg";
import show from "../assets/show-pass.svg";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

function MyProfile() {

    const [profileData, setProfileData] = useState({
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        roles: ''
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                await api.get('/stats/user', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then( (res) => setProfileData(res.data));
               } catch (error) {}
        };

        fetchData();

    }, []);

    const sendPasswordReset = async () => {
        try {
            await api.post('/auth/reset', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
        } catch (error) {}
    };

    const invalidatePatient = async () => {
        try {
            await api.delete('/patient/' + profileData.id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
        } catch (error) {}
    };

    const tableRowStyle = {
        textAlign: 'center',
        fontSize: 25,
        padding: '10px',
        paddingRight: '20px'
    };


    const buttonStyle = {
        backgroundColor: '#57b0ec',
        color: '#fff',
        padding: '8px 12px',
        border: 'none',
        cursor: 'pointer',
        fontSize: 15,
        fontWeight: '600',
        borderRadius: '8px'
    };

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
        e.target.focus();
        console.log("Name: " + name + " , value: " + value);
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

    const [open, setOpen] = useState(false);
    const [openInvalidate, setOpenInvalidate] = useState(false);
    const contentStyle = { borderRadius:'10px', width: '40%'};

    return(
        <PageLayout>
            <Header />
            <span className="text-sky-700 font-bold text-3xl justify-self-center self-center ">Moj profil</span>

            <PopupJS open={openInvalidate} closeOnDocumentClick={false} onClose={() => setOpenInvalidate(false)} modal {...{contentStyle}}>
                <div className="flex justify-center my-10">
                    <div className="flex-1 items-center rounded-bl-[10px] rounded-br-[10px] flex flex-col">
                        <label className="font-bold text-sky-600 text-2xl mt-[30px] text-center">Želite li deaktivirati račun?</label>

                        <div className="flex justify-between mt-[45px]">
                            <button className="bg-red-400 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] mr-7" onClick={() => { setOpenInvalidate(false); }}>Ne</button>

                            <button className="bg-green-300 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] ml-7" onClick={() => { invalidatePatient().then(r => setOpenInvalidate(false)); }}>Da</button>
                        </div>
                    </div>
                </div>
            </PopupJS>

            <PopupJS open={open} closeOnDocumentClick={false} onClose={() => setOpen(false)} modal {...{contentStyle}}>
                <div className="flex justify-center relative">
                    <form className="flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col items-center">
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
                        <button className="bg-sky-600 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] mt-[45px] mb-8"
                                onClick={handleSubmit}>Nastavi
                        </button>

                    </form>
                    <button className="bg-sky-600 text-white p-1 rounded-[5px] absolute top-0 right-0 w-[32px] font-bold font-extrabold"
                            onClick={() => setOpen(false)}>X
                    </button>
                </div>
            </PopupJS>
            <div>
                {profileData ? (
                <table className="flex justify-center items-center " >

                    <tbody>
                    {!profileData.roles.includes("SUPERADMIN")  && (
                        <>
                            <tr>
                                <td style={tableRowStyle} className={'font-bold text-sky-600 text-lg '}>Ime:</td>
                                <td style={tableRowStyle} className={'text-sky-700  text-lg'} >{profileData.firstName}</td>
                            </tr>
                            <tr>
                                <td style={tableRowStyle} className={'font-bold text-sky-600 text-lg'}>Prezime:</td>
                                <td style={tableRowStyle} className={'text-sky-700  text-lg'}>{profileData.lastName}</td>
                            </tr>
                        </>
                    )}
                        <tr>
                            <td style={tableRowStyle} className={'font-bold text-sky-600 text-lg'}>Email:</td>
                            <td style={tableRowStyle} className={'text-sky-700  text-lg'}>{profileData.username}</td>
                        </tr>
                        <tr>
                            <td style={tableRowStyle} className={'font-bold text-sky-600 text-lg'}>Uloga:</td>
                            <td style={tableRowStyle} className={'text-sky-700 text-lg'}>
                                {(() => {
                                    switch (profileData.roles.toString()) {
                                        case "PATIENT":
                                            return 'PACIJENT';
                                        case 'EMPLOYEE':
                                            return 'DJELATNIK';
                                        case 'EMPLOYEE,ADMIN' || 'ADMIN,EMPLOYEE':
                                            return 'ADMINISTRATOR';
                                        case 'SUPERADMIN':
                                            return 'SUPER ADMINISTRATOR';
                                        default:
                                            return profileData.roles;
                                    }
                                })()}
                             </td>
                            </tr>
                        <tr>
                            {profileData.roles.includes("PATIENT")  && (
                                <>
                                    <td style={tableRowStyle} className={' text-sky-600 text-lg'}>
                                            <button style={buttonStyle} onClick={() => {setOpenInvalidate(true);}}>
                                                Deaktiviraj račun
                                            </button>
                                    </td>
                                </>
                            )}
                            <td style={tableRowStyle} className={'text-sky-600 text-lg'}>
                                <button style={buttonStyle} onClick={() => {setOpen(true);}}>
                                    Promijeni lozinku
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                ): (
                    <p>Učitavanje...</p>
                )};
            </div>
            <Footer />
        </PageLayout>
    )
}

export default MyProfile;
