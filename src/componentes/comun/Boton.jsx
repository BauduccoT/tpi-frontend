import React, { useEffect, useState } from 'react';

export default function Boton ({click, texto}) {
  // Estado para determinar si el botón ha sido clickeado
  

  useEffect(()=>{
    
  })

  return (
    <div className='bg-orange-500 text-white p-3 sm:py-3 sm:px-4 rounded-md text-md hover:bg-orange-600 '>
      <button onClick={click}>
        {texto}
      </button>
      
    </div>
  );
};


