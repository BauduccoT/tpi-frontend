import React, { useEffect, useState } from 'react';
import axios from "axios";
// import ModalAlerta from '../../comunAdmins/ModalAlerta';
import CategoriaItem from './CategoriaItem';
import ModalCat from './ModalCategoria';
import { useLocation } from 'wouter';
import { jwtDecode } from 'jwt-decode';


export default function CategoriaMenu() {
  //
  const [modalCategoria, setModalCategoria]= useState(false);
  //
  const [listaCategorias, setListaCats] = useState([]);
  //
  const [modificar, setModificar] = useState(false);
  //
  const [categoriaModif, setCategoriaModif] = useState({});

  // const [modalEliminar, setModalEliminar] = useState(false); 

  const [location, setLocation]=useLocation()

  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    
    if(token!==null){
      const decoded = jwtDecode(token)
      console.log(decoded.data.admin)
      if(decoded.data.admin==0) setLocation('/home');
    }
    else{
      setLocation('/home');
    }
    getCategorias()
  },[])

  function closeModal(){
    setModificar(false)
    setCategoriaModif({})
    setModalCategoria(false);
  };

  // Función para obtener las categorías
  function getCategorias() {
    const url = 'http://localhost:3000/api/categorias';
    const token = sessionStorage.getItem("token");
    const config = { 
      authorization: token,
    };

    axios.get(url, config)
      .then((resp) => {
        if (resp.data.categorias) 
          setListaCats(resp.data.categorias);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function openModificar(categoria){
    setModificar(true)
    setCategoriaModif(categoria)
    setModalCategoria(true)

  }

  function deleteCategorias(categoriaId) {
    const url = `http://localhost:3000/api/categorias`;
    const token = sessionStorage.getItem('token');
    const config = {
      params: { id: categoriaId },
      headers: {
        authorization: token,
      },
    };

    axios.delete(url, config)
      .then((resp) => {
        console.log(resp);
        
        if (resp.data.status === 'ok') {
          getCategorias();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex h-screen bg-gray-300">
      {modalCategoria==true && <ModalCat
            closeModal={()=>closeModal()}
            getCategorias={getCategorias}
            categoria={categoriaModif}
            modificar={modificar}
            />
  
      }
      <div className="flex-1 bg-white">
        <div className="flex items-center bg-cyan-700 p-4 mb-6 mt-14 justify-center w-full">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-1/2 p-2 rounded-md outline-none"
            style={{ minWidth: '200px' }}
          />
          <div className="ml-4">
            <button className="p-2 bg-orange-500 text-white rounded-md font-bold" onClick={()=>setModalCategoria(true)}>
              Agregar
            </button>
          </div>
        </div>
        <div className="space-y-4 p-6 flex flex-col items-center">
          {listaCategorias?.map((categoria) => (
            <CategoriaItem 
            getCategorias={()=>getCategorias()} 
            key={categoria.id} categoria={categoria} 
            openModificar={(categoria)=>openModificar(categoria)}
            deleteCategorias={deleteCategorias}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
