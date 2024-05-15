import React, { useContext,useEffect } from 'react';
import { Context } from '../../index';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';
import { observer } from 'mobx-react-lite';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ADMIN_Route, LOGIN_Route, MAIN_Route } from '../../utils/const';
import { useTheme } from '../../ThemeContext';
import BasketSVG from '../BasketSVG';
import { getBasket } from "../../http/products";

const NavBar = observer(() => {
    const { type } = useContext(Context);
    const { user } = useContext(Context);
    const history = useNavigate();
    const location = useLocation();
    const isMainRoute = location.pathname === MAIN_Route;
    const { isDarkMode, toggleTheme, isNegative } = useTheme();

    const handleImageClick = () => {
        toggleTheme();
    };

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.clear("token");
        window.location.reload(history(LOGIN_Route));
    };
    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const data = await getBasket();
                type.setBaskets(data);
            } catch (error) {
                console.error("Ошибка при загрузке корзины:", error);
            }
        };
        fetchBasket();
    }, []);

    return (
        <>
            <Navbar className={`navbars ${isDarkMode ? 'navbars-dark-mode' : ''}`}>
                <Container className="nav-container">
                    {!isMainRoute && <Link to="/main" className='brandStyle'>Nekonim</Link>}
                    <Nav className='ms-auto'>

                        <Link to="/shop"> О нас</Link>
                        <Link to="/dilevery"> Доставка</Link>
                        <Link to="/catalog"> Каталог </Link>    
                            <Link to="/basket"> Корзина
                            {user.isAuth &&(
                            <BasketSVG itemCount={type.basket.length}/> )}
                            </Link>
                        {user.isAuth && user.user.role === 'ADMIN' && (
                            <Link to="/admin" onClick={() => history(ADMIN_Route)}>Админ-панель</Link>
                        )}

                        {user.isAuth ? (
                            <Nav>
                             <Link to="/account" >Личный кабинет</Link> 
                                <Link
                                 to="/login"  onClick={() => logOut()}>  Выход</Link>
                            </Nav>
                        ) : (
                            <Nav>
                                <Link to='/login' onClick={() => history(LOGIN_Route)}>Вход</Link>
                            </Nav>
                        )}

                    </Nav>

                    <div className={`image-container ${isNegative ? 'negative' : ''}`} onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                        <img src='../images/thememode.png' alt="Theme Mode" />
                    </div>
                </Container>
            </Navbar>
        </>
    );
});

export default NavBar;
