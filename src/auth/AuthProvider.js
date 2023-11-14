import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../http/api";
export const AuthContext = createContext();


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
            const response = await api.post(`/auth/login`, {
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
            throw error;
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