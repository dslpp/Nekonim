import React from 'react';
import { Modal } from 'react-bootstrap';
import './Authorizmodal.css';
import { useNavigate } from 'react-router-dom';
import { LOGIN_Route } from '../utils/const';

const Authorizmodal = ({ show, onHide, onHideOffcanvas }) => {
    const history = useNavigate();
    const click = async () => {
        history(LOGIN_Route);
        onHide();
        onHideOffcanvas(); // Закрытие канваса
    };

    return (
        <>
            {show && <div className="modal-backdrop-blur" />}
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="custom-modal"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Внимание
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">
                    Вы не авторизованы, пожалуйста войдите в аккаунт!
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={click} className="custom-button">Войти в аккаунт</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Authorizmodal;
