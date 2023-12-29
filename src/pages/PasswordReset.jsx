import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
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