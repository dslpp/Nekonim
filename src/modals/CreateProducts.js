import React from 'react';
import { Form, Modal, Button} from 'react-bootstrap';



const CreateProducts = ({show, onHide}) => {
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
            Добавить новый тип
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
            <Form.Control
            placeholder={"Введите название типа"}
            />
         </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
          <Button variant="outline-succes" onClick={onHide}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
};




export default CreateProducts;
