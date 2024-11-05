import React from 'react';
export default function ModalCat  ({ isOpen, onClose, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full relative">
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl"
        >
          x
        </button>

        {/* Título del Modal */} 
        <h2 className="text-lg font-bold mb-6 text-center">{title}</h2>
        
        {/* Campos de Usuario y Contraseña */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre Cat..."
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
        </div>

        {/* Botón Crear */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-cyan-600 text-white rounded-md active:bg-cyan-800"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

