import React, { useState } from 'react';
import NavbarAdmins from '../comunAdmins/NavbarAdmins';
import CategoriaItem from '../comunAdmins/CategoriaItem'; 
import ModalCat from '../comunAdmins/ModalCategoria';

export default function CategoriaMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal =() => {
    setIsModalOpen(true);
  };
  const handleCloseModal =() => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-300">
      
      <NavbarAdmins />

      {/* Main Content */}
      <div className="flex-1 bg-white ">
        
        {/* Search Bar */}
        <div className="flex items-center bg-cyan-700 p-4 mb-6  mt-14 justify-center w-full ">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-1/2 p-2 rounded-md outline-none"
            style={{ minWidth: '200px' }} 
          />
          <div className="ml-4 ">
            <button className="p-2 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold"
            onClick={handleOpenModal}> Agregar
            </button>
          </div>
        </div>

        {/* Categoria Lista */}
        <div className=" space-y-4 p-6 flex flex-col items-center">
          {[...Array(5)].map((_, index) => (
            <CategoriaItem key={index} /> 
          ))}

          <ModalCat isOpen={isModalOpen} onClose={handleCloseModal} title="Agregar Categoria">

        </ModalCat>
        </div>
      </div>
    </div>
  );
}
