import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Navbar.css';
import { observer } from 'mobx-react-lite';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ADMIN_Route, LOGIN_Route, MAIN_Route } from '../../utils/const';
import { useTheme } from '../../ThemeContext';
import BasketSVG from '../BasketSVG/BasketSVG';
import { getBasket } from "../../http/products";
import Authorizmodal from '../../modals/Authorizmodal';

const NavBar = observer(() => {
    const { type } = useContext(Context);
    const { user } = useContext(Context);
    const history = useNavigate();
    const location = useLocation();
    const isMainRoute = location.pathname === MAIN_Route;
    const { isDarkMode, toggleTheme, isNegative } = useTheme();

    const [authVisable, setauthVisable] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleImageClick = () => {
        toggleTheme();
    };

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem("token");
        history(LOGIN_Route);
        window.location.reload();
    };

    const handleBasketClick = () => {
        if (user.isAuth) {
            history("/basket");
        } else {
            setauthVisable(true);
        }
    };

    const handleLinkClick = (url) => {
        setShowOffcanvas(false);
        history(url);
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
            <Navbar className={`navbars ${isDarkMode ? 'navbars-dark-mode' : ''}`} expand="lg">
                <Container className="nav-container">
                    <Navbar.Toggle aria-controls="offcanvas-navbar-nav" onClick={() => setShowOffcanvas(true)} className={isDarkMode ? 'navbar-toggle-dark-mode' : ''} />
                    {!isMainRoute && <Link to="/main" className='brandStyle'>Nekonim</Link>}
                    <Navbar.Offcanvas
                        id="offcanvas-navbar-nav"
                        aria-labelledby="offcanvas-navbar-nav"
                        placement="start"
                        show={showOffcanvas}
                        onHide={() => setShowOffcanvas(false)}
                        className={`offcanvas ${isDarkMode ? 'offcanvas-dark-mode' : ''}`}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvas-navbar-nav">
                                <Link to="/main" className='brandStyl'>Nekonim</Link>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className='ms-auto'>
                                <Link to="/shop" onClick={() => handleLinkClick('/shop')}>О нас</Link>
                                <Link to="/dilevery" onClick={() => handleLinkClick('/dilevery')}>Доставка</Link>
                                <Link to="/catalog" onClick={() => handleLinkClick('/catalog')}>Каталог</Link>
                                {user.user.role !== 'ADMIN' && (
                                    <Link to="/basket" onClick={handleBasketClick}> Корзина
                                    {user.isAuth && (
                                        <BasketSVG itemCount={type.basket.length} />
                                    )}
                                    </Link>
                                )}
                                {user.isAuth && user.user.role === 'ADMIN' && (
                                    <Link to="/admin" onClick={() => handleLinkClick(ADMIN_Route)}>Админ-панель</Link>
                                )}
                                {user.isAuth ? (
                                    <Nav>
                                        {user.user.role !== 'ADMIN' && (
                                            <Link to="/account" onClick={() => handleLinkClick('/account')}>Личный кабинет</Link>
                                        )}
                                        <Link to="/login" onClick={() => {
                                            logOut();
                                            setShowOffcanvas(false);
                                        }}>Выход</Link>
                                    </Nav>
                                ) : (
                                    <Nav>
                                        <Link to='/login' onClick={() => handleLinkClick(LOGIN_Route)}>Вход</Link>
                                    </Nav>
                                )}
                                <div className={`image-container ${isNegative ? 'negative' : ''}`} onClick={handleImageClick}>
                                    <img src='../images/thememode.png' alt="Theme Mode" />
                                </div>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <Authorizmodal show={authVisable} onHide={() => setauthVisable(false)} onHideOffcanvas={() => setShowOffcanvas(false)} />
        </>
    );
});

export default NavBar;
