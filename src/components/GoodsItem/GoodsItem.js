import React, { useState, useContext, useEffect } from 'react';
import { Card, Col, Image, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GOODS_Route } from '../../utils/const';
import { Context } from '../../index';
import './GoodsItem.css'; // Подключаем CSS файл
import { useTheme } from '../../ThemeContext';
import { check } from "../../http/userAPI";
import Authorizmodal from "../../modals/Authorizmodal";
import { addToBasket } from "../../http/products";

const GoodsItem = ({ products }) => {
    const history = useNavigate();
    const { isDarkMode } = useTheme();
    const { user } = useContext(Context);
    const [authVisible, setAuthVisible] = useState(false);
    const [notification, setNotification] = useState(null);
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000); // Закрываем уведомление через 5 секунд

            return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
        }
    }, [notification]);
    const addToCart = async () => {
        try {
            const userData = await check(); // Проверяем авторизацию пользователя
            const formData = new FormData();
            formData.append('productId', products.id);
            console.log('Adding product to basket:', products.id);
            addToBasket(formData).then(response => setNotification(`Товар "${products.name}" был добавлен в вашу корзину!`));
        } catch (error) {
            console.error('Error adding to basket:', error);
            setAuthVisible(true); // Показываем модальное окно для авторизации
        }
    };

    return (
        <Col md={3}>
            <Card className={`Cards ${isDarkMode ? 'Cards-dark' : ''}`}>
                <div className='image-wrapper' onClick={() => history(GOODS_Route + '/' + products.id)}>
                    <Image className='center-image' src={products.img ? `${process.env.REACT_APP_API_URL}statics/${products.img}` : ''} />
                </div>
                <div className='label'>
                    <div className={`product-name ${isDarkMode ? 'product-name-dark' : ''}`}>
                        {products.name}
                    </div>
                    <hr/>
                    <div>
                        <div className='price'>{products.price} р. </div>
                    </div>
                    <button className='add-to-cart-button' onClick={addToCart}>Добавить в корзину</button>
                </div>
            </Card>
            <Authorizmodal show={authVisible} onHide={() => setAuthVisible(false)} />
            {notification &&
        <div style={{ position: 'fixed', top: 50, right: 20, zIndex: 9999 }}>
          <Alert variant="success" onClose={() => setNotification(null)} dismissible>
            {notification}
          </Alert>
        </div>
      }
        </Col>
    );
}

export default GoodsItem;
