import React from 'react';
import iconoPersona from '../../assets/person.svg';

export default function AdminsItem() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 hover:bg-gray-300 p-4 rounded-md shadow-md font-Arial w-3/4">
      <div className="flex items-center flex-1 text-gray-600 mb-2 md:mb-0">
        <img src={iconoPersona} alt="Icono de usuario" className="h-8 w-8 mr-8" /> 
        <span className="font-bold">Usuario...</span>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 font-bold bg-cyan-700 text-white rounded active:bg-cyan-800">MODIFICAR</button>
        <button className="px-4 py-2 font-bold bg-orange-500 text-white rounded active:bg-orange-600">DESACTIVAR</button>
      </div>
    </div>
  );
}
