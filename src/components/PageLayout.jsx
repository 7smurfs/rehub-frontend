import React from 'react';

function PageLayout({ children }) {
    return (
        <div className="w-screen h-screen bg-white flex flex-col justify-between">
            {children}
        </div>
    );
};

export default PageLayout;