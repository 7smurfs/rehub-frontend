import React from "react";
import PictureText from "../assets/building-with-lake.webp";
import EmailIcon from "../assets/email-icon.svg";
import LocationIcon from "../assets/location-icon.svg";
import WorkingHoursIcon from "../assets/working-hours-icon.svg";

function ContactMain() {

    return(
        <>
            <span className="text-sky-700 font-bold text-3xl justify-self-center self-center my-2">Kontakt</span>
            <div className="flex justify-center items-center h-screen">
                <div className="grid grid-cols-2 gap-2 pl-[50px]">
                    <div className="col-span-1 my-8 mr-[40px]">
                        <img src={PictureText} alt="Building" className="w-[500px] rounded-[5px] h-auto"/>
                    </div>

                    <div className="col-span-1 flex flex-col justify-center">
                        <div className="mb-4 text-sky-500 text-lg mt-[15px] inline-block">
                            <img src={EmailIcon} alt="email_icon" className="inline-block align-middle mr-[50px] w-[40px]"></img>
                            <p className="inline-block align-middle font-semibold">rehub.noreply@gmail.com</p>
                        </div>

                        <div className="mb-4 text-sky-500 text-lg mt-[15px] inline-block">
                            <img src={LocationIcon} alt="location_icon" className="inline-block align-middle mr-[50px] w-[40px]"></img>
                            <p className="inline-block align-middle font-semibold">Ulica Marka Markovića
                                28b, <br/>
                                10000 Zagreb</p>
                        </div>
                        <div className="mb-4 text-sky-500 text-lg mt-[15px] inline-block">
                            <img src={WorkingHoursIcon} alt="working_hours_icon" className="inline-block align-middle mr-[50px] w-[40px]"></img>
                            <p className="inline-block align-middle font-semibold">Pon - pet <br/>
                                08 - 20 h</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactMain;