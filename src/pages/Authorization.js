import {React,  useContext }from 'react';
import { Context } from "../index";
import Container from "react-bootstrap/esm/Container";
import './../App.css'
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row"
import { LOGIN_Route, REGISTRATION_Route } from "../utils/const";
import { NavLink, useLocation } from "react-router-dom";

const Authorization = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_Route
    const {user} = useContext(Context)
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 62 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Вход в личный кабинет' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-4"
                        placeholder="Введите логин..."
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль..."
                    />
                    <Button className="mt-4 mx-auto" style={{ width: '50%' }} onClick={()=>  user.setIsAuth(true)}>
                        {isLogin  ?
                            'Войти' : 'Зарегистрироваться'}
                    </Button>
                    <Row className="mt-4">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_Route}>Зарегистрироваться</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_Route}>Войти</NavLink>
                            </div>
                        }
                    </Row>
                </Form>
            </Card>
        </Container>
    );
}
export default Authorization;
