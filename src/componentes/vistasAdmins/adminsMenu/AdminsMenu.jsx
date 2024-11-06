import React, { useState } from 'react';
// import NavbarAdmins from '../comunAdmins/NavbarAdmins';
import AdminsItem from '../../comunAdmins/Adminsitem';
import iconoPersona from '../../../assets/person.svg';
import ModalAdmin from '../../comunAdmins/ModalAdmin';

export default function AdminsMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal =() => {
    setIsModalOpen(true);
  };
  const handleCloseModal =() => {
    setIsModalOpen(false);
  };

  return (

    <div className='w-screen flex justify-end'>
    <div className="flex h-screen w-full  bg-gray-300">
      {/* <NavbarAdmins /> */}



      <div className="flex-1  bg-white">
        {/* Buscador*/}
        <div className="flex items-center mt-14 bg-cyan-700 p-4 mb-6 justify-center w-full">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-1/2 p-2 rounded-md outline-none"
            style={{ minWidth: '200px' }}
          />
          <div className="ml-4">
            <button
              className="p-2 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold"
              onClick={handleOpenModal}
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Lista de Administradores */}
        <div className="space-y-4 p-6 flex flex-col items-center ">
          {[...Array(4)].map((_, index) => (
            <AdminsItem key={index} />
          ))}
        </div>


        {/* Modal para Agregar */}
        <ModalAdmin isOpen={isModalOpen} onClose={handleCloseModal} title="Agregar Administrador">
        <img src={iconoPersona} alt="Icono de usuario" className="h-8 w-8 mr-8" /> 
        </ModalAdmin>
      </div>
    </div>
  </div>
  );
}
