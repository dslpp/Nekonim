import Authorization from "./pages/Authorization/Authorization"
import Basket from "./pages/Basket"
import GoodsPage from "./pages/GoodsPage"
import Shop from "./pages/Shop"
import Admin from "./pages/AdminPanel"
import Catalog from "./pages/Catalog"
import Main from "./pages/Main/Main"
import { ADMIN_Route, BASKET_Route, CATALOG_Route, GOODS_Route, LOGIN_Route, MAIN_Route, REGISTRATION_Route, SHOP_Route, PERSONAL_Route } from "./utils/const"
import PersonalArea from "./pages/Personal Area/PersonalArea"

export const  adminRoutes = [
    {
        path: ADMIN_Route,
        Component: Admin,
        role: 'ADMIN'
    }
   
]
//список страниц для авторизированных пользователей
export const  authRoutes = [
    {
        path: PERSONAL_Route,
        Component: PersonalArea,
        role: ['USER', 'ADMIN']
    }
   
]
//список страниц для  НЕ авторизированных пользователей
export const publicRoutes = [
   
    {
        path: MAIN_Route,
        Component: Main
    },
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
        path: BASKET_Route,
        Component: Basket
    }   
]