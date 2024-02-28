import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from "react-router-dom";
import { fetchOneProducts, deleteProducts } from '../http/products';
import { CATALOG_Route} from '../utils/const';

const DeleteProducts = observer(({ show, onHide}) => {
  const { id } = useParams();
  const history = useNavigate();
  useEffect(() => {
    fetchOneProducts(id)
  }, [id]);

  const handleDelete = async () => {
    try {
      // Вызываем функцию удаления товара
      await deleteProducts(id);
      alert("Товар успешно удалён")
      // Закрываем модальное окно
      onHide();
      window.location.reload(history(CATALOG_Route));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Удалить товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите удалить этот товар? 
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-danger" onClick={handleDelete}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteProducts;
