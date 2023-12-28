import React from 'react';
import { useTheme } from '../ThemeContext';
import './logo.css'
const Main = ()=>  {

    const { isDarkMode,  isNegative } = useTheme();
        return (
            <main>
                <div className={`kiki ${isDarkMode ? 'kiki-dark-mode' : ''}`}></div>

                <div className="wrap">
                <div>
                <p className='namelogo'>Nekonim</p>
                <div  className={`logo-container ${isNegative ? 'negative' : ''}`}>
                <img src='./images/catlogo.png' alt="Theme Mode" /></div></div>
                <div>
                        
                </div>
                </div>
                
      </main>   
           
             
            
          
            
        );
    
}

export default Main;
