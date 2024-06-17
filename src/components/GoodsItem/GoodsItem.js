import React from 'react';
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GOODS_Route } from '../../utils/const';
import './GoodsItem.css'; // Подключаем CSS файл
import { useTheme } from '../../ThemeContext';

const GoodsItem = ({ products }) => {
    const history = useNavigate();
    const { isDarkMode } = useTheme();

    return (
        <Col md={3} onClick={() => history(GOODS_Route + '/' + products.id)}>
            <Card className={`Cards ${isDarkMode ? 'Cards-dark' : ''}`}>
                <div className='image-wrapper'>
                    <Image className='center-image' src={process.env.REACT_APP_API_URL + products.img} />
                </div>
                <div className='label'>
                    <div className={`product-name ${isDarkMode ? 'product-name-dark' : ''}`}>
                        {products.name}
                    </div>
                    <hr />
                    <div>
                        <div className='price'>{products.price} р. </div>
                    </div>
                    <button  className='add-to-cart-button'>Добавить в корзину</button>
                </div>
            </Card>
        </Col>
    );
}

export default GoodsItem;
