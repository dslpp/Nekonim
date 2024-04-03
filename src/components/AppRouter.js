import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from "../routes";
import { MAIN_Route } from "../utils/const";
import { check } from "../http/userAPI";

const AppRouter = () => {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const user = await check();
                setUserRole(user.role);
            } catch (error) {
                setUserRole(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUserRole();
    }, []);

    
    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <Routes>
            {adminRoutes.map(({ path, Component, role }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        userRole === role ? <Component /> : <Navigate to={MAIN_Route} replace />
                    }
                />
            ))}
              {authRoutes.map(({ path, Component, role }) => (
               <Route
               key={path}
               path={path}
               element={
                   role.includes(userRole) ? <Component /> : <Navigate to={MAIN_Route} replace />
               }
           />
            ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            
            <Route path="*" element={<Navigate to={MAIN_Route} replace />} />
        </Routes>
    );
};

export default AppRouter;
