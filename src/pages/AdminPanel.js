import React, { useState, useEffect, useContext} from "react";
import { Button, Container } from "react-bootstrap";
import CreateType from "../modals/CreateType";
import CreateProducts from "../modals/CreateProducts";
import DeleteType from "../modals/DeleteType";
import ChangeType from "../modals/ChangeType";
import OrdersListModal from "../modals/OrdersListModal";
import { fetchTypes, fetchProducts } from "../http/products"; // Импортируем функции
import { getAllOrders, updateOrderStatus } from "../http/userAPI"; // Импортируем функции
import { Context } from "../index";

const AdminPanel = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [productsVisible, setProductsVisible] = useState(false);
    const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
    const [changeTypeVisible, setChangeTypeVisible] = useState(false);
    const [showOrdersModal, setShowOrdersModal] = useState(false);
    const [orders, setOrders] = useState([]); // Состояние для заказов
    const { type } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => type.setTypess(data));
        fetchProducts().then(data => type.setProducts(data.rows));
    }, []);

    const handleToggleOrdersModal = async () => {
        if (!showOrdersModal) {
            const fetchedOrders = await getAllOrders(); // Получаем заказы при открытии модального окна
            setOrders(fetchedOrders);
        }
        setShowOrdersModal(!showOrdersModal); // Переключение состояния модального окна
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        await updateOrderStatus(orderId, newStatus); // Обновляем статус заказа
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders); // Обновляем состояние заказов
    };
    const handleOpenCreateTypeModal = async () => {
        await fetchTypes().then(data => type.setTypess(data)); // Получаем типы перед открытием модального окна
        setTypeVisible(true);
    };

    const handleOpenChangeTypeModal = async () => {
        await fetchTypes().then(data => type.setTypess(data)); // Получаем типы перед открытием модального окна
        setChangeTypeVisible(true);
    };

    const handleOpenDeleteTypeModal = async () => {
        await fetchTypes().then(data => type.setTypess(data)); // Получаем типы перед открытием модального окна
        setDeleteTypeVisible(true);
    };

    const handleOpenCreateProductsModal = async () => {
        await fetchTypes().then(data => type.setTypess(data)); // Получаем типы перед открытием модального окна
        setProductsVisible(true);
    };

    return (
        <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant="dark" className="mt-4" onClick={handleOpenCreateTypeModal}>
                Добавить тип
            </Button>
            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant="dark" className="mt-2" onClick={handleOpenChangeTypeModal}>
                Изменить название типа
            </Button>
            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant="dark" className="mt-2" onClick={handleOpenDeleteTypeModal}>
                Удалить тип
            </Button>

            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant="dark" className="mt-2" onClick={handleOpenCreateProductsModal}>
                Добавить продукт
            </Button>
            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant="dark" className="mt-2" onClick={handleToggleOrdersModal}>
                Просмотреть заказы
            </Button>

            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateProducts show={productsVisible} onHide={() => setProductsVisible(false)} />
            <DeleteType show={deleteTypeVisible} onHide={() => setDeleteTypeVisible(false)} />
            <ChangeType show={changeTypeVisible} onHide={() => setChangeTypeVisible(false)} />
            <OrdersListModal show={showOrdersModal} onHide={handleToggleOrdersModal} orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
        </Container>
    );
};

export default AdminPanel;
