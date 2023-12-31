import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateType from "../modals/CreateType";
import CreateProducts from "../modals/CreateProducts";

const AdminPanel = () => {
    const [typeVisable, settypeVisable] = useState(false)
    const [productsVisable, setproductsVisable] = useState(false)
    return (
        <Container className="d-flex flex-column" >
            <Button variant={'outline-dark'} className="mt-5" onClick={() => settypeVisable(true)}>
                Добавить тип
            </Button>
            <Button variant={'outline-dark'} className="mt-2" onClick={() => setproductsVisable(true)}>
                Добавить продукт
            </Button>
            <CreateType show={typeVisable} onHide={() => settypeVisable(false)} />
            <CreateProducts show={productsVisable} onHide={() => setproductsVisable(false)} />
        </Container>

    );
}
export default AdminPanel;
