import React from 'react';
import GoodsCarousel from '../components/GoodsCarousel';
import { Row,  Container } from 'react-bootstrap';


const Shop = () => {
  return (
    <div >
      <div className="d-flex justify-content-center align-items-center mt-4">
        <h1>Товары в нашем магазине</h1>
      </div>

      <Container>
        <Row className="mt-4">
    
            <GoodsCarousel />
       
        </Row>
      </Container>
      <div className="d-flex justify-content-center align-items-center mt-2">
      </div>
    </div>
  );
}

export default Shop;
