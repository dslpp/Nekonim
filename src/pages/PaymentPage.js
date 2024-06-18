import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/ChekoutForm/CheckoutForm';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe("pk_test_51PPl8TP3X3j0YeqkyxNdkA99ik9jH9ACbLhJzDfg1cYB3nHfo5LDPdKhHOttoBsvKU5QgdoWNFwdbdVvWK5Mbawx00EiAwU4R8");

const PaymentPage = () => {
    const location = useLocation();
    const { totalPrice } = location.state;
    return (
        <div>
            
            <Elements stripe={stripePromise}>
                <CheckoutForm totalPrice={totalPrice} />
            </Elements>
        </div>
    );
};

export default PaymentPage;
