import React, { useContext } from 'react';
import { Form, Modal, Button, Dropdown} from 'react-bootstrap';
import { Context } from "../index";



const DeleteType = ({show, onHide}) => {
    const { type } = useContext(Context);      
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
           Удалить тип
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
         </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
          <Button variant="outline-danger" onClick={onHide}>Удалить</Button>
        </Modal.Footer>
      </Modal>
    );
};




export default DeleteType;
