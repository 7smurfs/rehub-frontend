import React, { useState } from 'react';
import arrowDown from "../assets/arrow-down.svg";

const MyCollapsibleComponent = ({ title, content }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };


    return (
        <div className={'collapsible bg-lighterSky rounded-[5px] w-full'}>
            <div className={`collapsible-header flex justify-between items-center p-2`}>
                <div>
                    {title}
                </div>
                <div>
                    <img src={arrowDown} alt="arrow down" className={'w-8 cursor-pointer'} onClick={toggleCollapse}/>
                </div>
            </div>
            {isCollapsed ? null : (
                <div>
                    <div className="collapsible-content bg-lighterSky rounded-b-[5px] px-4 py-1">
                        {content}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCollapsibleComponent;