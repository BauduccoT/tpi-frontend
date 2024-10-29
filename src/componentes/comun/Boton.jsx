import React, { useEffect, useState } from 'react';

export default function Boton (props) {
  // Estado para determinar si el botón ha sido clickeado
  const [click, setClick] = useState();

  useEffect(()=>{
    
  })

  // Función para manejar el clic en el botón

  const ButtonClick = () => {
    setClick(!click); // Alterna el estado
  };

  return (
    <div className='bg-orange-500 text-white p-3 sm:py-1 sm:px:2 md:py-3 md:px-4 rounded-md text-md hover:bg-orange-600 '>
      <button onClick={ButtonClick}>
        {props.texto}
      </button>
      
    </div>
  );
};


