import React from 'react';

function PageLayout({ children }) {
    return (
        <div className="w-full h-screen bg-white flex flex-col justify-between">
            {children}
        </div>
    );
};

export default PageLayout;