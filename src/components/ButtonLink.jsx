import React from "react";
import { useNavigate } from 'react-router-dom';

function ButtonLink() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/login');
    };

    return(
        <div className="flex justify-start pl-11">
            <button className="bg-sky-600 p-5 text-white font-bold rounded-[5px] mt-12 mb-10" onClick={handleClick} role='link'> PRIJAVI SE </button>
        </div>
    );
}

export default ButtonLink;