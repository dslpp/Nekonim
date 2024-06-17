import {React }from 'react';
import {Card, Col, Image} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import { GOODS_Route } from '../../utils/const';
import "./GoodsItemCarousel.css"
import { useTheme } from '../../ThemeContext';

const GoodsItemCarousel =({products})=> {
    const history =useNavigate()
    const { isDarkMode } = useTheme();

        return (
            <Col  onClick={() => history(GOODS_Route + '/' + products.id)}>
            <Card className={`Cardss ${isDarkMode ? 'Cardss-dark' : ''}`}>
               <div className='image-wrapper'>
                    <Image className='center-image' src={process.env.REACT_APP_API_URL+ products.img} />
                </div>
                   <div className='label'>
                        <div>
                        {products.name}
                    </div>
                    <hr />
                    <div>
                        <div className='price'>{products.price} р. </div>
                    </div>
                    <button  className='add-to-cart-buttons'>Добавить в корзину</button>
                </div>
            </Card>
        </Col>
    );
    
}

export default GoodsItemCarousel;
