import React, { useState, useEffect, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import CreateType from "../modals/CreateType";
import CreateProducts from "../modals/CreateProducts";
import DeleteType from "../modals/DeleteType";
import ChangeType from "../modals/ChangeType";
import { fetchTypes, fetchProducts } from "../http/products";
import { Context } from "../index";

const AdminPanel = () => {
    const [typeVisable, settypeVisable] = useState(false);
    const [productsVisable, setproductsVisable] = useState(false);
    const [dtypeVisable, setdtypeVisable] = useState(false);
    const [chntypeVisable, setchntypeVisable] = useState(false);
    const{type}=useContext(Context)
    useEffect(()=>{
      fetchTypes().then(data=>type.setTypess(data)) 
      fetchProducts().then(data=>type.setProducts(data.rows)) 

    })
    return (
        <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button style={{ width: "70vw", fontSize: "1.15em" }} variant={'dark'} className="mt-5" onClick={() => settypeVisable(true)}>
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
            <CreateType show={typeVisable} onHide={() => settypeVisable(false)}/>
            <CreateProducts show={productsVisable} onHide={() => setproductsVisable(false)}/>
            <DeleteType show={dtypeVisable} onHide={() => setdtypeVisable(false)}/>
            <ChangeType show={chntypeVisable} onHide={() => setchntypeVisable(false)}/>
        </Container>
    );
};
export default AdminPanel;
