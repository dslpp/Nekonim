import { observer } from 'mobx-react-lite';
import {React, useContext }from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '../index';


const TypeBar = observer(() => {
    const {type} =useContext (Context)
        return (
            <ListGroup>
                {type.types.map(types=>
                    <ListGroup.Item 
                    active={types.id === type.selectedType.id}
                    onClick={()=> type.setSelectedType(types)}
                        key={types.id}
                    >
                        {types.name}
                    </ListGroup.Item>)}
          </ListGroup>  
        );
    
})

export default TypeBar;
