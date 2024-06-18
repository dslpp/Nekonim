import React from 'react';
import SendEmail from '../../components/SendEmail/SendEmail';
import "./Shop.css"
import Footer from '../../components/Footer/Footer';
import { useTheme } from '../../ThemeContext';

const Shop = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="shop-container">
      <div className={`shop-info ${isDarkMode ? 'shop-info-dark' : ''}`}>
        <h2>Магазин "Nekonim" – Манга, комиксы, фигурки, супер!</h2>
        <p>Наш магазин существует с 2024 года. Мы – молодые и перспективные! Просвещаем в массы японскую аниме культуру!</p>
        <p>Мы привыкли думать, что наш магазин выгодно отличается на фоне других аниме магазинов именно благодаря нашему подходу к делу, оформлению, ассортименту, отсутствии рекламы на сайте и общению с покупателями. Мы ценим наших клиентов и стараемся посвящать интересующихся в необъятный, но такой интересный и разнообразный мир комиксов.</p>
        <p>Наш магазин находится по адресу:</p>
        <p>Улица Боровая, дом 52</p>
        <p>Без перерывов и выходных с 10:00 до 20:00</p>
        <p>По вопросам заказа и работы магазинов: +375(29)111-11-11, или почта <a href="mailto:nekonim@mail.com">nekonim@mail.com</a></p>
     
      </div>
         <SendEmail/>
         <br/>
      <Footer/>
    </div>
  );
}

export default Shop;
