import { observer } from 'mobx-react-lite';
import {React, useContext }from 'react';
import { Context } from '../index';
import {Row} from "react-bootstrap"
import GoodsItem from "../components/GoodsItem";

const GoodsList =observer(()=> {
    const {type} =useContext (Context)
        return (
            <Row className='d-flex'>
                {type.products.map(products=>
                  <GoodsItem key={products.id} products={products} />
                    )}
            </Row>
        );
    
})

export default GoodsList;
