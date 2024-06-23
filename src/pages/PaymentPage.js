import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/ChekoutForm/CheckoutForm';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe("pk_test_51PPl8TP3X3j0YeqkIndrLRqMrNAvLcDYq4JqnSOgur6nNf2XoBr0n7xmwMkrEQdyHLzVaiFzF1kLqsQRjavd7N3a00ZVlTMVDP");

const PaymentPage = () => {
    const location = useLocation();
    const { totalPrice, selectedItems } = location.state;
    return (
        <div>
            
            <Elements stripe={stripePromise}>
                 <CheckoutForm totalPrice={totalPrice} selectedItems={selectedItems} />
            </Elements>
        </div>
    );
};

export default PaymentPage;
