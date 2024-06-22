import React, { useState, useEffect, useContext } from "react";
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
    const [typeVisable, settypeVisable] = useState(false);
    const [productsVisable, setproductsVisable] = useState(false);
    const [dtypeVisable, setdtypeVisable] = useState(false);
    const [chntypeVisable, setchntypeVisable] = useState(false);
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

    return (
        <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant={'dark'} className="mt-4" onClick={() => settypeVisable(true)}>
                Добавить тип
            </Button>
            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant={'dark'} className="mt-2" onClick={() => setchntypeVisable(true)}>
                Изменить название типа
            </Button>
            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant={'dark'} className="mt-2" onClick={() => setdtypeVisable(true)}>
                Удалить тип
            </Button>

            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant={'dark'} className="mt-2" onClick={() => setproductsVisable(true)}>
                Добавить продукт
            </Button>
            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant={'dark'} className="mt-2" onClick={handleToggleOrdersModal}>
                Просмотреть заказы
            </Button>

            <CreateType show={typeVisable} onHide={() => settypeVisable(false)} />
            <CreateProducts show={productsVisable} onHide={() => setproductsVisable(false)} />
            <DeleteType show={dtypeVisable} onHide={() => setdtypeVisable(false)} />
            <ChangeType show={chntypeVisable} onHide={() => setchntypeVisable(false)} />
            <OrdersListModal show={showOrdersModal} onHide={handleToggleOrdersModal} orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
        </Container>
    );
};

export default AdminPanel;
