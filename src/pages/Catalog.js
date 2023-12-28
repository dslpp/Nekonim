import React from "react";
import Container from "react-bootstrap/Container"
import {Col, Row} from "react-bootstrap"
import TypeBar from "../components/TypeBar/TypeBar";
import GoodsList from "../components/GoodsList";

const Catalog =() => {
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
}
export default Catalog;
