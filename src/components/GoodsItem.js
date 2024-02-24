
import {React }from 'react';
import './../App.css';
import {Card, Col, Image} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import { GOODS_Route } from '../utils/const';
 

const GoodsItem =({products})=> {
    const history =useNavigate()

        return (
            <Col md={3} onClick={()=> history(GOODS_Route+'/'+products.id)}>
               <Card className='Cards'>
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

export default GoodsItem;
