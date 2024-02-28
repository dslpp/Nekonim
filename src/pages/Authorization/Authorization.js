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

const Authorization = observer(() => {
  const { isDarkMode} = useTheme();
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_Route;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(Context);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const click = async () => {
    setEmailError('');
    setPasswordError('');
    if (!email || !password) {
      if (!email) setEmailError('Заполните поле e-mail');
      if (!password) setPasswordError('Заполните поле пароля');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Введите корректный адрес электронной почты');
      return;
    }
    if (password.length < 6 || password.length > 60) {
      setPasswordError('Пароль должен содержать не менее 6 символов и не более 60');
      return;
    }
    let data;
    try {
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      window.location.reload(history(CATALOG_Route));
      
    } catch (e) {
      alert(e.response.data.message)
      console.clear();
    }
    
  };
  
  return (
    <Container className={Container}>
      <Card  className={`Card ${isDarkMode ? 'Card-dark-mode' : ''}`}>
        <h2 className="m-auto">{isLogin ? 'Вход в личный кабинет' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-4"
            placeholder="Введите e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!emailError}
          />
          <Form.Control.Feedback type="invalid" style={{ textAlign: 'right' }}>
            {emailError}
          </Form.Control.Feedback>
          <Form.Control
            className="mt-3"
            placeholder="Введите пароль..."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid" style={{ textAlign: 'right' }}>
            {passwordError}
          </Form.Control.Feedback>
          <Button className="mt-3 mx-auto" style={{ width: '50%' }} onClick={() => click()}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Row className="mt-4">
            {isLogin ? (
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_Route}>Зарегистрироваться</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт? <NavLink to={LOGIN_Route}>Войти</NavLink>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
});
export default Authorization;
