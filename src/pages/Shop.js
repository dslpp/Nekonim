import React from 'react';
import SomeCarousel from '../components/SomeCarousel';
import GoodsCarousel from '../components/GoodsCarousel';
import ButtonCatalog from '../components/ButtonCatalog';
import { Row, Col, Container } from 'react-bootstrap';


const Shop = ({ products }) => {
  return (
    <div >
      <SomeCarousel />
      <div className="d-flex justify-content-center align-items-center mt-4">
        <h1>Товары в нашем магазине</h1>
      </div>

      <Container>
        <Row className="mt-4">
    
            <GoodsCarousel />
       
        </Row>
      </Container>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <ButtonCatalog />
      </div>
    </div>
  );
}

export default Shop;
