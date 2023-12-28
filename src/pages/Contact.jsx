import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PictureText from "../assets/building-with-lake.webp";
import EmailIcon from "../assets/email-icon.svg";
import LocationIcon from "../assets/location-icon.svg";
import WorkingHoursIcon from "../assets/working-hours-icon.svg";
function Contact() {

    const imageStyle = {
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: 50,
        width: '40px'
    };

    return (
        <PageLayout>
            <Header />
            <span
                className="text-sky-700 font-bold text-3xl justify-self-center self-center my-2">Kontakt</span>
            <div className="flex justify-center items-center h-screen">
                <div className="grid grid-cols-2 gap-2" style={{paddingLeft: "50px"}}>
                    <div className="col-span-1 my-8" style={{marginRight: "40px"}}>
                        <img
                            src={PictureText}
                            alt="Big Picture"
                            className="w-full h-auto"
                        />
                    </div>

                    <div className="col-span-1" style={{ display: 'flex' ,flexDirection: 'column',justifyContent: 'center'}}>
                        <div className="mb-4 text-sky-500 text-lg mt-[15px] " style={{ display: 'inline-block', verticalAlign: 'top'}}>
                            <img src={EmailIcon} alt="email_icon" style={imageStyle}></img>
                            <p style={{ display: 'inline-block', verticalAlign: 'middle' }}>info@rehub.hr</p>
                        </div>

                        <div className="mb-4 text-sky-500 text-lg mt-[15px] " style={{ display: 'inline-block', verticalAlign: 'top'}}>
                            <img src={LocationIcon} alt="location_icon" style={imageStyle}></img>
                            <p style={{ display: 'inline-block', verticalAlign: 'middle' }}>Ulica Marka Makovljevića 28b, <br />
                                10000 Zagreb</p>
                        </div>
                        <div className="mb-4 text-sky-500 text-lg mt-[15px] " style={{ display: 'inline-block', verticalAlign: 'top'}}>
                            <img src={WorkingHoursIcon} alt="working_hours_icon" style={imageStyle}></img>
                            <p style={{ display: 'inline-block', verticalAlign: 'middle' }}>Pon - pet <br />
                                08 - 20 h</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </PageLayout>
    );
}

export default Contact;
