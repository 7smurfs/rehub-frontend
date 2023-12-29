import './index.css';
import Login from './pages/Login';
import Landing from './pages/Landing';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './auth/AuthProvider';
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import PasswordReset from "./pages/PasswordReset";
import SetNewPassword from "./pages/SetNewPassword";
import PageNotFound from "./pages/PageNotFound";


function App() {
    return (

        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<Landing/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/about" element={<>About smurf</>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/passwordReset" element={<PasswordReset/>}/>
                    <Route path="/password/reset/:tkn" element={<SetNewPassword/>}/>
                    <Route path={'*'} element={<PageNotFound/>}/>
                </Routes>
            </AuthProvider>
        </Router>


    );
}

export default App;
