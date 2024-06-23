import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Alert} from 'react-bootstrap';
import { Context } from '../index';
import { deleteType} from '../http/products'; 

const DeleteType = ({ show, onHide }) => { 
    const { type } = useContext(Context);
    const [selectedType, setSelectedType] = useState(null);
    const [notification, setNotification] = useState(null);
    useEffect(() => {
        if (!show) {
            setSelectedType(null);
        }
    }, [show]);
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleDelete = () => {
        
        if (selectedType) {
            deleteType(selectedType.id).then(() => {
                setNotification("Успешно удалено");
                setTimeout(() => {
                    setNotification(null);
                    onHide(); 
                }, 2000); 
               
            }).catch(error => {
                console.error('Ошибка удаления типа:', error);
            });
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
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle onKeyDown={(e) => {
                     if (e.key === 'Enter') 
                    {
                        handleDelete();
                    }
    }}>{selectedType ? selectedType.name : 'Выберите тип'}</Dropdown.Toggle> {/* Отображаем выбранный тип */}
                    <Dropdown.Menu>
                        {type.types.map(type => (
                            <Dropdown.Item key={type.id} onClick={() => setSelectedType(type)}>
                                {type.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={handleDelete}>Удалить</Button>
            </Modal.Footer>
            {notification &&
        <div style={{ position: 'fixed', top: 50, right: 10, zIndex: 9999 }}>
          <Alert variant="success">
            {notification}
          </Alert>
        </div>
      }
        </Modal>
    );
};

export default DeleteType;
