import React, { useState, useContext } from 'react';
import { Context } from '../../index';
import '../Authorization/Authorization.css';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import { CATALOG_Route, LOGIN_Route, REGISTRATION_Route } from '../../utils/const';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { registration, login } from '../../http/userAPI'; 
import { observer } from 'mobx-react-lite';
import { useTheme } from '../../ThemeContext';
import InputMask from 'react-input-mask';
import ForgotPassword from "../../modals/ForgotPassword";

const Authorization = observer(() => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_Route;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { user } = useContext(Context);
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false); 


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) newErrors.email = 'Заполните поле e-mail';
    else if (!validateEmail(email)) newErrors.email = 'Введите корректный адрес электронной почты';

    if (!password) newErrors.password = 'Заполните поле пароля';
    else if (password.length < 3 || password.length > 60) newErrors.password = 'Пароль должен содержать не менее 6 символов и не более 60';

    if (!isLogin) {
      if (!name) newErrors.name = 'Заполните поле имя';
      if (!surname) newErrors.surname = 'Заполните поле фамилия';
      if (!phoneNumber || phoneNumber.replace(/\D/g, '').length !== 12) {
        newErrors.phoneNumber = 'Заполните поле номер телефона полностью';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleModeToggle = () => {
    clearErrors(); 
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
  };

  const click = async () => {
    if (!validateForm()) return;

    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
        user.setUser(data);
        user.setIsAuth(true);
        history(CATALOG_Route);
        window.location.reload();
      } else {
        data = await registration(email, password, name, surname, phoneNumber);
        alert('Пользователь зарегистрирован. Для активации проверьте почту.');
      }

    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        alert(e.response.data.message);
      } else {
        alert('Что-то пошло не так. Пожалуйста, попробуйте еще раз.');
      }
    }
  };

  return (
    <Container className={Container}>
      <Card className={`Card ${isDarkMode ? 'Card-dark-mode' : ''}`}>
        <h2 className="m-auto">{isLogin ? 'Вход в личный кабинет' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          {!isLogin && (
            <>
              <Form.Control
                className="mt-4"
                placeholder="Введите имя..."
                value={name}
                onChange={handleInputChange(setName, 'name')}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid" style={{ textAlign: 'right', marginTop:"-0.1vmax"}}>
                {errors.name}
              </Form.Control.Feedback>
              <Form.Control
                className="mt-2"
                placeholder="Введите фамилию..."
                value={surname}
                onChange={handleInputChange(setSurname, 'surname')}
                isInvalid={!!errors.surname}
              />
              <Form.Control.Feedback type="invalid" style={{ textAlign: 'right', marginTop:"-0.1vmax"}}>
                {errors.surname}
              </Form.Control.Feedback>
              <InputMask 
                mask="+375 (99) 999-99-99" 
                value={phoneNumber}
                onChange={handleInputChange(setPhoneNumber, 'phoneNumber')}
              >
                {() => (
                  <Form.Control
                    className="mt-2"
                    placeholder="Введите номер телефона..."
                    isInvalid={!!errors.phoneNumber}
                  />
                )}
              </InputMask>
              <Form.Control.Feedback type="invalid" style={{ textAlign: 'right', marginTop:"-0.1vmax"}}>
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </>
          )}
          <Form.Control
            className="mt-2"
            placeholder="Введите ваш e-mail..."
            value={email}
            onChange={handleInputChange(setEmail, 'email')}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid" style={{ textAlign: 'right', marginTop:"-0.1vmax"}}>
            {errors.email}
          </Form.Control.Feedback>
          <Form.Control
            className="mt-2"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={handleInputChange(setPassword, 'password')}
            type="password"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid" style={{ textAlign: 'right', marginTop:"-0.1vmax"}}>
            {errors.password}
          </Form.Control.Feedback>
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <>
                <div>
                  Нет аккаунта? <NavLink to={REGISTRATION_Route} onClick={handleModeToggle}>Зарегистрируйтесь!</NavLink>
                </div>
                <div>
                {isLogin && (
            <NavLink  onClick={handleForgotPassword}>
              Забыли пароль?
            </NavLink>
          )}
                </div>
              </>
            ) : (
              <div>
              Есть аккаунт? <NavLink to={LOGIN_Route} onClick={handleModeToggle}>Войдите!</NavLink>
              </div>
            )}
            <Button className={`mt-${isLogin ? '3' : '2'} mx-auto`} id='Log' onClick={click}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          </Row>
        </Form>
      </Card>
      <ForgotPassword show={showForgotPassword} handleClose={handleForgotPasswordClose} /> 
    </Container>
  );
});

export default Authorization;
