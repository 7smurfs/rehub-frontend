import Footer from '../components/Footer';
import Header from '../components/Header';
import PageLayout from '../components/PageLayout';
import React from 'react';
import SetNewPasswordMain from "../components/SetNewPasswordMain";

function SetNewPassword() {
    return (
        <PageLayout>

            <Header />
            <SetNewPasswordMain />
            <Footer />

        </PageLayout>
    );
}
export default SetNewPassword;