import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '../../index';
import { useTheme } from '../../ThemeContext';
import './TypeBar.css'; 

const TypeBar = observer(() => {
  const { isDarkMode } = useTheme();
  const { type } = useContext(Context);

  return (
    <ListGroup>
      {type.types.map((types) => (
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          className={`${
            isDarkMode ? 'regular-type-dark-mode' : 'regular-type'
          } ${types.id === type.selectedType.id ? (isDarkMode ? 'active-type-dark-mode' : 'active-type') : ''}`}
          onClick={() => type.setSelectedType(types)}
          key={types.id}
        >
          {types.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
