import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import TypeBar from "../../components/TypeBar/TypeBar";
import GoodsList from "../../components/GoodsList";
import Pages from "../../components/Pages/Pages";
import { observer } from "mobx-react-lite";
import { fetchProducts, fetchTypes, searchProducts } from "../../http/products";
import { Context } from "../..";
import './Catalog.css'; 
import { useTheme } from '../../ThemeContext';
import Footer from '../../components/Footer/Footer';

const Catalog = observer(() => {
    const { type } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResultMessage, setSearchResultMessage] = useState("");
    const [sortByPrice, setSortByPrice] = useState("");
    const { isDarkMode} = useTheme();

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
            setSearchQuery(""); 
        }
    };

    const handleSortByPrice = async (sortByPrice) => {
        setSortByPrice(sortByPrice);
    };

    return (
        <div>
        <Container  className={`container ${isDarkMode ? 'container-dark-mode' : ''}`}>
            <Row className="mt-4">
                <Row className="mb-3">
                    <Col md={7}>
                        <div className="sort-dropdown">
                            <span className="sort-label">Сортировка цен</span>
                            
                            <select className="custom-select" value={sortByPrice} onChange={(e) => handleSortByPrice(e.target.value)}>
                                <option value="">По умолчанию</option>
                                <option value="asc">Дешевле</option>
                                <option value="desc">Дороже</option>
                            </select>
                        </div>
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
        <br/>
        <Footer/>
        </div>
    );
});

export default Catalog;
