import React, { useEffect, useState } from "react";
import { Container, Col, Image, Card, Button, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProducts } from "../http/products";

const GoodsPage = () => {
    const [product, setProduct] = useState({ info: [] });
    const { id } = useParams();

    useEffect(() => {
        fetchOneProducts(id).then(data => setProduct(data));
    }, [id]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Товар успешно добавлен в корзину!");
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <div className='imagegoods'>
                        <Image className='centerimage' src={process.env.REACT_APP_API_URL + product.img} />
                    </div>
                </Col>
                <Col md={8}>    
                    <h1>{product.name}</h1>
                    <p className="shortdesc">{product.shortdescription}</p>
                    <Card className="BasketCardGoods">
                        <h3>{product.price} р.</h3>
                        <Button variant="outline-success" className="w-15" onClick={addToCart}>Добавить в корзину</Button>
                    </Card>
                    <Row className="characteristic">
                        <Col xs={12}>
                            <h3 style={{ textAlign: "center" }}>Характеристика</h3>
                            {product.info.map((info, index) =>
                                <Row key={info.id} style={{ background: index % 2 === 0 ? '#f5f5f5' : 'transparent', padding: '10px' }}>
                                    <Col xs={6}>{info.title}</Col>
                                    <Col xs={6}>{info.description}</Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default GoodsPage;
