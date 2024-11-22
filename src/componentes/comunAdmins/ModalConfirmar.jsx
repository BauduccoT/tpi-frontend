import React from 'react';
import Alert from '../comun/Alert';
import axios from 'axios';

export default function ModalConfirmar({ isOpen, onClose, onConfirm, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full relative">
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl"
        >
          X
        </button>

        {/* Título del Modal */}
        <h2 className="text-lg font-bold mb-6 text-center">{title}</h2>

        {/* Mensaje de Confirmación */}
        <p className="text-center mb-6">¿Estás seguro de que deseas borrar este administrador?</p>

        {/* Botones de Confirmar y Cancelar */}
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="py-2 px-4 cursor-pointer active:bg-red-800 bg-red-500 text-white rounded-md"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 cursor-pointer active:bg-green-800 bg-green-500 text-white rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
