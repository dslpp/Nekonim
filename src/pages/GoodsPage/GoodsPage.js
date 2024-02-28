import React, { useEffect, useState, useContext } from "react";
import { Container, Col, Image, Card, Button, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProducts,addToBasket } from "../../http/products";
import "../GoodsPage/GoodsPage.css"
import { Context } from '../../index';
import ChangeProducts from "../../modals/ChangeProducts";
import DeleteProducts from "../../modals/DeleteProducts";
import { observer } from "mobx-react-lite";
import { check } from "../../http/userAPI";

const GoodsPage = observer(() => {
    const { user } = useContext(Context);
    const [product, setProduct] = useState({ info: [] });
    const { id } = useParams();
    const [chnprodVisable, setchnprodVisable] = useState(false);
    const [delprodVisable, setdelprodVisable] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        fetchOneProducts(id).then(data => setProduct(data));
    }, [id]);

   const add = async () => {
    try {
        const user = await check();
        setUserRole(user.role);

        const formData = new FormData();
        formData.append('productId', id);
        addToBasket(formData).then(response => alert(`Товар ${product.name} был добавлен в вашу корзину!`));
    } catch (error) {
        alert("Вы не авторизованы, пожалуйста войдите в аккаунт!")
        setUserRole(null);
    }
};

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <div className='imagegoods'>
                        {console.log(product.id)}
                        <Image className='centerimage' src={process.env.REACT_APP_API_URL + product.img} />
                    </div>
                </Col>
                <Col md={7}>    
                    <h1>{product.name}</h1>
                    <p className="shortdesc">{product.shortdescription}</p>
                    <Card className="BasketCardGoods">
                        <h3>{product.price} р.</h3>
                        <Button variant={"outline-dark"} onClick={add} >Добавить в корзину</Button>
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
                {user.isAuth && user.user.role === 'ADMIN' && (
                           <Col md={1}>
                           <div className="button-group">
                               <Button variant="outline" onClick={() => setchnprodVisable(true)}  ><img  src="../images/edit.png" /></Button>
                               <Button variant="outline" onClick={() => setdelprodVisable(true)} > <img src="../images/trash.png" width={20}/></Button>
                           </div>
                       </Col>
                        )}
                
            </Row>
            <ChangeProducts show={chnprodVisable} onHide={() => setchnprodVisable(false)}/>
            <DeleteProducts show={delprodVisable} onHide={() => setdelprodVisable(false)}/>
        </Container>
    );
});

export default GoodsPage;
