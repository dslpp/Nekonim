import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '../../index';
import { useTheme } from '../../ThemeContext';
import './TypeBar.css'; 

const TypeBar = observer(() => {
  const { isDarkMode } = useTheme();
  const { type } = useContext(Context);
  const [showAllHighlighted, setShowAllHighlighted] = useState(false); 

  const handleShowAllTypes = () => {
    type.setShowAllTypes(true); 
    setShowAllHighlighted(true);
    type.setSelectedType({}); // Сброс выбранного типа при нажатии на "Показать все типы"
  };

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ cursor: 'pointer' }}
        onClick={handleShowAllTypes}
        className={`${
          isDarkMode ? 'regular-type-dark-mode' : 'regular-type'
        } ${showAllHighlighted ? 'active-type' : ''}`}
      >
        Показать все типы
      </ListGroup.Item>
      {type.types.map((types) => (
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          className={`${
            isDarkMode ? 'regular-type-dark-mode' : 'regular-type'
          } ${types.id === type.selectedType.id && !showAllHighlighted ? (isDarkMode ? 'active-type-dark-mode' : 'active-type') : ''}`}
          onClick={() => {
            type.setSelectedType(types);
            setShowAllHighlighted(false);
          }}
          key={types.id}
        >
          {types.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
