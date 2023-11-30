import React from "react";
import { Container, Col, Image, Card, Button, Row } from "react-bootstrap";

const GoodsPage = () => {
    const products = {
        id: 9, typeId: 9, name: 'Мягкая монетница Тоторо', shortdescription: 'Мягкая игрушка-монетница — дух леса Тоторо из популярного аниме Хаяо Миядзаки «Мой сосед Тоторо».', price: 6.99, img: '../images/totoro.jpg'
    };

    const description = [
        { id: 1, title: "Высота", descriptions: '8 см.' },
        { id: 2, title: "Вес", descriptions: '30 г.' },
        { id: 3, title: "Материал", descriptions: 'Плюш' },

    ];

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <div className='imagegoods'>
                        <Image className='centerimage' src={products.img} />
                    </div>

                </Col>
                <Col md={8}>
                    <h1> {products.name}</h1>
                    <p className="shortdesc">
                        {products.shortdescription}
                    </p>
                    <Card className="BasketCardGoods">
                        <h3> {products.price} р.</h3>
                        <Button variant="outline-success" className="w-15">Добавить в корзину</Button>
                    </Card>
                    <Row className="characteristic">
                        <Col xs={12}>
                            <h3 style={{ textAlign: "center" }}>Характеристика</h3>
                            {description.map((info, index) =>
                                <Row key={info.id} style={{ background: index % 2 === 0 ? '#f5f5f5' : 'transparent', padding: '10px' }}>
                                    <Col xs={6}>{info.title}</Col>
                                    <Col xs={6}>{info.descriptions}</Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default GoodsPage;
