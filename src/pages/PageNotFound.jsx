import Footer from '../components/Footer';
import Header from '../components/Header';
import PageLayout from '../components/PageLayout';
import React from 'react';

import SickPerson from '../assets/sick_person.webp';

function PageNotFound() {
    return (

        <PageLayout>
            <Header/>
                <div className={'flex flex-col h-full items-center justify-center text-sky-900 font-bold text-center'}>
                    <img src={SickPerson} alt={'sick_person'} className={'absolute m-auto left-0 right-0 top-0 bottom-0 opacity-60'} />
                    <h1 className={'text-9xl z-20'}>404</h1>
                    <h2 className={'text-5xl my-2 z-20'}>Stranica nije pronađena</h2>
                    <h2 className={'text-5xl z-20'}>Ne gubite zdravlje kao web stranice</h2>
                </div>
            <Footer/>
        </PageLayout>
    );
}

export default PageNotFound;