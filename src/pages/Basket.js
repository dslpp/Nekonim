import React, { useEffect, useContext, useState } from "react";
import { Container, Col, Card, Button, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getBasket, deleteFromBasket } from "../http/products";
import { Context } from '../index';
import { observer } from "mobx-react-lite";
import { RECEIPT_Route } from '../utils/const';
import './Basket.css'; // Импортируем CSS файл

const Basket = observer(() => {
    const { type } = useContext(Context);
    const history = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        getBasket().then(data => type.setBaskets(data));
    }, []);

    const handleDelete = async (basketId) => {
        try {
            await deleteFromBasket(basketId);
            getBasket().then(data => type.setBaskets(data));
        } catch (error) {
            console.error("Ошибка при удалении товара из корзины:", error);
        }
    };

    useEffect(() => {
        let prices = 0;
        type.basket.forEach(item => {
            prices += Number(item.product.price) * item.quantity;
        });
        setTotalPrice(prices);
    }, [type.basket]);

    return (
        <div> 
            {type.basket.length === 0 && (
                <div className="alert alert-info">Корзина пуста</div>
            )}
            {type.basket.length > 0 && (
                <div className="containerbas">
                    <div className="items"> {/* Применяем класс из CSS */}
                        {type.basket.map(item => (
                            <Card className="item" key={item.id}>
                               
                                        <div className="product">
                                            <img src={process.env.REACT_APP_API_URL + item.product.img} width={100} alt={item.product.name} />
                                            <p className="name">{item.product.name}</p>
                                            <span className="quantity ">Количество: {item.quantity}</span>
                                        </div>
                                    
                                        <div className="prices">
                                            <p className="priceb">{item.product.price * item.quantity} рублей</p>
                                            <Button variant="danger"  className="buttondel"onClick={() => handleDelete(item.id)}>Удалить</Button>
                                        </div>
                              
                            </Card>
                        ))}
                    </div>
                    
                    <Card className="total"> 
                        <h1 className="result">Итого:</h1>
                        <h3 className="pl-2">{totalPrice} рублей</h3>
                        <Button variant='success' className="button" onClick={() => history(RECEIPT_Route)}>Оплата</Button>
                    </Card>
                </div>
            )}
        </div>
    );
});

export default Basket;
