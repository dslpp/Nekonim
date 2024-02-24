import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container"
import {Col, Row} from "react-bootstrap"
import TypeBar from "../components/TypeBar/TypeBar";
import GoodsList from "../components/GoodsList";
import { observer } from "mobx-react-lite";
import { fetchProducts, fetchTypes } from "../http/products";
import { Context } from "..";

const Catalog = observer(() => {
    const{type}=useContext(Context)
     useEffect(()=>{
       fetchTypes().then(data=>type.setTypess(data)) 
       fetchProducts().then(data=>type.setProducts(data.rows)) 
     })
    return(
        <Container>
            <Row className="mt-5">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <GoodsList/>
                </Col>
            </Row>
        </Container>
        
    );
})
export default Catalog;
