import React from 'react';
import { Modal, Button } from 'react-bootstrap';



const Authorizmodal = ({ show, onHide }) => { 

   

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body
            style={{fontSize:"1.5vmax", textAlign:"center"}}
            >
            Вы не авторизованы, пожалуйста войдите в аккаунт!
            </Modal.Body>
            
        </Modal>
    );
};

export default Authorizmodal;
