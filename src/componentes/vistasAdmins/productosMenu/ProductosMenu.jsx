import React, { useState, useEffect } from 'react';
import ModalProd from "./ModalProductos";
import ProductoItem from "./ProductoItem";
import Alert from '../../comun/Alert';
import axios from 'axios';
import { useLocation } from 'wouter';
import { jwtDecode } from 'jwt-decode';

export default function ProductosMenu() {
  const [modalProdOpen, setModalProdOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [currentPage, setCurrentPage] = useState(1)
  const [buscador,setBuscador]=useState("")
  const itemsPage = 10
  const [lastPage, setLastPage]=useState(false)
  const [location, setLocation]=useLocation()

  const [prodEditar, setProdEditar]=useState(null)

  useEffect(()=>{
    if (buscador==="") {
      buscarProd()
    }
  },[buscador, currentPage])
  
  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    
    if(token!==null){
      const decoded = jwtDecode(token)
      if(decoded.data.admin==0) setLocation('/home');
    }
    else{
      setLocation('/home');
    }
    buscarProd()
  },[])

  function buscarProductosFiltrados(){
    if(buscador!==""){
      const token=sessionStorage.getItem("token")
      const url='http://localhost:3000/api/productos/busqueda-nombre'
      const config={
        params:{
          nombre:buscador
        },
        headers:{
          authorization:token
        }
      }
      axios.get(url, config)
      .then((resp)=>{
          if(resp.data.lista)setProductos(resp.data.lista)
          if(resp.data.error){
              setProductos([])
              setAlertData({
                  titulo:'Error',
                  detalle:resp.data.error,
                  check:false
              })
              setShowAlert(true)
          }
      })
      .catch((error)=>{
          setAlertData({
              titulo:'Error',
              check:false
          })
          setShowAlert(true)
      })
    }
  }

  function buscarProd() {
    const url = `http://localhost:3000/api/productos/busqueda-todos?limit=${itemsPage}&offset=${(currentPage - 1) * itemsPage}`
    const token=sessionStorage.getItem("token")
    const config={
      headers:{
        authorization:token
      },
    }
    axios.get(url,config)
      .then((resp) => {
        if (resp.data.status === "error") {
          setAlertData({
            titulo: "error",
            detalle: resp.data.error,
            check: false
          });
          setShowAlert(true);
        } else {
          setProductos(resp.data.producto);
          const listaId=resp.data.producto.map(item=>item.id)
          if (listaId.lastIndexOf(resp.data.ultId)!==-1) {
            console.log("si, es el ultimo :v ");
            setLastPage(true)
            
          }else{
            setLastPage(false)
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setAlertData({
          titulo: "error",
          detalle: error.response ? error.response.data.error : 'error de red'
        });
        setShowAlert(true);
      });
  }

  function newProd(form, inputRadio){
    console.log({form, inputRadio})
    if (!form.nombre || !form.precio_unidad || !form.stock || !form.descripcion || !form.imagen || !inputRadio) {
      setAlertData({
        titulo:'todos los campos son necesarios',
        check:false
      })
      setShowAlert(true)
    }
    else{
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
      data.append('categoria', inputRadio);
      data.append('imagen', form.imagen);

      axios.post(url, data, config)
      .then((resp) => {
        if (resp.data.status === 'ok') {
          setAlertData({
            titulo: 'Producto creado correctamente',
            check: true
          });
          setShowAlert(true);
          setModalProdOpen(false)
          buscarProd()
        }
      })
      .catch((error) => {
        setAlertData({
          titulo: 'Error al crear el producto',
          check: false,
        });
        setShowAlert(true);
      });
    } 
  };

  function editarProd(form, inputRadio){
    console.log({form, inputRadio})
    if (!form.nombre || !form.precio_unidad || !form.stock || !form.descripcion || !inputRadio) {
      setAlertData({
        titulo:'todos los campos son necesarios',
        check:false
      })
      setShowAlert(true)
      
    }
    else{
      const url = "http://localhost:3000/api/productos";
      const token = sessionStorage.getItem("token");
      const config = {
        params:{
          id:prodEditar.id
        },
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
      data.append('categoria', inputRadio);
      if(form.imagen)data.append('imagen', form.imagen);

      axios.put(url, data, config)
      .then((resp) => {
        if (resp.data.status === 'ok') {
          setAlertData({
            titulo: 'Producto modificado correctamente',
            check: true
          });
          setShowAlert(true);
          setProdEditar(null)
          setModalProdOpen(false)
          buscarProd()
        }
      })
      .catch((error) => {
        setAlertData({
          titulo: 'Error al crear el producto',
          check: false,
        });
        setShowAlert(true);
      });
    }
  }

  function modalEditarProd(producto){
    setProdEditar(producto)
    setModalProdOpen(true)
  }

  

  function deleteProducto(productoId) {
    const url = `http://localhost:3000/api/productos`;
    const token = sessionStorage.getItem('token');
    const config = {
      params: { id: productoId },
      headers: {
        authorization: token,
      },
    };

    axios.delete(url, config)
      .then((resp) => {
        console.log(resp);
        
        if (resp.data.status === 'ok') {
          buscarProd();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage=> prevPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage=> prevPage - 1)
    }
  }

  return (
    <div className="flex h-screen bg-gray-300">
      {showAlert && <Alert data={alertData} click={(value) => setShowAlert(value)} />}
      {modalProdOpen==true&&
        <ModalProd 
          cerrarModal={()=>{
            setModalProdOpen(false)
            setProdEditar(null)
          }} 
          newProd={(form, inputRadio)=>newProd(form, inputRadio)}
          editarProd={(form, inputRadio)=>editarProd(form, inputRadio)}
          prod={prodEditar}
        />
      }
      <div className="flex-1 bg-white">
        <div className="flex items-center bg-cyan-700 p-4 mb-6 mt-14 justify-center w-full">
          <input type="text" className='text-sm sm:h-7 md:h-8 rounded-sm sm:rounded-md p-2 w-5/6 focus:outline-none items-center' 
          value={buscador} 
          onChange={(e)=>setBuscador(e.target.value)} 
          onKeyDown={(e)=>{if(e.key === 'Enter'){e.target.blur()
          buscarProductosFiltrados()
          }}
          }/>
          <div className="ml-4">
            <button className="p-2 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold"
              onClick={()=>setModalProdOpen(true)}> Agregar
            </button>
          </div>
        </div>
        <div className="space-y-4 p-6 flex flex-col items-center">
          {productos.map((producto) => (
            <ProductoItem
              key={producto.id}
              producto={producto}
              editar={(producto)=>modalEditarProd(producto)}
              deleteProducto={(id)=>deleteProducto(id)}
            />
          ))}
        </div>

          {buscador!=""?null: <div className="flex justify-center space-x-4">
          <button className='p-2 mb-3 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold cursor-pointer disabled:bg-orange-800' onClick={handlePrevPage} disabled={currentPage===1}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
          </svg>
          </button>
          <h1 className='mt-2 mb-3'>{currentPage}</h1>
          <button className='p-2 mb-3 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold cursor-pointer disabled:bg-orange-800' onClick={handleNextPage} disabled={lastPage}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
          </svg>
          </button>
        </div>}
      </div>
    </div>
  );
}