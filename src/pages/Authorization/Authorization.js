import React, { useState, useContext } from 'react';
import { Context } from '../../index';
import Container from 'react-bootstrap/esm/Container';
import '../Authorization/Authorization.css';
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) newErrors.email = 'Заполните поле e-mail';
    else if (!validateEmail(email)) newErrors.email = 'Введите корректный адрес электронной почты';

    if (!password) newErrors.password = 'Заполните поле пароля';
    else if (password.length < 6 || password.length > 60) newErrors.password = 'Пароль должен содержать не менее 6 символов и не более 60';

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

  const click = async () => {
    if (!validateForm()) return;

    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password, name, surname, phoneNumber);
      }
      user.setUser(data);
      user.setIsAuth(true);
      history(CATALOG_Route);
      window.location.reload();
    } catch (e) {
      alert(e.response.data.message);
      console.clear();
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
                mask="+375 (99) 99-99-999"
                className={`mt-2 form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                placeholder="Введите номер телефона..."
                value={phoneNumber}
                onChange={handleInputChange(setPhoneNumber, 'phoneNumber')}
              />
              <Form.Control.Feedback type="invalid" style={{ textAlign: 'right', marginTop:"-0.1vmax"}}>
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </>
          )}
          <Form.Control
            className={`mt-${isLogin ? '4' : '2'}`}
            placeholder="Введите e-mail..."
            value={email}
            onChange={handleInputChange(setEmail, 'email')}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid" style={{ textAlign: 'right', marginTop:"-0.1max"}}>
            {errors.email}
          </Form.Control.Feedback>
          <Form.Control
            className={`mt-${isLogin ? '3' : '2'}`}
            placeholder="Введите пароль..."
            type="password"
            value={password}
            onChange={handleInputChange(setPassword, 'password')}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid" style={{ textAlign: 'right', marginTop:"-0.1vmax"}}>
            {errors.password}
          </Form.Control.Feedback>
          <Button className={`mt-${isLogin ? '3' : '2'} mx-auto`} id='Log' onClick={click}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Row className={`mt-${isLogin ? '4' : '3'}`}>
            {isLogin ? (
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_Route} onClick={handleModeToggle}>Зарегистрироваться</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт? <NavLink to={LOGIN_Route} onClick={handleModeToggle}>Войти</NavLink>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Authorization;
