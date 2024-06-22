import React, { useState, useEffect, useContext } from 'react';
import { Form, Modal, Button, Dropdown, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { fetchOneProducts, updateProducts, fetchInfo, fetchTypes, createInfo, updateInfo, deleteInfo } from '../http/products';
import { Context } from "../index";

const ChangeProducts = ({ show, onHide }) => {
  const { id } = useParams();
  const [selectedType, setSelectedType] = useState(null);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState('');
  const [shortdescription, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const { type } = useContext(Context);

  useEffect(() => {
    fetchTypes().then(data => type.setTypess(data));
  }, []);

  useEffect(() => {
    if (id) {
      fetchOneProducts(id)
        .then(data => {
          setName(data.name);
          setDescription(data.shortdescription);
          setPrice(data.price.toString());
          setSelectedType(data.type);
          loadProductInfo(id);
        })
        .catch(error => {
          console.error("Ошибка при загрузке данных о товаре:", error);
        });
    }
  }, [id]);

  const loadProductInfo = async (productId) => {
    try {
      const data = await fetchInfo(productId);
      setInfo(data || []);
    } catch (error) {
      console.error("Ошибка при загрузке характеристик товара:", error);
    }
  };

  const updateProduct = async () => {
    try {
      const formattedPrice = parseFloat(price).toFixed(2);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('shortdescription', shortdescription);
      formData.append('price', formattedPrice);
      if (file) {
        formData.append('img', file);
      }
      if (selectedType) {
        formData.append('typeId', selectedType.id);
      }
      formData.append('info', JSON.stringify(info));

      await updateProducts(id, formData);

      alert("Данные обновлены!");
      onHide();
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

  const selectFile = e => {
    const file = e.target.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];

    if (file && allowedTypes.includes(file.type)) {
      setFile(file);
    } else {
      alert('Пожалуйста, выберите изображение (PNG, JPEG или GIF).');
      e.target.value = null;
    }
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.id === number ? { ...i, [key]: value } : i));
  };

  const addInfo = async () => {
    try {
      const newInfo = { title: '', description: '', productId: id };
      const response = await createInfo(newInfo);
      setInfo([...info, { ...response, id: response.id }]);
    } catch (error) {
      console.error('Ошибка при добавлении характеристики:', error);
    }
  };

  const removeInfo = async (number) => {
    try {
      await deleteInfo(number);
      setInfo(info.filter(i => i.id !== number));
    } catch (error) {
      console.error('Ошибка при удалении характеристики:', error);
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
          Редактировать товар
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
            <Row key={index.id} className="mt-4" >
              <Col md={4}>
                <Form.Control
                  value={index.title}
                  onChange={(e) => changeInfo('title', e.target.value, index.id)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={index.description}
                  onChange={(e) => changeInfo('description', e.target.value, index.id)}
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(index.id)}
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
        <Button variant="outline-success" onClick={updateProduct}>Сохранить изменения</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeProducts;