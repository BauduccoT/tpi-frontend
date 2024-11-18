import React, { useState } from 'react';
import Alert from '../comun/Alert';
import axios from 'axios';


export default function ModalAdmin  ({ isOpen, onClose, title }) {
  if (!isOpen) return null;
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});

  const [form,setForm]= useState ({
    user:"",
    pass:""
  })


  function crearAdmin() {
    const url = 'http://localhost:3000/api/usuarios-admin';
    const token = sessionStorage.getItem("token");
  
    const config = {
      headers: {
        authorization: token
      }
    };

    const data = {
      user:form.user,
      pass:form.pass

    }
  
    axios.post(url, data, config)
      .then((resp) => {
        console.log(resp.data);
  
        if (resp.data.status === "error") {
          setAlertData({
            titulo: 'Error',
            detalle: resp.data.error,
            check: false
          });
          setShowAlert(true);
        } else {
          { setAlertData({ titulo: 'Éxito', detalle: 'Administrador creado correctamente', check: true }); setShowAlert(true); setForm({ user: "", pass: "" });}
        }
      })
      
      .catch((error) => {
        console.log(error);
  
        setAlertData({
          titulo: 'Error',
          detalle: error.response ? error.response.data.error : 'Error',
          check: false
        });
        setShowAlert(true);
      });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {showAlert==true&&<Alert data={alertData} click={(value)=>setShowAlert(value)}/>}
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full relative">
        {/* Botón de Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl"
        >
  
        </button>

        {/* Título del Modal */}
        <h2 className="text-lg font-bold mb-6 text-center">{title}</h2>
        
        {/* Campos de Usuario y Contraseña */}
        <div className="space-y-4">
          <input
          onChange={(e)=> setForm ({...form, user:e.target.value})}
            type="text"
            value={form.user}
            placeholder="Usuario..."
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
          onChange={(e)=> setForm ({...form, pass:e.target.value})}
            type="password"
            value={form.pass}
            placeholder="Contraseña..."
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
        </div>

        {/* Botón Crear */}
        <button
          onClick={(e) => {
            e.preventDefault()
            crearAdmin()
          }}
          className="mt-6 w-full py-2 bg-cyan-600 text-white rounded-md active:bg-cyan-800"
        >
          Crear
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl"
        >
          x
        </button>
      </div>
    </div>
  );
};


