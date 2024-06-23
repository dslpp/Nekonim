import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import './IsolatedModal.css'; // Файл для локальных стилей модального окна

const OrderModal = ({ onShow, onClose, order }) => {
  if (!onShow || !order) return null;

  return (
    <>
      {onShow && <div className="modal-backdrop-blur" />} {/* Пример уникального класса для заднего фона */}
      <Modal show={onShow} onHide={onClose} centered>
        <Modal.Header closeButton className="d-flex align-items-center">
          <Modal.Title>Детали заказа</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Имя продукта</th>
                <th>Количество</th>
                <th>Цена за единицу</th>
                <th>Итоговая цена</th>
              </tr>
            </thead>
            <tbody>
              {order.orderProducts && order.orderProducts.length > 0 ? (
                order.orderProducts.map((orderProduct) => (
                  <tr key={orderProduct.id}>
                    <td>{orderProduct.name}</td>
                    <td>{orderProduct.quantity}</td>
                    <td>{orderProduct.price}</td>
                    <td>{(orderProduct.price * orderProduct.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Продукты не найдены</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderModal;
