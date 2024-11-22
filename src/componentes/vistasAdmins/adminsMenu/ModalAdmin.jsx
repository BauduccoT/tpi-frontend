import React, { useState } from 'react';
import Alert from '../../comun/Alert';

export default function ModalAdmin({ title, cerrar, buscar, crear, modificar, form, setForm }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {showAlert && <Alert data={alertData} click={(value) => setShowAlert(value)} />}
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full relative">
        {/* Botón de Cerrar */}
        <button onClick={cerrar} className="absolute top-4 right-4 text-red-600 font-bold text-xl">
          x
        </button>

        {/* Título del Modal */}
        <h2 className="text-lg font-bold mb-6 text-center">{title}</h2>
        
        {/* Campos de Usuario y Contraseña */}
        <div className="space-y-4">
          <input
            onChange={(e) => setForm({ ...form, user: e.target.value })}
            type="text"
            value={form.user}
            placeholder="Usuario..."
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            onChange={(e) => setForm({ ...form, pass: e.target.value })}
            type="password"
            value={form.pass}
            placeholder="Contraseña..."
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
        </div>

        {/* Botón Crear o Modificar */}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (title.includes('Agregar')) {
              crear();
            } else {
              modificar();
            }
            buscar();
            cerrar();
          }}
          className="mt-6 w-full py-2 bg-cyan-600 text-white rounded-md active:bg-cyan-800"
        >
          {title.includes('Agregar') ? 'Crear' : 'Modificar'}
        </button>
      </div>
    </div>
  );
}


