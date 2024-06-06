import React, { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams, Navigate} from 'react-router-dom'; // Для получения параметров из URL
import { resetPassword } from '../http/userAPI'
import { LOGIN_Route } from '../utils/const';

const ResetPassword = ({ show, handleClose, resetToken, handleResetPassword }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleReset = () => {
    handleResetPassword(password, resetToken);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Изменение пароля</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Новый пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите новый пароль" value={password} onChange={handlePasswordChange} />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Подтвердите новый пароль</Form.Label>
            <Form.Control type="password" placeholder="Подтвердите новый пароль" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleReset}>
          Изменить пароль
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ResetPasswordPage = () => {
  const [showModal, setShowModal] = useState(true);
  const { resetToken } = useParams();

  const handleCloseModal = () => {
    setShowModal(false);
    
  };

  const handleResetPassword = async (password, resetToken) => {
    try {
      await resetPassword(resetToken, password);
     
      handleCloseModal();
      
    } catch (error) {
      console.error('Error resetting password:', error);
      // Обработка ошибки при изменении пароля
    }
  };

  return (
    <ResetPassword
      show={showModal}
      handleClose={handleCloseModal}
      resetToken={resetToken}
      handleResetPassword={handleResetPassword}
    />
    
  );
};

export default ResetPasswordPage;
