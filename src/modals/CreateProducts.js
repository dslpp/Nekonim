import React, { useContext, useState } from 'react';
import { Form, Modal, Button, Dropdown, Row, Col} from 'react-bootstrap';
import { Context } from "../index";


const CreateProducts = ({show, onHide}) => {
  const { type } = useContext(Context);
  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };
  const removeInfo = (numberToRemove) => {
    setInfo(info.filter(index=> index.number !== numberToRemove));
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
              <Dropdown.Toggle> Выберите тип</Dropdown.Toggle>
              <Dropdown.Menu> 
                  {type.types.map(types=>
                    <Dropdown.Item key={types.id}>{types.name}</Dropdown.Item>
                    )}
              </Dropdown.Menu>
           </Dropdown>
           <Form.Control
              className='mt-3'
              placeholder='Введите название товара'
           />
            <Form.Control
              className='mt-3'
              placeholder='Введите краткое описание товара (опицонально)'
      
           />
           <Form.Control
            className='mt-3'
            placeholder='Введите стоимость товара'
            type='number'
           />
           <Form.Control
              className='mt-3'
              type='file'
           />
          <hr/>
          <Button
            variant='outline-dark'
            onClick={addInfo}
          >
            Добавить новое свойство характеристики
          </Button>
          {info.map((index) =>
            <Row key={index.number} className="mt-4" >
              <Col md={4}>
                <Form.Control
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
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
          <Button variant="outline-success" onClick={onHide}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
};




export default CreateProducts;
