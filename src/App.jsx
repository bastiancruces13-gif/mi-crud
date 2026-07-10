import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  
  // NUEVO ESTADO: Para guardar lo que el usuario escribe en el buscador
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar desde LocalStorage al iniciar
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  // Guardar en LocalStorage automáticamente
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Agregar o Actualizar con Validación (Commit 2)
  const addOrUpdateItem = (value) => {
    if (!value || value.trim() === "") {
      alert("Por favor, ingresa un elemento válido. No se permiten campos vacíos.");
      return;
    }

    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value: value.trim() } : item));
      setItemToEdit(null);
    } else {
      // Agregamos la propiedad 'completed: false' por defecto a los nuevos items
      setItems([...items, { id: Date.now(), value: value.trim(), completed: false }]);
    }
  };

  // Eliminar con Confirmación (Commit 2)
  const deleteItem = (id) => {
    const seguro = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (seguro) {
      setItems(items.filter(item => item.id !== id));
      if (itemToEdit && itemToEdit.id === id) {
        setItemToEdit(null);
      }
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  // NUEVA FUNCIÓN: Marcar/Desmarcar como completado
  const toggleComplete = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // NUEVA FUNCIÓN: Borrar todos los elementos de una vez
  const clearAllItems = () => {
    const seguro = window.confirm("¿Estás seguro de que deseas BORRAR TODO? Esta acción no se puede deshacer.");
    if (seguro) {
      setItems([]);
      setItemToEdit(null);
    }
  };

  // FILTRADO EN TIEMPO REAL: Filtra los elementos según el buscador
  const filteredItems = items.filter(item =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card-container">
      <h1 className="main-title">Mi CRUD con React</h1>
      
      {/* REQUISITO: Buscador en tiempo real */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          className="form-input"
          placeholder="🔍 Buscar elemento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Form onAdd={addOrUpdateItem} itemToEdit={itemToEdit} />

      <div className="item-counter" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span><strong>Total:</strong> {filteredItems.length}</span>
        
        {/* REQUISITO: Botón para borrar todo (solo se muestra si hay elementos) */}
        {items.length > 0 && (
          <button 
            className="btn-action btn-delete" 
            onClick={clearAllItems}
            style={{ padding: '4px 10px', fontSize: '12px' }}
          >
            Borrar Todo
          </button>
        )}
      </div>

      {/* Le pasamos a la lista los elementos filtrados y la función para completarlos */}
      <List 
        items={filteredItems} 
        deleteItem={deleteItem} 
        editItem={editItem} 
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;