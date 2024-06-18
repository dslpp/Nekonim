import * as React from 'react';
import './SendEmail.css';
import { Button } from 'react-bootstrap';
import emailjs from '@emailjs/browser'
import { useTheme } from '../../ThemeContext';
function SendEmail() {
  const { isDarkMode } = useTheme();
     const send=(e)=> {
        e.preventDefault();
        alert("Отправлено")
        emailjs.sendForm('service_ctmwqli', 'template_z4h9el8', e.target, 'KRDXfIKXP5mnheyzq')
     }
  return (
    <div>
      <h1 className={`page__title ${isDarkMode ? 'page__title-dark' : ''}`}>Возникли вопросы? Свяжитесь с нами!</h1>
      <form className="contact__form" onSubmit={send}>
        <label htmlFor="emailFrom">Email:</label>
        <input type="text" name="email_from" id="emailFrom" className="email__from" placeholder="person@example.com"/>
        <label htmlFor="subject">Тема:</label>
        <input type="text" name="subject_form" id="subjectForm" className="subject__form" placeholder="Тема вопроса"  autocomplete="off"/>
        <label htmlFor="message">Комментарий:</label>
        <textarea name="message" id="message" className="message__box"></textarea>
        <Button type='submit' variant="outline-dark"  className="submit__btn" style={{marginTop: "5px"}}>
        Отправить
      </Button>
      </form>
    </div>
  );
}

export default SendEmail;