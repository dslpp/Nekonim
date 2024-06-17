import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../index";
import { Pagination } from "react-bootstrap";
import './Pages.css'; 
const Pages = observer( () => {
    const {type}=useContext(Context)
    const pageCount=Math.ceil(type.totalCounti/ type.limit)
    const pages= []
    for (let i =0; i<pageCount;i++){
        pages.push(i+1)
    }
    return (
   <Pagination className="mt-5">
    {pages.map(page=>
        <Pagination.Item
            key={page}
            active={type.page===page}
            onClick={()=> type.setPage(page)}
        >
            {page}
        </Pagination.Item>)}
   </Pagination>  
    );
  });
  
  export default Pages;
  