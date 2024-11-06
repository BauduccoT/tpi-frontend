import React, { useEffect, useState } from 'react';

export default function Boton (props) {
  // Estado para determinar si el botón ha sido clickeado
  

  useEffect(()=>{
    
  })

  // Función para manejar el clic en el botón

  

  return (
    <div className='bg-orange-500 text-white p-3 sm:py-1 sm:px:2 md:py-3 md:px-4 rounded-md text-md hover:bg-orange-600 '>
      <button onClick={props.click}>
        {props.texto}
      </button>
      
    </div>
  );
};


