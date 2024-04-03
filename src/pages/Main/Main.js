import React from 'react';
import SomeCarousel from '../../components/Carousel/SomeCarousel';
import { useTheme } from '../../ThemeContext';
import './Main.css'
import { useNavigate } from "react-router-dom";
import GoodsItemMain from '../../components/GoodsItemMain';
import { Button } from 'react-bootstrap';
import { CATALOG_Route } from '../../utils/const';
import { observer } from "mobx-react-lite";
import Footer from '../../components/Footer';

const Main = observer(()=>  {
    const history = useNavigate();
    const { isDarkMode,  isNegative } = useTheme();
        return (
            <div>
            <main>
                <div className={`kiki ${isDarkMode ? 'kiki-dark-mode' : ''}`}></div>

                <div className="wrap">
                
                <p className='namelogo'>Nekonim</p>
                <p className={`description ${isDarkMode ? 'description-dark-mode' : ''}`}>Интренет-магазин аниме товаров из Японии</p>
                <div  className={`logo-container ${isNegative ? 'negative' : ''}`}>
                <img src='./images/catlogo.png' alt="Theme Mode" /></div></div> 
                </main>  
                <SomeCarousel />
                <div >
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h1 className={`tovar ${isDarkMode ? 'tovar-dark-mode' : ''}`}>Товары в нашем магазине</h1>
      </div>
            <GoodsItemMain >
              
            </GoodsItemMain>
       
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Button variant='outline-dark' onClick={() => history(CATALOG_Route)}>Перейти в каталог</Button>
      </div>
    </div>
    <Footer/>
    </div>  
        );
    
})

export default Main;
