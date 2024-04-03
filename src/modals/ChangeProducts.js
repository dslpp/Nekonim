import React, { useContext, useState, useEffect } from 'react';
import { Form, Modal, Button, Dropdown, Row, Col } from 'react-bootstrap';
import { Context } from "../index";
import { observer } from 'mobx-react-lite';
import { useParams } from "react-router-dom";
import { fetchOneProducts, updateProducts } from '../http/products';

const ChangeProducts = observer(({ show, onHide}) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [shortdescription, setDescription] = useState('');
  const [price, setPrice] = useState('');


  useEffect(() => {

    if (id) {
      fetchOneProducts(id)
        .then(data => {
          setName(data.name);
          setDescription(data.shortdescription);
          setPrice(data.price);

        })
        .catch(error => {
          console.error("Ошибка при загрузке данных о товаре:", error);
        });
    }
  }, [id]);


  const updateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('shortdescription', shortdescription);
      formData.append('price', price);

      await updateProducts(id, formData); // Отправляем запрос на обновление товара
      alert("Данные обновлены!")
     
      onHide(); 
      window.location.reload();// Закрываем модальное окно после успешного обновления
    } catch (error) {
      console.error('Ошибка при обновлении товара:', error);
    }
  };
  const handlePriceChange = e => {
    let inputPrice = e.target.value.replace(/[^0-9.,]/g, '');
    if (inputPrice.includes(',')) {
      inputPrice = inputPrice.replace('.', '');
    }
    if (inputPrice.includes('.')) {
      inputPrice = inputPrice.replace(',', '');
    }
    const dotCount = inputPrice.split('.').length - 1;
    const commaCount = inputPrice.split(',').length - 1;
    if (dotCount > 1 || commaCount > 1) {
      inputPrice = inputPrice.slice(0, -1);
    }
    const formattedPrice = inputPrice.startsWith('-') ? '' : inputPrice;
    setPrice(formattedPrice);
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
          Редактировать товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
       
          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            className='mt-3'
            placeholder='Введите название товара'
          />
          <Form.Control
            value={shortdescription}
            onChange={e => setDescription(e.target.value)}
            className='mt-3'
            placeholder='Введите краткое описание товара (опционально)'
          />
          <Form.Control
            value={price}
            onChange={handlePriceChange}
            className='mt-3'
            placeholder='Введите стоимость товара'
            type='text'
          />
        

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={updateProduct}>Сохранить изменения</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeProducts;
