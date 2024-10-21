import React, { useEffect, useState } from 'react';

export default function Boton () {
  // Estado para determinar si el botón ha sido clickeado
  const [click, setClick] = useState();

  useEffect(()=>{
    
  })

  // Función para manejar el clic en el botón

  const ButtonClick = () => {
    setClick(!click); // Alterna el estado
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={ButtonClick}>
        {click ? 'Botón clickeado' : 'Haz clic aquí'}
      </button>
      <p>Estado del botón: {click ? 'Activado' : 'Desactivado'}</p>
    </div>
  );
};


