import React, { useContext } from 'react';
import { Form, Modal, Button, Dropdown} from 'react-bootstrap';
import { Context } from "../index";


const CreateProducts = ({show, onHide}) => {
  const{type}=useContext(Context)
  
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
