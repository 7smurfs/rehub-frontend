import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import React from 'react';

function Login() {
    return(

        <div className="w-screen h-screen bg-white flex flex-col justify-between">

            <Header />
            <LoginForm />
            <Footer />

        </div>
    );
}
export default Login;