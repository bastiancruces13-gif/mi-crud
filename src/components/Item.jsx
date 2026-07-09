import React from 'react';

function Item({ item, deleteItem, editItem }) {
  return (
    <li className="item-row">
      <span className="item-text">{item.value}</span>
      <div className="item-actions">
        <button className="btn-action btn-edit" onClick={() => editItem(item)}>
          Editar
        </button>
        <button className="btn-action btn-delete" onClick={() => deleteItem(item.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;
