import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Form } from 'react-bootstrap';
import { Context } from '../index';
import { changeType } from '../http/products';

const ChangeType = ({ show, onHide }) => {
    const { type } = useContext(Context);
    const [selectedType, setSelectedType] = useState(null);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (!show) {
            setSelectedType(null);
        }
    }, [show]);

    const updateType = () => {
        if (!selectedType) {
            return; // Проверка на выбранный тип
        }

        changeType(selectedType.id, value) // Передаем идентификатор типа и новое значение названия
            .then(data => {
                setValue('');
                onHide();
                alert("Успешно изменено");
            })
            .catch(error => {
                console.error("Ошибка при обновлении типа:", error);
                // Обработка ошибки, например, отображение сообщения об ошибке
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
                    Изменить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle>{selectedType ? selectedType.name : 'Выберите тип'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {type.types.map(type => (
                            <Dropdown.Item key={type.id} onClick={() => setSelectedType(type)}>
                                {type.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Form>
                    <Form.Control
                        className='mt-3'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите новое название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-primary" onClick={updateType}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeType;
