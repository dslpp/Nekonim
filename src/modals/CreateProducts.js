import React, { useContext, useState } from 'react';
import { Form, Modal, Button, Dropdown, Row, Col} from 'react-bootstrap';
import { Context } from "../index";
import { observer } from 'mobx-react-lite';
import { createProducts } from '../http/products';

const CreateProducts = observer( ({show, onHide}) => {
  const { type } = useContext(Context);
  const [selectedType, setSelectedType] = useState(null);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState('');
  const [shortdescription, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  
  const changeInfo = (key, value, number) => {
    setInfo(info.map(index=> index.number===number ? {...index, [key]:value} : index))
  };

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (numberToRemove) => {
    setInfo(info.filter(index=> index.number !== numberToRemove));
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
  };

  const addProducts = () => {
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
        alert("Товар успешно добавлен");
      })
      .catch(error => {
        alert("Ошибка при добавлении товара:", error);
       
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
            onChange={e=> setName(e.target.value)}
            className='mt-3'
            placeholder='Введите название товара'
          />
          <Form.Control
            value={shortdescription}
            onChange={e=> setDescription(e.target.value)}
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
          <hr/>
          <Button variant='outline-dark' onClick={addInfo}>
            Добавить новое свойство характеристики
          </Button>
          {info.map((index) =>
            <Row key={index.number} className="mt-4" >
              <Col md={4}>
                <Form.Control
                  value={index.title}
                  onChange={(e)=>changeInfo('title', e.target.value, index.number)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={index.description}
                  onChange={(e)=>changeInfo('description', e.target.value, index.number)}              
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={()=> removeInfo(index.number)}
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
    </Modal>
  );
});

export default CreateProducts;
