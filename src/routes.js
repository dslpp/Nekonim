import Authorization from "./pages/Authorization"
import Basket from "./pages/Basket"
import GoodsPage from "./pages/GoodsPage"
import Shop from "./pages/Shop"
import Admin from "./pages/AdminPanel"
import Catalog from "./pages/Catalog"
import Main from "./pages/Main"
import { ADMIN_Route, BASKET_Route, CATALOG_Route, GOODS_Route, LOGIN_Route, MAIN_Route, REGISTRATION_Route, SHOP_Route } from "./utils/const"

//список страниц для авторизированных пользователей
export const  authRoutes = [
    {
        path: ADMIN_Route,
        Component: Admin
    }, {
        path: BASKET_Route,
        Component: Basket
    }   
   
]
//список страниц для  НЕ авторизированных пользователей
export const publicRoutes = [
   
    {
        path: SHOP_Route,
        Component: Shop
    },
    {
        path: GOODS_Route + '/:id',
        Component: GoodsPage
    },{
        path: REGISTRATION_Route,
        Component: Authorization
    },
    {
        path: LOGIN_Route,
        Component: Authorization
    },
    {
        path: CATALOG_Route,
        Component: Catalog
    },
    {
        path: GOODS_Route,
        Component: GoodsPage
    },
    {
        path: MAIN_Route,
        Component: Main
    }
]