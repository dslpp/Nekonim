import React, { useEffect, useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getBasket, deleteFromBasket, incrementQuantity, decrementQuantity } from "../../http/products";
import { Context } from '../../index';
import { observer } from "mobx-react-lite";
import { CATALOG_Route, PAY_Route } from '../../utils/const';
import './Basket.css'; 
import Footer from '../../components/Footer/Footer';

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
            const isSelected = prevSelected.some(id => id === itemId);
            if (isSelected) {
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
            const existingItem = type.basket.find(item => item.id === basketId);
            if (existingItem && existingItem.quantity < 15) {
                await incrementQuantity(basketId);
                const data = await getBasket();
                type.setBaskets(data);
            }
        } catch (error) {
            console.error("Ошибка при увеличении количества товара:", error);
        }
    };

    const handleDecrement = async (basketId) => {
        try {
            const existingItem = type.basket.find(item => item.id === basketId);
            if (existingItem && existingItem.quantity > 1) {
                await decrementQuantity(basketId);
                const data = await getBasket();
                type.setBaskets(data);
            }
        } catch (error) {
            console.error("Ошибка при уменьшении количества товара:", error);
        }
    };

    const handleSelectAll = () => {
        const allItemIds = type.basket.map(item => item.id);
        if (selectedItems.length === allItemIds.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(allItemIds);
        }
    };

    const handleDeleteAll = async () => {
        try {
            for (const itemId of selectedItems) {
                await deleteFromBasket(itemId);
            }
            const data = await getBasket();
            type.setBaskets(data);
            setSelectedItems([]);
        } catch (error) {
            console.error("Ошибка при удалении выбранных товаров из корзины:", error);
        }
    };

    const handlePayment = () => {
        history(PAY_Route, {
            state: {
                totalPrice: totalPrice,
                selectedItems: type.basket.filter(item => selectedItems.includes(item.id)).map(item => ({
                    productId: item.product.id, 
                    quantity: item.quantity,
                    price: item.product.price
                }))
            }
        });
    };

    const relocate = () => {
        history(CATALOG_Route);
    };

    const isAnyItemSelected = selectedItems.length > 0;

    return (
        <div>
            {type.basket.length > 0 && (
                <div id="allCustom">
                    <div className="checkbox-container-custom" onClick={handleSelectAll}>
                        <input 
                            type="checkbox" 
                            checked={selectedItems.length === type.basket.length} 
                            readOnly 
                        />
                        <span className="custom-checkbox-custom"></span>
                        Выбрать всё
                    </div>
                    <Button 
                        id="delAllCustom" 
                        variant="online" 
                        onClick={handleDeleteAll} 
                        disabled={!isAnyItemSelected} // Делаем кнопку недоступной, если ни один товар не выбран
                    >
                        Удалить выбранное
                    </Button>
                </div>
            )}

            {type.basket.length === 0 && (
                <div className="empty-basket">
                    <img src='./images/empty.png' alt="Пустая корзина" />
                    <div>Корзина пуста</div>
                    <br />
                    <Button id="relocatebbt" onClick={relocate}>Отправиться за покупками!</Button>
                </div>
            )}

            {type.basket.length > 0 && (
                <div className="containerbas">
                    <div className="items">
                        {type.basket.map(item => (
                            <Card className="item" key={item.id}>
                                <div className="checkbox-container" onClick={() => toggleSelect(item.id)}>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => toggleSelect(item.id)}
                                    />
                                    <span className="custom-checkbox"></span>
                                </div>
                                <div className="product">
                                    <img className="images" src={item.product.img ? `${process.env.REACT_APP_API_URL}/statics/${item.product.img}` : ''}  width={100} alt={item.product.name} />
                                    <p className="name">{item.product.name}</p>
                                    <p className="quantity">
                                        Количество: 
                                        <Button variant="outline" id="buttondec" onClick={() => handleDecrement(item.id)}>-</Button> {item.quantity}
                                        <Button variant="outline" id="buttondec" onClick={() => handleIncrement(item.id)}>+</Button>
                                    </p>
                                </div>                        
                                <div className="prices">
                                    <p className="priceb">{(item.product.price * item.quantity).toFixed(2)} рублей</p>
                                    <img src="../images/trash.png" className="buttondel" onClick={() => handleDelete(item.id)}/>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="total">
                        <h1 className="result">Итого:</h1>
                        <h3 className="pl-2">{totalPrice.toFixed(2)} рублей</h3>
                        <Button 
                            variant='success' 
                            className="button" 
                            onClick={handlePayment} 
                            disabled={!isAnyItemSelected} // Делаем кнопку оплаты недоступной, если ни один товар не выбран
                        >
                            Оплата
                        </Button>
                    </div>
                </div>
            )}

            <br />
            <Footer />
        </div>
    );
});

export default Basket;
