import React, { useContext, useState } from 'react';
import { Form, Modal, Button, Dropdown, Row, Col, Alert } from 'react-bootstrap';
import { Context } from "../index";
import { observer } from 'mobx-react-lite';
import { createProducts } from '../http/products';

const CreateProducts = observer(({ show, onHide }) => {
  const { type } = useContext(Context);
  const [selectedType, setSelectedType] = useState(null);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState('');
  const [shortdescription, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const [notification, setNotification] = useState(null);
  const [hideErrorTimeout, setHideErrorTimeout] = useState(null); // Состояние для таймаута скрытия ошибки

  const changeInfo = (key, value, number) => {
    setInfo(info.map(index => index.number === number ? { ...index, [key]: value } : index))
  };

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (numberToRemove) => {
    setInfo(info.filter(index => index.number !== numberToRemove));
  };

  const selectFile = e => {
    setFile(e.target.files[0]);
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

  const handleClose = () => {
    setName('');
    setDescription('');
    setPrice('');
    setFile(null);
    setSelectedType(null);
    setInfo([]);
    setErrorNotification(null);
    clearTimeout(hideErrorTimeout); // Очищаем таймаут перед закрытием модального окна
  };

  const validateForm = () => {
    if (!selectedType || !name || !price || !file) {
      setErrorNotification("Пожалуйста, заполните все обязательные поля.");
      const timeout = setTimeout(() => {
        setErrorNotification(null);
      }, 3000);

      setHideErrorTimeout(timeout); // Сохраняем ID таймаута в состоянии
      return false;
    }
    return true;
  };

  const addProducts = () => {
    if (!validateForm()) {
      return;
    }

    const formattedPrice = parseFloat(price).toFixed(2);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('shortdescription', shortdescription);
    formData.append('price', formattedPrice);
    formData.append('img', file);
    formData.append('typeId', selectedType.id);
    formData.append('info', JSON.stringify(info));

    createProducts(formData)
      .then(data => {
        onHide();
        setName('');
        setDescription('');
        setPrice('');
        setFile(null);
        setSelectedType(null);
        setInfo([]);
        setNotification("Товар успешно добавлен");
        setErrorNotification(null);
        clearTimeout(hideErrorTimeout); 
        
      })
      .catch(error => {
        setErrorNotification("Ошибка при добавлении товара: " + error.message);
        const timeout = setTimeout(() => {
          setErrorNotification(null);
        }, 3000);

        setHideErrorTimeout(timeout); // Сохраняем ID таймаута в состоянии
      });
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
          Добавить товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>
              {selectedType ? selectedType.name : 'Выберите тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {type.types.map(type => (
                <Dropdown.Item key={type.id} onClick={() => setSelectedType(type)}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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
          <Form.Control
            className='mt-3'
            type='file'
            onChange={selectFile}
          />
          <hr />
          <Button variant='outline-dark' onClick={addInfo}>
            Добавить новое свойство характеристики
          </Button>
          {info.map((index) =>
            <Row key={index.number} className="mt-4" >
              <Col md={4}>
                <Form.Control
                  value={index.title}
                  onChange={(e) => changeInfo('title', e.target.value, index.number)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={index.description}
                  onChange={(e) => changeInfo('description', e.target.value, index.number)}
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(index.number)}
                  variant={"outline-danger"}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addProducts}>Добавить</Button>
      </Modal.Footer>
      {notification &&
        <div style={{ position: 'fixed', top: 50, right: 10, zIndex: 9999 }}>
          <Alert variant="success">
            {notification}
          </Alert>
        </div>
      }
      {errorNotification &&
        <div style={{ position: 'fixed', top: 10, right: 1, zIndex: 9999 }}>
          <Alert variant="danger">
            {errorNotification}
          </Alert>
        </div>
      }
    </Modal>
  );
});

export default CreateProducts;
