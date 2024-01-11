import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PictureText from "../assets/building-with-lake.webp";
import EmailIcon from "../assets/email-icon.svg";
import LocationIcon from "../assets/location-icon.svg";
import WorkingHoursIcon from "../assets/working-hours-icon.svg";

function Contact() {

    return (
        <PageLayout>
            <Header />
            <span className="text-darkerSky dark:bg-heavyGray dark:text-lightGray font-bold text-3xl text-center pt-1 2xl:pt-2">Kontakt</span>
            <div className="flex justify-center items-center dark:bg-heavyGray">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-10">
                    <div className="sm:my-8 sm:mr-10 flex justify-center items-center">
                        <img src={PictureText} alt="Building" className="w-full rounded-[5px] object-cover"/>
                    </div>
                    <div className="flex flex-col text-mediumSky dark:text-lightGray justify-center sm:ml-10 text-base lg:text-lg">
                        <div className="mb-4 mt-5 inline-block">
                            <img src={EmailIcon} alt="email_icon" className="h-8 inline-block align-middle mx-5"></img>
                            <p className="inline-block align-middle font-semibold">rehub.noreply@gmail.com</p>
                        </div>
                        <div className="mb-4 mt-5 inline-block">
                            <img src={LocationIcon} alt="location_icon" className="h-8 inline-block align-middle mx-5"></img>
                            <p className="inline-block text-ellipsis align-middle font-semibold">Ulica Ive Ivića
                                28b, <br/>
                                10000 Zagreb</p>
                        </div>
                        <div className="mb-4 mt-5 inline-block">
                            <img src={WorkingHoursIcon} alt="working_hours_icon" className="h-8 inline-block align-middle mx-5"></img>
                            <p className="inline-block align-middle font-semibold">Pon - Pet <br/>
                                08:00 - 20:00 h</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </PageLayout>
    );
}

export default Contact;
