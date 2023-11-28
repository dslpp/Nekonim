import {React,  useContext }from 'react';
import { Context } from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './../App.css';
import {observer} from 'mobx-react-lite';
import {useNavigate} from "react-router-dom"
import { ADMIN_Route, LOGIN_Route } from '../utils/const';



const NavBar = observer(() => {
  const {user} = useContext(Context)
  const history =useNavigate()
        return (
            <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand  className='brandStyle' href="/shop">Nekonim</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='NavbarText' href="/shop">Главная</Nav.Link>
            <Nav.Link className='NavbarText' href="/catalog">Каталог</Nav.Link>
          </Nav>
          {user.isAuth ?
          <Nav>
            <Button  className='login' variant='dark'  onClick={()=> history(ADMIN_Route)}>Админ-панель</Button>
            <Button  className='login' variant='dark' onClick={()=> history(LOGIN_Route) & user.setIsAuth(false)}>Выход</Button>
         </Nav>
         :
         <Nav>
            <Button  className='login' variant='dark'  onClick={() => user.setIsAuth(true)}>Вход</Button>
         </Nav>
         }
        </Container>
      </Navbar>
     </>
    
        );
    
})

export default NavBar;
