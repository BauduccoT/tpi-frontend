import React, { useEffect, useState } from 'react';
import Alert from '../../comun/Alert';

export default function ModalAdmin({ admin, cerrar, crear, modificar }) {
  const [editar, setEditar]=useState(false)
  const [form, setForm] = useState({
    user:"",
    pass:""
  });

  useEffect(()=>{
    console.log(admin)
    if(admin!==null){
      setEditar(true)
      setForm({
        user:admin.user,
        id:admin.id
      })
    }
  },[])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full relative">
        {/* Botón de Cerrar */}
        <button
          onClick={()=>cerrar()}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl hover:bg-slate-300 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Título del Modal */}
        <h2 className="text-lg font-bold mb-6 text-center">{editar==true ? 'Modificar Administrador' : 'Agregar Administrador'}</h2>
        
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
            {editar==true ? modificar(form) : crear(form)}
            cerrar();
          }}
          className="mt-6 w-full py-2 bg-cyan-600 text-white rounded-md active:bg-cyan-800"
        >
          {editar==true ? 'Modificar' : 'Crear'}
        </button>
      </div>
    </div>
  );
}


