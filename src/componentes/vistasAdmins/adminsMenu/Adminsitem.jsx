import React, { useState } from 'react';
import iconoPersona from '../../../assets/person.svg';
import ModalEliminar from '../../comunAdmins/ModalEliminar';

export default function AdminsItem({ admin, deleteAdmin, modificar }) {
  const [modalEliminar, setModalEliminar] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 hover:bg-gray-300 p-4 rounded-md shadow-md font-Arial w-1/2">
      {/* Información del administrador */}
      <div className="flex items-center flex-1 text-gray-600 mb-2 md:mb-0">
        <img src={iconoPersona} alt="Icono de usuario" className="h-8 w-8 mr-8" />
        <span className="font-bold">{admin.user}</span>
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-2">
        {/* Botón Editar */}
        <button
          className="px-4 py-3 font-bold bg-cyan-700 text-white rounded active:bg-cyan-800"
          onClick={() => modificar(admin)}
        >
          Editar
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

