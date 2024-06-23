import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from "../routes";
import { MAIN_Route, LOGIN_Route, REGISTRATION_Route, FORGET_Route } from "../utils/const";
import { check } from "../http/userAPI";
import ResetPasswordPage from "../pages/ResetPasswordPage"; // Импортируем страницу сброса пароля

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
            {/* Проверка наличия токена перед рендерингом страницы сброса пароля */}
            <Route
                path={`${FORGET_Route}/:resetToken`}
                element={<ResetPasswordRoute />}
            />
            {/* Добавляем перенаправление на главную страницу для всех остальных путей */}
            <Route path="*" element={<Navigate to={MAIN_Route} replace />} />
        </Routes>
    );
};

// Компонент для проверки токена перед рендерингом страницы сброса пароля
const ResetPasswordRoute = () => {
    const { resetToken } = useParams();

    // Проверка наличия токена
    if (!resetToken) {
        return <Navigate to={MAIN_Route} replace />;
    }

    return <ResetPasswordPage />;
};

export default AppRouter;
