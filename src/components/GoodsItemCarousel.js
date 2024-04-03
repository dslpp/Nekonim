
import {React }from 'react';
import './../App.css';
import {Card, Col, Image} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import { GOODS_Route } from '../utils/const';
 

const GoodsItemCarousel =({products})=> {
    const history =useNavigate()

        return (
            <Col onClick={()=> history(GOODS_Route+'/'+products.id)}>
               <Card className='Cardss'>
               <div className='image-wrapper'>
                    <Image className='center-image' src={process.env.REACT_APP_API_URL+ products.img} />
                </div>
                   <div className='label'>
                        <div>
                        {products.name}
                        <hr></hr>
                        </div>
                        <div>
                                <div className='price'>{products.price} р. </div>
                        </div>
                        
                   </div>
               </Card>
            </Col>
        );
    
}

export default GoodsItemCarousel;
