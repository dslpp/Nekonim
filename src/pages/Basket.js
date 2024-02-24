import React, { useState } from "react";

const Basket = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const changeQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    return (
        <div>
            <h2>Корзина</h2>
            {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                    <div>
                        <p>{item.name} - {item.price} руб.</p>
                        <input type="range" min="1" max="10" value={item.quantity} onChange={(e) => changeQuantity(item.id, parseInt(e.target.value))} />
                        <button onClick={() => removeFromCart(item.id)}>Удалить из корзины</button>
                    </div>
                </div>
            ))}
            <h3>Итого: {calculateTotal()} руб.</h3>
        </div>
    );
};

export default Basket;
