import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import { Context } from '../index';
import { deleteType } from '../http/products'; 

const DeleteType = ({ show, onHide }) => { 
    const { type } = useContext(Context);
    const [selectedType, setSelectedType] = useState(null); // Создаем состояние для отслеживания выбранного типа

    useEffect(() => {
        if (!show) {
            setSelectedType(null);
        }
    }, [show]);

    const handleDelete = () => {
        
        if (selectedType) {
            deleteType(selectedType.id).then(() => {
                onHide();
                alert("Успешно удалено");
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
        </Modal>
    );
};

export default DeleteType;
