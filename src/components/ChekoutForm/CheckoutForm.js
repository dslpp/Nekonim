import React, { useState} from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css'; // Import the CSS file for styling
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const history = useNavigate();
    const { totalPrice } = location.state;
    const [showModal, setShowModal] = useState(false);

    
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe не загружен, ничего не делаем
          return;
        }
    
        // Получаем данные карты из формы
        const cardElement = elements.getElement(CardElement);
    
        // Отправляем платежные данные Stripe
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            console.error(error);
        } else {
            console.log(paymentMethod);
            // Simulate successful payment
            setShowModal(true);
        }
        
    
    

        
    };

    const handleViewReceipt = () => {
        setShowModal(false);
        history('/receipt');
    };

    const handleReturnToCart = () => {
        setShowModal(false);
        history('/basket');
    };

    return (
        <div className="centered-container">
            <form onSubmit={handleSubmit} className="payment-form">
                <h2>К оплате: {totalPrice.toFixed(2)} BYN</h2>
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
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="success-icon">✔️</span>
                        <p>Платёж прошёл успешно!</p>
                        <p>Желаете посмотреть чек?</p>
                        <button onClick={handleViewReceipt}>Да</button>
                        <button onClick={handleReturnToCart}>Нет</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutForm;
