import React, { useState } from 'react';
import ModalCat from './ModalCategoria';

export default function CategoriaItem() {

  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal =() => {
        setIsModalOpen(true);
    };
    const handleCloseModal =() => {
        setIsModalOpen(false);
    };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 hover:bg-gray-300 p-4 rounded-md shadow-md font-Arial w-3/4">
      <div className="flex-1 text-gray-600 mb-2 md:mb-0">
        <span className="font-bold">Nombre Categoría</span>
        <span className="ml-4">N° de Categoría</span>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-cyan-700 text-white rounded active:bg-cyan-800 font-bold" onClick={handleOpenModal} >MODIFICAR</button>
        <button className="px-4 py-2 bg-orange-500 text-white rounded active:bg-orange-600 font-bold">DESACTIVAR</button>
      </div>

      <ModalCat isOpen={isModalOpen} onClose={handleCloseModal} title="Modificar categoría">

        </ModalCat>
    </div>
  );
}
