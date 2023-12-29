import Footer from '../components/Footer';
import Header from '../components/Header';
import PageLayout from '../components/PageLayout';
import React from 'react';
import PassResetMain from "../components/PassResetMain";

function PasswordReset() {
    return (

        <PageLayout>
            <Header />
            <PassResetMain />
            <Footer />
        </PageLayout>
    );
}
export default PasswordReset;