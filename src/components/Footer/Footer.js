import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
import { MAIN_Route, SHOP_Route, CATALOG_Route, BASKET_Route, LOGIN_Route } from '../../utils/const'; // Подключаем нужные маршруты
import './Footer.css'
const Footer = () => {
  const { isDarkMode,  isNegative } = useTheme();
  return (
    <footer className={`footer ${isDarkMode ? 'footer-dark' : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
         
            <a to="/main" className='brandStyle'>Nekonim</a>
            
          </div>

          <div className="col-md-4">
            <ul className="footer-nav">
              Навигация по сайту
              <li><Link to={MAIN_Route}>Главная</Link></li>
              <li><Link to={SHOP_Route}>О нас</Link></li>
              <li><Link to={SHOP_Route}>Доставка</Link></li>
              <li><Link to={CATALOG_Route}>Каталог</Link></li>
              <li><Link to={BASKET_Route}>Корзина</Link></li>
              <li><Link to={LOGIN_Route}>Вход</Link></li>
            </ul>
          </div>
          <div className="col-md-4" >
            <h5 className="text-center">Следите за нами в социальных сетях:</h5>
            <ul className={`social-links ${isNegative ? 'negative' : ''}`}>
              <li><a href="https://t.me/dslp_ts" ><img src={"./images/tme.svg"}></img></a></li>
              <li><a href="https://www.instagram.com/dslp.ts"><img src={"./images/inst.svg"} className="fab fa-instagram"></img></a></li>
            </ul>
            <div className="mail"> 
              <h5 >Написать нам:</h5>
              <a href='mailto:nekonim@mail.ru?subject=Заголовок письма&body=Текст письма'>nekonim@mail.ru</a>
            </div>
            


          </div>
        </div>
        <hr/>
        <div className="copy">
  <p>&copy; {new Date().getFullYear()} Nekonim. Все права защищены.</p>
</div>

      </div>
    </footer>
  );
};

export default Footer;
