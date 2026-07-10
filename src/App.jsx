import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  // Cargar desde LocalStorage al iniciar
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  // Guardar en LocalStorage automáticamente cuando cambien los elementos
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // REQUISITO 1: Agregar o Actualizar con Validación
  const addOrUpdateItem = (value) => {
    // Validación: evita campos vacíos o con puros espacios [cite: 29]
    if (!value || value.trim() === "") {
      alert("Por favor, ingresa un elemento válido. No se permiten campos vacíos.");
      return; // Detiene la ejecución y no agrega nada [cite: 29]
    }

    if (itemToEdit) {
      // Modificar elemento existente
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value: value.trim() } : item));
      setItemToEdit(null);
    } else {
      // Agregar nuevo elemento
      setItems([...items, { id: Date.now(), value: value.trim() }]);
    }
  };

  // REQUISITO 3: Eliminar con Confirmación [cite: 31]
  const deleteItem = (id) => {
    // Alerta nativa de confirmación antes de borrar [cite: 31]
    const seguro = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    
    if (seguro) {
      setItems(items.filter(item => item.id !== id));
      
      // Si se elimina el elemento que se estaba editando, cancela la edición
      if (itemToEdit && itemToEdit.id === id) {
        setItemToEdit(null);
      }
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  return (
    <div className="card-container">
      <h1 className="main-title">Mi CRUD con React</h1>
      
      {/* Pasamos la función unificada y el estado de edición al Form */}
      <Form onAdd={addOrUpdateItem} itemToEdit={itemToEdit} />

      {/* REQUISITO 2: Contador de elementos [cite: 30] */}
      <div className="item-counter">
        <strong>Total:</strong> {items ? items.length : 0}
      </div>

      <List 
        items={items} 
        deleteItem={deleteItem} 
        editItem={editItem} 
      />
    </div>
  );
}

export default App;