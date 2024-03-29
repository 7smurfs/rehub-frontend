import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../http/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('access-token');
        const storedUserInfo = sessionStorage.getItem('userInfo');

        if (token && !isAuthenticated) {
            setIsAuthenticated(true);
            if (storedUserInfo) {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                setUserInfo({
                    firstName: parsedUserInfo.firstName,
                    lastName: parsedUserInfo.lastName
                });
            }
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
            // and save the token and user info in local storage
            setIsAuthenticated(true);
            setUserInfo({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            });
            sessionStorage.setItem('access-token', response.data.accessToken);
            sessionStorage.setItem('roles', JSON.stringify(response.data.roles));
            sessionStorage.setItem('userInfo', JSON.stringify({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            }));
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        // Clear user data from local storage to log the user out
        sessionStorage.removeItem('access-token');
        sessionStorage.removeItem('roles');
        sessionStorage.removeItem('userInfo');
        setIsAuthenticated(false);
        setUserInfo({
            firstName: "",
            lastName: ""
        });
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
