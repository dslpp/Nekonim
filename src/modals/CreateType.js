import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button, Alert } from "react-bootstrap";
import { createType } from "../http/products";

const CreateType = ({ show, onHide}) => { 
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(null);
    

    const addType = () => {
        createType({ name: value }).then(data => {
            setValue('');
            setNotification("Успешно добавлено");
            setTimeout(() => {
                setNotification(null);
                onHide(); 
            }, 2000); 
           
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') 
                           {
                               addType();
                           }}}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
            {notification &&
        <div style={{ position: 'fixed', top: 50, right: 10, zIndex: 9999 }}>
          <Alert variant="success">
            {notification}
          </Alert>
        </div>
      }
        </Modal>
    );
};

export default CreateType;
