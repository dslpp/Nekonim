import React from "react";
import {  useNavigate} from 'react-router-dom';
import { CATALOG_Route } from "../utils/const";
import { Button } from "react-bootstrap";


const ButtonCatalog= () => {
const history =useNavigate()
    return (
        <Button   variant='dark'  onClick={()=> history(CATALOG_Route)}>Перейти в каталог</Button>
    );
}

export default ButtonCatalog;
