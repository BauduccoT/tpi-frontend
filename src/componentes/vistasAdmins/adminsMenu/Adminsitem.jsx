import React, { useState } from 'react';
import iconoPersona from '../../../assets/person.svg';
import ModalConfirmar from '../../comunAdmins/ModalConfirmar';
import axios from 'axios';

export default function AdminsItem({ admin, modalEditar }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const handleOpenModal = (adminId) => {
    setAdminToDelete(adminId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAdminToDelete(null);
  };

  const handleConfirmDelete = () => {
    eliminarAdmin(adminToDelete);
    handleCloseModal();
  };

  function eliminarAdmin(adminId) {
    const url = `http://localhost:3000/api/usuarios-admin/${adminId}`;
    const token = sessionStorage.getItem("token");

    const config = {
      headers: {
        authorization: token
      }
    };

    axios.delete(url, config)
      .then((resp) => {
        console.log(resp.data);

        if (resp.data.status === "error") {
          alert("Error: " + resp.data.error);
        } else {
          setAdmins(admins.filter(admin => admin.id !== adminId));
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error: " + (error.response ? error.response.data.error : 'Error de red'));
      });
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 hover:bg-gray-300 p-4 rounded-md shadow-md font-Arial w-1/2">
      <div className="flex items-center flex-1 text-gray-600 mb-2 md:mb-0">
        <img src={iconoPersona} alt="Icono de usuario" className="h-8 w-8 mr-8" />
        <span className="font-bold">{admin.user}</span>
      </div>

      <div className="flex space-x-2">
        <button className="px-4 py-3 font-bold bg-cyan-700 text-white rounded active:bg-cyan-800" onClick={() => modalEditar()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>

        <button className="px-4 py-3 font-bold bg-orange-500 text-white rounded active:bg-orange-600" onClick={() => handleOpenModal(admin.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>

        {isModalOpen && (
          <ModalConfirmar isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} title="Eliminar Administrador"
          />
        )}
      </div>
    </div>
  );
}
