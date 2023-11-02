import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import PageLayout from '../components/PageLayout';
import React from 'react';

function Login() {
    return (

        <PageLayout>

            <Header />
            <LoginForm />
            <Footer />

        </PageLayout>
    );
}
export default Login;