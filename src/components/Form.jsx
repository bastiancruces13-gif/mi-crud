import React, { useState, useEffect } from 'react';

// Cambiamos la prop recibida a 'onAdd' para que coincida con App.jsx
function Form({ onAdd, itemToEdit }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setInputValue(itemToEdit.value);
    } else {
      setInputValue('');
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Le pasamos el valor directamente a App.jsx. 
    // Quitamos el 'if' interno para que la función de App pueda lanzar el 'alert()' si está vacío.
    onAdd(inputValue); 
    
    // Si no se activó la alerta (es decir, el campo era válido), limpiamos el input
    if (inputValue.trim() !== "") {
      setInputValue('');
    }
  };

  return (
    <form className="crud-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="Ingrese un valor"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {/* Añadida la clase CSS requerida del Commit 1 */}
      <button type="submit" className="btn-submit">
        {itemToEdit ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
}

export default Form;