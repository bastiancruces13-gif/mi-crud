import React from 'react';

// Añadimos 'toggleComplete' a las props recibidas
function Item({ item, deleteItem, editItem, toggleComplete }) {
  return (
    <li className="item-row">
      {/* Al hacer clic en el texto se activa el toggle y se aplica el tachado condicional */}
      <span 
        className="item-text" 
        onClick={() => toggleComplete(item.id)}
        style={{ 
          cursor: 'pointer', 
          textDecoration: item.completed ? 'line-through' : 'none', // Se tacha si está completado
          opacity: item.completed ? 0.5 : 1 // Se vuelve un poco opaco si está listo
        }}
      >
        {item.value}
      </span>
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