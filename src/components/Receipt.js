// Receipt.jsx
import React, { useEffect, useState, useContext } from 'react';
import { getBasket } from '../http/products';
import { Context } from '../index';
import './Receipt.css'

const Receipt = () => {
  const { type } = useContext(Context);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPrinting] = useState(true);
  useEffect(() => {
    getBasket().then(data => type.setBaskets(data));
  }, []);

  useEffect(() => {
    if (isPrinting) {
      calculateTotalAmount();
    }
  }, [isPrinting]);

  const calculateTotalAmount = () => {
    let prices = 0;
    type.basket.forEach(item => {
      prices += Number(item.product.price) * item.quantity;
    });
    setTotalAmount(prices);
  };

  const printReceipt = () => {
    const button = document.getElementById("myButton");
    button.style.display = "none";
    window.print();
  };

  return (
    <div className={`container ${isPrinting ? 'printing' : ''}`}>
      {isPrinting && (
        <>
          <h2>Чек об оплате</h2>
          <div className="items">
            {type.basket.map(item => (
              <div className="itemres" key={item.id}>
                <span>{item.product.name} — </span>
                <span>{item.product.price * item.quantity} рублей</span> {/* Учитываем количество товара */}
              </div>
            ))}
          </div>
          <hr />
          <div>
            <strong>Итого:</strong> {totalAmount} рублей
          </div>
        </>
      )}
      <button id="myButton" onClick={printReceipt}>Распечатать чек</button>
    </div>
  );
};

export default Receipt;
