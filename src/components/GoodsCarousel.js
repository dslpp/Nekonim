import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import GoodsItem from './GoodsItem'; 
import { useContext } from 'react';
import { Context } from '../index';
import './../App.css';

const GoodsCarousel = () => {
  const { type } = useContext(Context);

  const limitedProducts = type.products.slice(0, 8);
  let itemsPerRow = 4;

  if (window.innerWidth <= 768) {
    itemsPerRow = 1;
  }

  const chunkedProducts = [];
  for (let i = 0; i < limitedProducts.length; i += itemsPerRow) {
    chunkedProducts.push(limitedProducts.slice(i, i + itemsPerRow));
  }

  return (
    <Container>
      <Carousel variant='dark' indicators={false} className="custom-carousel">
        {chunkedProducts.map((chunk, index) => (
          <Carousel.Item key={index}>
            <Row>
              {chunk.map((product) => (
                <Col key={product.id} md={12 / itemsPerRow}>
                  <GoodsItem products={product} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default GoodsCarousel;
