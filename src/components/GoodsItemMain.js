import React, { useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GoodsItem from './GoodsItem'; 
import { Context } from '../index';
import './../App.css';
import { observer } from 'mobx-react-lite';
import { fetchProducts, fetchTypes } from "../http/products";

const GoodsItemMain = observer(() => {
  const { type } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesData = await fetchTypes();
        const productsData = await fetchProducts();
        type.setTypess(typesData);
        type.setProducts(productsData.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    return () => {
 
    };
  }, []); 

  const limitedProducts = type.products.slice(0, 4);
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
      {chunkedProducts.map((chunk, index) => (
        <Row key={index}>
          {chunk.map((product) => (
            <Col key={product.id} md={12 / itemsPerRow}>
              <GoodsItem products={product} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
});

export default GoodsItemMain;
