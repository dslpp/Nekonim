import Authorization from "./pages/Authorization/Authorization";
import Basket from "./pages/Basket/Basket";
import GoodsPage from "./pages/GoodsPage/GoodsPage";
import Shop from "./pages/Shop";
import Admin from "./pages/AdminPanel";
import Catalog from "./pages/Catalog/Catalog";
import Main from "./pages/Main/Main";
import Receipt from "./components/Receipt";
import PersonalArea from "./pages/Personal Area/PersonalArea";
import { ADMIN_Route, BASKET_Route, RECEIPT_Route, CATALOG_Route, GOODS_Route, LOGIN_Route, MAIN_Route, REGISTRATION_Route, SHOP_Route, PERSONAL_Route, PAY_Route } from "./utils/const";
import PaymentPage from "./pages/PaymentPage";

export const adminRoutes = [
    {
        path: ADMIN_Route,
        Component: Admin,
        role: 'ADMIN'
    }
];

export const authRoutes = [
    {
        path: BASKET_Route,
        Component: Basket,
        role: ['USER', 'ADMIN']
    },
    {
        path: RECEIPT_Route,
        Component: Receipt,
        role: ['USER', 'ADMIN']
    },
    {
        path: PERSONAL_Route,
        Component: PersonalArea,
        role: ['USER', 'ADMIN']
    },
    {
        path: PAY_Route,
        Component: PaymentPage,
        role: ['USER', 'ADMIN']
    }
];

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
    },
    {
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
    }
];
