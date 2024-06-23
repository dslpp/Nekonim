import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const OrdersListModal = ({ show, onHide, orders, onUpdateStatus }) => {
  if (!show || !orders) return null;

  const handleStatusChange = (orderId, newStatus) => {
    onUpdateStatus(orderId, newStatus);
  };

  return (
    <>
      {show && <div className="modal-backdrop-blur" />}
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Список заказов</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Номер заказа</th>
                <th>Дата заказа</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    <select onChange={(e) => handleStatusChange(order.id, e.target.value)} value={order.status}>
                      <option value="В обработке">В обработке</option>
                      <option value="Обработан">Обработан</option>
                      <option value="На сборке">На сборке</option>
                      <option value="Собран">Собран</option>
                      <option value="Отправлен">Отправлен</option>
                      <option value="Доставлен">Доставлен</option>
                      <option value="Отменён">Отменён</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrdersListModal;
