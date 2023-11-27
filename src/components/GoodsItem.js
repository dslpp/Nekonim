
import {React }from 'react';
import './../App.css';
import {Card, Col, Image} from "react-bootstrap"


const GoodsItem =({products})=> {

        return (
            <Col md={3    }>
               <Card className='Cards'>
                   <Image width={150} height={150} src={products.img}/>
                   <div>
                        <div>
                        {products.name}
                        </div>
                        <div>
                                <div>{products.price}</div>
                        </div>
                        
                   </div>
               </Card>
            </Col>
        );
    
}

export default GoodsItem;
