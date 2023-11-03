import React, { createContext, useState, useEffect } from "react";
import axios from 'axios'; // Import axios
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
  }
});

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isAuthenticated) {
            setIsAuthenticated(true);
            navigate('/dashboard');
        }
    }, [navigate, isAuthenticated]);

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post(`/auth/login`, {
                username: email,
                password: password
            });
            // If login is successful, setIsAuthenticated to true
            // and save the token in local storage
            setIsAuthenticated(true);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('roles', JSON.stringify(response.data.roles))
            // Redirect to a different route
            navigate('/dashboard');
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    const logout = () => {
        // Clear user data from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};