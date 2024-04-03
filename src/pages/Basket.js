import React, { useEffect, useContext, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getBasket, deleteFromBasket, incrementQuantity, decrementQuantity } from "../http/products";
import { Context } from '../index';
import { observer } from "mobx-react-lite";
import { RECEIPT_Route } from '../utils/const';
import './Basket.css'; 

const Basket = observer(() => {
    const { type } = useContext(Context);
    const history = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const data = await getBasket();
                type.setBaskets(data);
            } catch (error) {
                console.error("Ошибка при загрузке корзины:", error);
            }
        };
        fetchBasket();
    }, []);

    useEffect(() => {
        let prices = 0;
        type.basket.forEach(item => {
            if (selectedItems.includes(item.id)) {
                prices += Number(item.product.price) * item.quantity;
            }
        });
        setTotalPrice(prices);
    }, [type.basket, selectedItems]);

    const toggleSelect = (itemId) => {
        setSelectedItems(prevSelected => {
            if (prevSelected.includes(itemId)) {
                return prevSelected.filter(id => id !== itemId);
            } else {
                return [...prevSelected, itemId];
            }
        });
    };

    const handleDelete = async (basketId) => {
        try {
            await deleteFromBasket(basketId);
            const data = await getBasket();
            type.setBaskets(data);
        } catch (error) {
            console.error("Ошибка при удалении товара из корзины:", error);
        }
    };

    const handleIncrement = async (basketId) => {
        try {
            await incrementQuantity(basketId);
            const data = await getBasket();
            type.setBaskets(data);
        } catch (error) {
            console.error("Ошибка при увеличении количества товара:", error);
        }
    };

    const handleDecrement = async (basketId) => {
        try {
            await decrementQuantity(basketId);
            const data = await getBasket();
            type.setBaskets(data);
        } catch (error) {
            console.error("Ошибка при уменьшении количества товара:", error);
        }
    };

    const handleSelectAll = () => {
        const allItemIds = type.basket.map(item => item.id);
        setSelectedItems(allItemIds);
    };

    return (
        <div> 
            <Button variant='primary' className="select-all" onClick={handleSelectAll}>Выбрать всё</Button>
            {type.basket.length === 0 && (
                <div className="alert alert-info">Корзина пуста</div>
            )}
            {type.basket.length > 0 && (
                <div className="containerbas">
                    <div className="items"> 
                        {type.basket.map(item => (
                            <Card className="item" key={item.id}>
                                <div className="product">
                                    <Form.Check
                                        className="checkbox"
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => toggleSelect(item.id)}
                                    />
                                    <img src={process.env.REACT_APP_API_URL + item.product.img} width={100} alt={item.product.name} />
                                    <p className="name">{item.product.name}</p>
                                    <p className="quantity">Количество: 
                                        <Button variant="outline" className="buttondec" onClick={() => handleDecrement(item.id)}>-</Button> {item.quantity}
                                        <Button variant="outline" className="buttoninc" onClick={() => handleIncrement(item.id)}>+</Button>
                                    </p>   
                                </div>
                                <div className="prices">
                                    <p className="priceb">{(item.product.price * item.quantity).toFixed(2)} рублей</p>
                                    <Button variant="danger" className="buttondel" onClick={() => handleDelete(item.id)}>Удалить</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="total"> 
                        <h1 className="result">Итого:</h1>
                        <h3 className="pl-2">{totalPrice.toFixed(2)} рублей</h3>
                        <Button variant='success' className="button" onClick={() => history(RECEIPT_Route)}>Оплата</Button>
                        
                    </div>
                </div>
            )}
        </div>
    );
});

export default Basket;
