
import {React }from 'react';
import './../App.css';
import {Card, Col, Image} from "react-bootstrap"


const GoodsItem =({products})=> {

        return (
            <Col md={3    }>
               <Card className='Cards'>
               <div className='image-wrapper'>
                    <Image className='center-image' src={products.img} />
                </div>
                   <div className='label'>
                        <div>
                        {products.name}
                        <hr></hr>
                        </div>
                        <div>
                                <div className='price'>{products.price} {products.currency} </div>
                        </div>
                        
                   </div>
               </Card>
            </Col>
        );
    
}

export default GoodsItem;
