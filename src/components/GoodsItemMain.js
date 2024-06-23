import React, { useEffect, useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GoodsItem from './GoodsItem/GoodsItem'; 
import { Context } from '../index';
import './../App.css';
import { observer } from 'mobx-react-lite';
import { fetchProducts, fetchTypes } from "../http/products";
import GoodsItemCarousel from './GoodsItemCarousel/GoodsItemCarousel';

const GoodsItemMain = observer(() => {
  const { type } = useContext(Context);
  const [itemsPerRow, setItemsPerRow] = useState(4);

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

    // Установка количества элементов в строке в зависимости от ширины окна
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerRow(1);
      } else {
        setItemsPerRow(4);
      }
    };

    // Вызов handleResize сразу и добавление слушателя на изменение размера окна
    handleResize();
    window.addEventListener('resize', handleResize);

    // Удаление слушателя при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [type]);

  const limitedProducts = type.products.slice(0, 4);

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
              <GoodsItemCarousel products={product} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
});

export default GoodsItemMain;
