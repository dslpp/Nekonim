import React, { useEffect, useState, useContext } from "react";
import { Container, Col, Image, Button, Row, Form, Card, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProducts, addToBasket, addReview, fetchReviews, fetchTypes, deleteReview } from "../../http/products";
import "../GoodsPage/GoodsPage.css";
import { Context } from '../../index';
import ChangeProducts from "../../modals/ChangeProducts";
import DeleteProducts from "../../modals/DeleteProducts";
import { observer } from "mobx-react-lite";
import { check } from "../../http/userAPI";
import Authorizmodal from "../../modals/Authorizmodal";
import { useTheme } from '../../ThemeContext';
import Footer from '../../components/Footer/Footer';

const GoodsPage = observer(() => {
  const { isDarkMode } = useTheme();
  const { user } = useContext(Context);
  const { type } = useContext(Context);
  const [product, setProduct] = useState({ info: [] });
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const { id } = useParams();
  const [chnprodVisable, setchnprodVisable] = useState(false);
  const [delprodVisable, setdelprodVisable] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [authVisable, setauthVisable] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchTypes().then(data => type.setTypess(data));
    fetchOneProducts(id).then(data => setProduct(data));
    fetchReviews(id).then(data => setReviews(data)); 
  }, [id]);
  useEffect(() => {
    if (notification) {
        const timer = setTimeout(() => {
            setNotification(null);
        }, 5000); // Закрываем уведомление через 5 секунд

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    }
}, [notification]);

  const add = async () => {
    try {
      const user = await check();
      setUserRole(user.role);

      const formData = new FormData();
      formData.append('productId', id);
      console.log('Adding product to basket:', id);
      addToBasket(formData).then(response => setNotification(`Товар "${product.name}" был добавлен в вашу корзину!`));
    } catch (error) {
      console.error('Error adding to basket:', error);
      setauthVisable(true);
      setUserRole(null);
      setNewReview({ rating: 0, comment: '' }); // Очищаем поля комментария и оценки
    }
  };
  
  const handleAddReview = async () => {
    try {
      const user = await check();
      setUserRole(user.role);

      const review = {
        rating: newReview.rating,
        comment: newReview.comment,
        productId: id,
      };
      const data = await addReview(review);
      setReviews([...reviews, data]);
      setNewReview({ rating: 0, comment: '' }); // Очищаем поля комментария и оценки
    } catch (error) {
      console.error('Error adding review:', error);
      setauthVisable(true);
      setUserRole(null);
      setNewReview({ rating: 0, comment: '' }); // Очищаем поля комментария и оценки
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter(review => review.id !== reviewId));
      setNotification('Комментарий успешно удалён!');
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  return (
    <div>
      <Container className={`mt ${isDarkMode ? 'mt-dark-mode' : ''}`}>
        <div className="image">
          <div className="imagegoods">
            <Image className="centerimage" src={product.img ? `${process.env.REACT_APP_API_URL}/statics/${product.img}` : ''} />
          </div>
        </div>
        <div className="products">
          <h1>{product.name}</h1>
          <hr />
          <h3>{product.price} р.</h3>
          <Button id="addbasket" onClick={add}>Положить в корзину</Button>
          <hr />
          <p className="shortdesc">{product.shortdescription}</p>
          <div className={`characteristic mt-4 ${isDarkMode ? 'characteristic-dark-mode' : ''}`}>
            <hr />
            <h3>Характеристики</h3>
            {product.info.map((info, index) => (
              <Row key={info.id} style={{ background: index % 2 === 0 ? (isDarkMode ? '#444' : '#f0eeee') : 'transparent', padding: '10px' }}>
                <Col xs={6}>{info.title}</Col>
                <Col xs={6}>{info.description}</Col>
              </Row>
            ))}
          </div>
        </div>
        {user.isAuth && user.user.role === 'ADMIN' && (
          <div className="button-group">
            <Button variant="outline" onClick={() => setchnprodVisable(true)}>
              <img id="edit-del" src="../images/edit.png" alt="edit" />
            </Button>
            <Button variant="outline" onClick={() => setdelprodVisable(true)}>
              <img id="edit-del" src="../images/trash.png" alt="delete" width={20} />
            </Button>
          </div>
        )}

        <ChangeProducts show={chnprodVisable} onHide={() => setchnprodVisable(false)} />
        <DeleteProducts show={delprodVisable} onHide={() => setdelprodVisable(false)} />
        <Authorizmodal show={authVisable} onHide={() => setauthVisable(false)} />
      </Container>
      <div className={`reviews ${isDarkMode ? 'reviews-dark-mode' : ''}`}>
        <h3>Отзывы</h3>
        <div className={`add-review ${isDarkMode ? 'add-review-dark-mode' : ''}`}>
          <Form.Group className="mb-3" controlId="formReview">
            <Form.Control
              as="textarea"
              rows={3}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Оставить отзыв"
              disabled={!user.isAuth} // Делаем поле неактивным при отсутствии авторизации
            />
            <div className="rating">
              <Form.Label>Ваша оценка</Form.Label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${hoverRating >= star || newReview.rating >= star ? 'filled' : ''}`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    onMouseEnter={() => setHoverRating(star)} 
                    onMouseLeave={() => setHoverRating(0)} 
                  >&#9733;</span>
                ))}
              </div>
            </div>
            <Button variant="success" onClick={handleAddReview} disabled={!user.isAuth || !newReview.comment.trim() || newReview.rating === 0}>Отправить отзыв</Button>
          </Form.Group>
        </div>
        <div className={`review-section ${isDarkMode ? 'review-section-dark-mode' : ''}`}>
          {reviews.map(review => (
            <Card key={review.id} className="mb-3">
              <Card.Body>
                <Card.Text>
                  <small className="user-name">{review.user.name}</small>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={`star ${review.rating >= star ? 'filled' : ''}`}>&#9733;</span>
                    ))}
                  </div>
                </Card.Text>
                <Card.Text>{review.comment}</Card.Text>
                <Card.Text>
                  <small className="date-text">{new Date(review.reviewDate).toLocaleDateString()}</small>
                </Card.Text>
                {user.isAuth && user.user.role === 'ADMIN' && (
                  <Button variant="danger" onClick={() => handleDeleteReview(review.id)}>Удалить</Button>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
      {notification &&
        <div style={{ position: 'fixed', top: 50, right: 20, zIndex: 9999 }}>
          <Alert variant="success" onClose={() => setNotification(null)} dismissible>
            {notification}
          </Alert>
        </div>
      }
    </div>
  );
});

export default GoodsPage;
