import React from 'react';
import SomeCarousel from '../../components/Carousel/SomeCarousel';
import { useTheme } from '../../ThemeContext';
import './Main.css'
const Main = ()=>  {

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
                <SomeCarousel /></div>
                
                
                
      
           
             
            
          
            
        );
    
}

export default Main;
