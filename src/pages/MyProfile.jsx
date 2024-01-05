import React, {useEffect, useState} from "react";
import Popup from "react-popup";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../http/api";

import 'react-popup/style.css';
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
    const openInvalidatePopup = () => {
        Popup.close();
        Popup.create({
            title: 'Provjera',
            content: 'Želite li invalidirati Vaš račun?',
            className: 'invalidate-popup',
            buttons: {
                left: [
                    {
                        text: 'Odustani',
                        className: 'danger',
                        action: function () {
                            Popup.close();
                        },
                    },
                ],
                right: [
                    {
                        text: 'Invalidiraj',
                        className: 'success',
                        action: function () {
                            // Perform the action you want when the user confirms
                            invalidatePatient();
                            Popup.close();
                        },
                    },
                ],
            },
        });
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
    const openPasswordResetPopup = () => {
        console.log("click");
        Popup.close();
        Popup.create({
            title: 'Promjena zaporke',
            content: (<div className="flex justify-center">

                    <form className="flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col items-center">
                        <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-[60px]">Nova lozinka:</label>
                        <div className="relative">
                            <input type={showPass ? "text" : "password"} name="newPass" id="newPass" value={data.newPass}
                                   onChange={handleChange}
                                   className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>
                         </div>

                        <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-[60px]">Potvrdite novu
                            lozinku:</label>
                        <div className="relative">
                            <input type={showConfirmPass ? "text" : "password"} name="confirmPass" id="confirmPass"
                                   value={data.confirmPass}
                                   onChange={handleChange}
                                   className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px] p-2"/>

                            <img src={showConfirmPass ? hide : show} onClick={toggleConfirmPass}
                                 className="w-6 absolute top-[22%] left-[89%] cursor-pointer" alt={'passEye'}/>
                        </div>

                    </form>
            </div>),
            className: 'password-reset-popup',
            buttons: {
                left: [
                    {
                        text: 'Odustani',
                        className: 'danger',
                        action: function () {
                            Popup.close();
                        },
                    },
                ],
                right: [
                    {
                        text: 'Promijeni',
                        className: 'success',
                        action: function () {
                            handleSubmit();
                            Popup.close();
                        },
                    },
                ],
            },
        });
        console.log("clack");
    };
    return(
        <PageLayout>
            <Header />

            <span className="text-sky-700 font-bold text-3xl justify-self-center self-center ">Moj profil</span>

            <Popup />
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
                            <td style={tableRowStyle} className={'text-sky-700  text-lg'}>{profileData.roles}</td>
                        </tr>
                        <tr>
                            {profileData.roles.includes("PATIENT")  && (
                                <>
                                    <td style={tableRowStyle} className={' text-sky-600 text-lg'}>
                                            <button style={buttonStyle} onClick={openInvalidatePopup}>
                                                Invalidiraj profil
                                            </button>
                                    </td>
                                </>
                            )}
                            <td style={tableRowStyle} className={'text-sky-600 text-lg'}>
                                <button style={buttonStyle} onClick={openPasswordResetPopup}>
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