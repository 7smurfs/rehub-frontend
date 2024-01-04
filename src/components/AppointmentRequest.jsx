import React from "react";
import Arrow from "../assets/right-arrow.svg";
import {Link} from "react-router-dom";

function AppointmentRequest() {
    return(
      <div className={'bg-sky-200 w-full flex justify-between py-3 pl-3'}>
          <div className={'h-full flex items-center'}>
              <span className={'text-sky-800 font-bold'}>Luka Lukić</span>
          </div>
          <div className={'w-20 flex items-center justify-center'}>
              <Link to={'/appointment'}>
                  <img src={Arrow} alt="Arrow" className={'h-10'}/>
              </Link>
          </div>
      </div>
    );
}

export default AppointmentRequest;