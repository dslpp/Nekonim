import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { useTheme } from '../../ThemeContext';
import './Main.css'
import { useNavigate } from "react-router-dom";
import GoodsItemMain from '../../components/GoodsItemMain';
import { Button } from 'react-bootstrap';
import { CATALOG_Route } from '../../utils/const';
import { observer } from "mobx-react-lite";
import Footer from '../../components/Footer/Footer';

const Main = observer(()=>  {
    const history = useNavigate();
    const { isDarkMode,  isNegative } = useTheme();
        return (
            <div>
            <main>
                <div className={`kiki ${isDarkMode ? 'kiki-dark-mode' : ''}`}></div>

                <div className="wrap">
                
                <p className='namelogo'>Nekonim</p>
                <p className={`description ${isDarkMode ? 'description-dark-mode' : ''}`}>Интернет-магазин аниме товаров из Японии</p>
                <div  className={`logo-container ${isNegative ? 'negative' : ''}`}>
                <img src='./images/catlogo.png' alt="Theme Mode" /></div></div> 
                </main>  
                
                <div >
                <Carousel />
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h1 className={`tovar ${isDarkMode ? 'tovar-dark-mode' : ''}`}>Товары в нашем магазине</h1>
      </div>
            <GoodsItemMain/>
      <div className="d-flex justify-content-center align-items-center mt-4">
      {isDarkMode ? (
                <Button  style={{fontFamily:"Ossem"}} variant='outline-light' onClick={() => history(CATALOG_Route)}>Перейти в каталог</Button>
            ) : (
                <Button style={{fontFamily:"Ossem"}} variant='outline-dark' onClick={() => history(CATALOG_Route)}>Перейти в каталог</Button>
            )}
      </div>
    </div>
    <br/>
    <Footer/>
    </div>  
        );
    
})

export default Main;
