import React, { useContext } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './../App.css';
import {observer} from 'mobx-react-lite';



const NavBar = observer(() => {
    const {user}=useContext(Context)
        return (
            <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand  className='brandStyle' href="shop">Nekonim</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='NavbarText' href="shop">Главная</Nav.Link>
            <Nav.Link className='NavbarText' href="goods">Каталог</Nav.Link>
          </Nav>
          {user.isAuth ?
          <Nav>
            <Button  className='login' variant='dark' >Админ-панель</Button>
            <Button  className='login' variant='dark' >Выход</Button>
         </Nav>
         :
         <Nav>
            <Button  className='login' variant='dark' onClick={() => user.setIsAuth(true)}>Вход</Button>
         </Nav>
         }
        </Container>
      </Navbar>
     </>
    
        );
    
})

export default NavBar;
