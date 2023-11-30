import React, { useContext } from "react";
import { Route, Routes, Navigate} from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_Route } from "../utils/const";
import { Context } from "../index";


const AppRouter = () => {
   const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
         <Route path="*" element={<Navigate to={SHOP_Route} />} />
        </Routes>
    );
}

export default AppRouter;
