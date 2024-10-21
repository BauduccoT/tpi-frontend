import React, { useState } from 'react';

const InputComponent = () => {
  // Estado para almacenar el valor del input
  const [inputValue, setInputValue] = useState('');

  // Función para manejar el cambio del input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Introduce tu texto:</h2>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        placeholder="Escribe algo..." 
      />
      <p>Valor actual: {inputValue}</p>
    </div>
  );
};

export default InputComponent;
