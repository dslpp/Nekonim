import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../index';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import { check } from "../../http/userAPI";
import { deleteFromBasket } from "../../http/products";
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ totalPrice, selectedItems }) => {
    const stripe = useStripe();
    const elements = useElements();
    const history = useNavigate();
    const { user } = useContext(Context);
    const [userId, setUserId] = useState(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await check(); 
                setUserId(userData.id); 
            } catch (error) {
                console.error('Ошибка при получении данных пользователя', error);
            }
        };
        fetchUserData(); 
    }, []); 

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements || !userId) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
    
        if (error) {
            console.error(error);
        } else {
            console.log(paymentMethod);
            const orderData = {
                userId: userId,
                products: selectedItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    name:item.name
                })),
                totalAmount: totalPrice,
                status: "В обработке"
            };
    
            try {
                const response = await fetch('http://localhost:5000/api/orders/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });
    
                if (response.ok) {
                    for (const selectedItem of selectedItems) {
                        await deleteFromBasket(selectedItem.productId); // Передача productId для удаления товара из корзины
                    }
                    history('/receipt');
                } else {
                    console.error('Ошибка при создании заказа');
                }
            } catch (error) {
                console.error('Ошибка при отправке данных на сервер', error);
            }
        }
    };
    
    return (
        <div className="centered-container">
            <form onSubmit={handleSubmit} className="payment-form">
                <h2>К оплате: {totalPrice.toFixed(2)} рублей</h2>
                <hr />
                <label>
                    Email
                    <input type="email" name="email" required />
                </label>
                <label>
                    Информация о карте
                    <CardElement />
                </label>
                <label>
                    Держатель карты
                    <input type="text" name="cardholder-name" required />
                </label>
                <button type="submit" disabled={!stripe}>Оплатить</button>
            </form>
        </div>
    );
};

export default CheckoutForm;
