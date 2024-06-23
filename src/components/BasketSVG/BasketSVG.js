import React from 'react';
import './BasketSVG.css';

import { useTheme } from '../../ThemeContext';

const BasketSVG = ({ itemCount }) => {
  const { isNegative } = useTheme();

  

  return (
    <div className="basket-container">
      <img className={`basket-icon ${isNegative ? 'basket-icon-negative' : ''}`} src="../images/basket.png" alt="Basket" />
      <div className="item-count-container">
        {itemCount == 0 ||<span className="item-count">{itemCount}</span>}
      </div>
    </div>
  );
};

export default BasketSVG;
