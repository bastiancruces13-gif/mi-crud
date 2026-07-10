import React from 'react';
import Item from './Item';

// Añadimos 'toggleComplete' a las props que recibe la lista
function List({ items, deleteItem, editItem, toggleComplete }) {
  return (
    <ul className="items-list">
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
          toggleComplete={toggleComplete} // Se la pasamos a cada Item de la lista
        />
      ))}
    </ul>
  );
}

export default List;