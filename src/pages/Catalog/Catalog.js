import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import TypeBar from "../../components/TypeBar/TypeBar";
import GoodsList from "../../components/GoodsList";
import Pages from "../../components/Pages";
import { observer } from "mobx-react-lite";
import { fetchProducts, fetchTypes, searchProducts } from "../../http/products";
import { Context } from "../..";
import './Catalog.css'; 

const Catalog = observer(() => {
    const { type } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResultMessage, setSearchResultMessage] = useState("");
    const [sortByPrice, setSortByPrice] = useState(""); // установка значения по умолчанию в пустую строку

    useEffect(() => {
        fetchTypes().then(data => type.setTypess(data));
    }, []);
  
    useEffect(() => {
        fetchProducts(type.selectedType.id, type.page, 12, sortByPrice).then(data => {
            type.setProducts(data.rows);
            type.setTotalCounti(data.count);
        });
    }, [type.page, type.selectedType, type.selectedBrand, sortByPrice]);

    useEffect(() => {
        setSearchResultMessage("");
    }, [type.selectedType]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            const data = await searchProducts(searchQuery, sortByPrice);
            if (data.message) {
                setSearchResultMessage(data.message);
                type.setProducts([]); 
            } else {
                type.setProducts(data);
                setSearchResultMessage(""); 
            }
            setSearchQuery(""); // Очистка поля поиска после выполнения поиска
        }
    };

    const handleSortByPrice = async (sortByPrice) => {
        setSortByPrice(sortByPrice);
    };

    return (
        <Container className="container">
            <Row className="mt-4">
                <Row className="mb-3">
                    <Col md={7}>
                        <select value={sortByPrice} onChange={(e) => handleSortByPrice(e.target.value)}>
                            <option value="">Сортировать по цене</option>
                            <option value="asc">Дешевле</option>
                            <option value="desc">Дороже</option>
                        </select>
                    </Col>
                    <Col md={5}>
                        <form className="ctlgform" onSubmit={handleSearch}>
                            <input
                                type="text"
                                className="search"
                                placeholder="Найди товар мечты!"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <input type="submit" name="submit" className="submit" value="Поиск" />
                        </form>
                    </Col>
                </Row>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    {searchResultMessage && <p>{searchResultMessage}</p>}
                    <GoodsList/>
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Catalog;