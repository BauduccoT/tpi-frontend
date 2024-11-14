import { useState } from 'react';
import axios from "axios";
import Alert from '../../comun/Alert';

export default function ModalProd({ isOpen, onClose, title }) {
  if (!isOpen) return null;

  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    precio_unidad: "",
    stock: "",
    descripcion: "",
    imagen: null
  });

  const handleFileChange = (e) => {
    setForm({ ...form, imagen: e.target.files[0] });
  };

  function validacion(){
    if (!form.nombre || !form.precio_unidad || !form.stock || !form.descripcion || !form.imagen) {
      setAlertData({
        titulo:'todos los campos son necesarios',
        check:false
      })
      setShowAlert(true)
      return false
    }
    return true
  }

  function newProd(){
    if (!validacion())return
    const url = "http://localhost:3000/api/productos";
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
        'Content-Type': 'multipart/form-data'
      }
    };

    const data = new FormData();
    data.append('nombre', form.nombre);
    data.append('precio_unidad', form.precio_unidad);
    data.append('stock', form.stock);
    data.append('descripcion', form.descripcion);
    data.append('imagen', form.imagen);

    axios.post(url, data, config)
      .then((resp) => {
        if (resp.data.status === 'ok') {
          setAlertData({
            titulo: 'Producto creado correctamente',
            check: true
          });
          setShowAlert(true);
        }
      })
      .catch((error) => {
        setAlertData({
          titulo: 'Error al crear el producto',
          check: false,
        });
        setShowAlert(true);
      });
  };

  const validacionInput = (valorInput, field) => {
    if (/^[0-9]*$/.test(valorInput)) {
      if (valorInput === '' || valorInput === '0') {
        setForm({ ...form, [field]: '' });
      } else {
        setForm({ ...form, [field]: valorInput });
      }
    }
  }
  const blurInput = (valorInput, field) => {
    if (valorInput === '' || valorInput === '0') {
      setForm({ ...form, [field]: '1' });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {showAlert && <Alert data={alertData} click={(value) => setShowAlert(value)} />}
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl hover:bg-slate-300 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-lg font-bold mb-6 text-center">{title}</h2>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre Producto"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="text"
            value={form.precio_unidad}
            onChange={(e) => validacionInput(e.target.value, 'precio_unidad')}
            onBlur={(e) => blurInput(e.target.value, 'precio_unidad')}
            placeholder="Precio Unidad"
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="text"
            value={form.stock}
            onChange={(e) => validacionInput(e.target.value, 'stock')}
            onBlur={(e) => blurInput(e.target.value, 'stock')}
            placeholder="Stock"
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Descripcion"
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
          <input
            type="file"
            name="imagen"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:cursor-pointer cursor-pointer file:transition-all file:duration-150 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500"
            placeholder="seleccionar imagen"
          />
        </div>

        <button
          onClick={newProd}
          className="mt-6 w-full py-2 bg-cyan-600 font-medium hover:bg-cyan-500 transition-all duration-150 text-white rounded-md active:bg-cyan-800"
        >
          Crear
        </button>
      </div>
    </div>
  );
}
