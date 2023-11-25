import React from "react";
import Container from "react-bootstrap/esm/Container";
import './../App.css'
import Card from 'react-bootstrap/Card';
import  Form  from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { observer } from "mobx-react-lite";

const Authorization =  observer(() => {
    return(
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight-62}}    >
            
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto">Вход в личный кабинет</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-4"
                        placeholder="Введите ваш логин..."
                     
                    />
                     <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                       
                    />
                     <Button className="mt-4 mx-auto" style={{width:'50%'}}>
                        Войти
                        </Button>
                        
                    </Form>
            </Card>
        </Container>
        
    );
})
export default Authorization;
