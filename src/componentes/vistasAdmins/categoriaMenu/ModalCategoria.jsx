import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function ModalCat({ closeModal, getCategorias, modificar, categoria }) {
  const [nombre, setNombre] = useState("");
   
 

  useEffect(()=>{
    if(modificar==true) setNombre(categoria.nombre)
  },[])

 //Función CREAR CATEGORIAS

  function postCategorias() {
    console.log("crea")
    const url = 'http://localhost:3000/api/categorias';
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      }
    };
    const data = { nombre };
  
    axios.post(url, data, config)
    .then((resp) => {
      if (resp.data.status === "ok") {
        getCategorias(); 
        closeModal(); 
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  //Funciín MODIFICAR CATEGORIA

  function putCategorias() {
    console.log("modificr")
    const url = 'http://localhost:3000/api/categorias';
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      },
      params:{
        id:categoria.id
      }
    };
    const data = {nombre};
  
    axios.put(url, data, config)
    .then((resp) => {
      if (resp.data.status === "ok") {
        getCategorias(); 
        closeModal(); 
      }
    })
    .catch((error) => {
      console.log(error, "");
    });
  }

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button
          onClick={()=>closeModal()}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl"
        >
          x
        </button>
        <h2 className="text-lg font-bold mb-6 text-center">{modificar==true?"Modificar Categoría": "Crear Categoría"}</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre Cat..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 rounded-md outline-none border border-gray-300"
          />
        </div>
        <button
          onClick={ modificar==true ? ()=>putCategorias(): ()=>postCategorias()}
          className="mt-6 w-full py-2 bg-cyan-600 text-white rounded-md active:bg-cyan-800"
        >
          {modificar==true ? "Modificar" :  "Crear"}
        </button>
      </div>
    </div>
  );
}
 