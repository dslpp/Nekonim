import { React, useContext } from 'react';
import { Context } from '../index';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './../App.css';
import { observer } from 'mobx-react-lite';
import { useNavigate, useLocation } from 'react-router-dom';
import { ADMIN_Route, LOGIN_Route, MAIN_Route } from '../utils/const';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useNavigate();
  const location = useLocation();
  const isMainRoute = location.pathname === MAIN_Route;

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {!isMainRoute && <Navbar.Brand className='brandStyle' href="/main">Nekonim</Navbar.Brand>}
          <Nav className="ms-auto"> 
            <Nav.Link className='NavbarText' href="/about">О нас</Nav.Link>
            <Nav.Link className='NavbarText' href="/catalog">Каталог</Nav.Link>
            <Nav.Link className='NavbarText' href="/delivery">Доставка</Nav.Link>
            <Nav.Link className='NavbarText' href="/basket">Корзина</Nav.Link>
            {user.isAuth ? (
              <Nav>
                <Nav.Link className='login' variant='dark' onClick={() => history(ADMIN_Route)}>Админ-панель</Nav.Link>
                <Nav.Link className='login' variant='dark' onClick={() => history(LOGIN_Route) & user.setIsAuth(false)}>Выход</Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link className='login' variant='dark' onClick={() => history(LOGIN_Route)}>Вход</Nav.Link>
              </Nav>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
});

export default NavBar;
