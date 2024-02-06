import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateType from "../modals/CreateType";
import CreateProducts from "../modals/CreateProducts";
import DeleteType from "../modals/DeleteType";


const AdminPanel = () => {
    const [typeVisable, settypeVisable] = useState(false)
    const [productsVisable, setproductsVisable] = useState(false)
    const [dtypeVisable, setdtypeVisable] = useState(false)
    return (
        <Container  style={{display:"flex", flexDirection:"column", alignItems:"center"}} >
            <Button style={{width:"70vw", fontSize:"1.15em"}} variant={'dark'} className="mt-5" onClick={() => settypeVisable(true)}>
                Добавить тип
            </Button>
            <Button style={{width:"70vw", fontSize:"1.15em"}} variant={'dark'} className="mt-2" onClick={() => setproductsVisable(true)}>
                Добавить продукт
            </Button>
            <Button style={{width:"70vw", fontSize:"1.15em"}} variant={'dark'} className="mt-2" onClick={() => setdtypeVisable(true)}>
                Удалить тип
            </Button>
            <CreateType show={typeVisable} onHide={() => settypeVisable(false)} />
            <CreateProducts show={productsVisable} onHide={() => setproductsVisable(false)} />
            <DeleteType show={dtypeVisable} onHide={() => setdtypeVisable(false)} />
        </Container>

    );
}
export default AdminPanel;
