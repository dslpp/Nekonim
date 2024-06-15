import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { resetPasswordRequest } from '../http/userAPI';


const ForgotPasswordModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = async () => {
    try {
      await resetPasswordRequest(email); 
      handleClose(); 
    } catch (error) {
      console.error('Error sending reset password email:', error);
      setError(error.message || 'Произошла ошибка при отправке email'); 
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Сброс пароля</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Введите ваш email</Form.Label>
            <Form.Control type="email" placeholder="Введите email" value={email} onChange={handleEmailChange} />
            <Form.Text className="text-muted">
              Мы отправим вам инструкции для сброса пароля на указанный email.
            </Form.Text>
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSendEmail}>
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ForgotPasswordModal;
