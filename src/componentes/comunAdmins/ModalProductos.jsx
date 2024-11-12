import React from 'react';
export default function ModalProd  ({ isOpen, onClose, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full relative">
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl hover:bg-slate-300 rounded-md"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

        </button>

        {/* Título del Modal */} 
        <h2 className="text-lg font-bold mb-6 text-center">{title}</h2>
        
        {/* Campos de Usuario y Contraseña */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre Producto"
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="text"
            placeholder="Precio Unidad"
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="text"
            placeholder="Stock"
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="text"
            placeholder="Descripcion"
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="file"
            className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
            file:cursor-pointer
            cursor-pointer
            file:transition-all file:duration-150
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-cyan-600 file:text-white
            hover:file:bg-cyan-500'
            placeholder='seleccionar imagen'
            />
        </div>

        {/* Botón Crear */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-cyan-600 font-medium hover:file:bg-cyan-500 transition-all duration-150' text-white rounded-md active:bg-cyan-800"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

