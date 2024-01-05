import React, {useEffect, useState} from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserDashMain from "../components/UserDashMain";
import EmployeeDashMain from "../components/EmployeeDashMain";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import {useNavigate} from "react-router-dom";

function Dashboard() {

    let navigate = useNavigate();

    useEffect(() => {
        let roles = localStorage.getItem('roles');
        if (roles.includes('SUPERADMIN')) {
            setUserRole('SUPERADMIN');
            return;
        }
        if (roles.includes('PATIENT')) {
            setUserRole('PATIENT')
            return;
        }
        if (roles.includes('EMPLOYEE')) {
            setUserRole('EMPLOYEE')
            return;
        }
        navigate('/pageNotFound');
    }, [navigate]);

    const [userRole, setUserRole] = useState('');

    return (
        <>
            <PageLayout>
                <Header/>
                {userRole === "PATIENT" && <UserDashMain/>}
                {userRole === "EMPLOYEE" && <EmployeeDashMain/>}
                {userRole === 'SUPERADMIN' && <SuperAdminDashboard/>}
                <Footer/>
            </PageLayout>
        </>
    );
}

export default Dashboard;