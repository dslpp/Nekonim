import React, { useEffect, useState, useContext } from "react";
import { Container, Col, Image, Card, Button, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProducts, addToBasket } from "../../http/products";
import "../GoodsPage/GoodsPage.css";
import { Context } from '../../index';
import ChangeProducts from "../../modals/ChangeProducts";
import DeleteProducts from "../../modals/DeleteProducts";
import { observer } from "mobx-react-lite";
import { check } from "../../http/userAPI";
import Authorizmodal from "../../modals/Authorizmodal";
import { useTheme } from '../../ThemeContext';

const GoodsPage = observer(() => {
  const { isDarkMode } = useTheme();
  const { user } = useContext(Context);
  const [product, setProduct] = useState({ info: [] });
  const { id } = useParams();
  const [chnprodVisable, setchnprodVisable] = useState(false);
  const [delprodVisable, setdelprodVisable] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [authVisable, setauthVisable] = useState(false);

  useEffect(() => {
    fetchOneProducts(id).then(data => setProduct(data));
  }, [id]);

  const add = async () => {
    try {
        const user = await check();
        setUserRole(user.role);

        const formData = new FormData();
        formData.append('productId', id);
        console.log('Adding product to basket:', id);
        addToBasket(formData).then(response => alert(`Товар ${product.name} был добавлен в вашу корзину!`));
    } catch (error) {
        console.error('Error adding to basket:', error);
        setauthVisable(true);
        setUserRole(null);
    }
};

  return (
    <Container className={`mt ${isDarkMode ? 'mt-dark-mode' : ''}`} >
     
      <div className="image">
        <div className="imagegoods">
          <Image className="centerimage" src={process.env.REACT_APP_API_URL + product.img} />
        </div>
      </div>
      <div className="products">
        <h1>{product.name}</h1>
        <hr />
        <h3>{product.price} р.</h3>
        <Button variant={"outline-dark"} onClick={add}>Положить в корзину</Button>
        <hr />
        <p className="shortdesc">{product.shortdescription}</p>
        <div className="characteristic mt-4">
          <hr />
          <h3>Характеристики</h3>
          {product.info.map((info, index) => (
            <Row key={info.id} style={{ background: index % 2 === 0 ? '#f5f5f5' : 'transparent', padding: '10px' }}>
              <Col xs={6}>{info.title}</Col>
              <Col xs={6}>{info.description}</Col>
            </Row>
          ))}
        </div>
      </div> {user.isAuth && user.user.role === 'ADMIN' && (
        <div className="button-group">
          <Button variant="outline" onClick={() => setchnprodVisable(true)}>
            <img id="edit-del" src="../images/edit.png" alt="edit" />
          </Button>
          <Button variant="outline" onClick={() => setdelprodVisable(true)}>
            <img id="edit-del"src="../images/trash.png" alt="delete" width={20} />
          </Button>
        </div>
       
      )}
       <div className="reviews">
          
      </div>
      <ChangeProducts show={chnprodVisable} onHide={() => setchnprodVisable(false)} />
      <DeleteProducts show={delprodVisable} onHide={() => setdelprodVisable(false)} />
      <Authorizmodal show={authVisable} onHide={() =>  setauthVisable(false)} />
    </Container>
  );
});

export default GoodsPage;
