import { observer } from 'mobx-react-lite';
import {React, useContext }from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '../index';
import './../App.css';


const TypeBar = observer(() => {
    const {type} =useContext (Context)
        return (
            <ListGroup>
                {type.types.map(types=>
                    <ListGroup.Item 
                    style={{cursor:"pointer"}}
                    className={types.id === type.selectedType.id ? 'active-type' : ''}
                    onClick={()=> type.setSelectedType(types)}
                        key={types.id}
                    >
                        {types.name}
                    </ListGroup.Item>)}
          </ListGroup>  
        );
    
})

export default TypeBar;
