import React, { useState } from 'react';
import iconoPersona from '../../../assets/person.svg';
import ModalEliminar from '../../comunAdmins/ModalEliminar';

export default function AdminsItem({ admin, deleteAdmin}) {
  const [modalEliminar, setModalEliminar] = useState(false)


  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 hover:bg-gray-300 p-4 rounded-md shadow-md font-Arial w-1/2">
      {/* Información del administrador */}
      <div className="flex items-center flex-1 text-gray-600 mb-2 md:mb-0">
        <img src={iconoPersona} alt="Icono de usuario" className="h-8 w-8 mr-8" />
        <span className="font-bold">{admin.user}</span>
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-2">
        <button className="px-4 py-3 font-bold bg-cyan-700 text-white rounded active:bg-cyan-800" onClick={s}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>

        </button>

        {/* Botón Eliminar */}
        <button
          className="px-4 py-3 font-bold bg-orange-500 text-white rounded active:bg-orange-600"
          onClick={() => setModalEliminar(true)}
        >
          Eliminar
        </button>

        {/* Modal para confirmación de eliminación */}
        {modalEliminar && (
          <ModalEliminar
            title={`¿Eliminar usuario "${admin.user}"?`}
            id={admin.id}
            deleteItem={(id) => {
              deleteAdmin(id);
              setModalEliminar(false);
            }}
            cerrar={() => setModalEliminar(false)}
          />
        )}
      </div>
    </div>
  );
}

