import React, { useState, useEffect } from 'react';
import ModalProd from "./ModalProductos";
import ProductoItem from "./ProductoItem";
import Alert from '../../comun/Alert';
import axios from 'axios';

export default function ProductosMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [currentPage, setCurrentPage] = useState(1)
  const [buscador,setBuscador]=useState("")
  const itemsPage = 10
  const [lastPage, setLastPage]=useState(false)


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    if (buscador==="") {
      buscarProd()
    }
  },[buscador])

  function buscarProductosFiltrados(){
    if(buscador!==""){
      const url='http://localhost:3000/api/productos/busqueda'
      const data={
          params:{
              nombre:buscador
          }
      }
      axios.get(url, data)
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
    const url = `http://localhost:3000/api/productos?limit=${itemsPage}&offset=${(currentPage - 1) * itemsPage}`
    axios.get(url)
      .then((resp) => {
        console.log(resp.data);
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

  useEffect(() => {
    buscarProd();
  }, [currentPage])

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
            <button className="p-2 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold"onClick={handleOpenModal}> Agregar</button>
          </div>
        </div>
        <div className="space-y-4 p-6 flex flex-col items-center">
          {productos.map((producto) => (
            <ProductoItem
              key={producto.id}
              producto={producto}
              deleteProducto={deleteProducto}
            />
          ))}
        </div>
          {buscador!=""?null: <div className="flex justify-center space-x-4">
          <button className='p-2 mb-3 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold cursor-pointer disabled:bg-orange-800' onClick={handlePrevPage} disabled={currentPage===1}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
          </svg>
          </button>
          <h1 className='mt-2 mb-3'>{currentPage}</h1>
          <button className='p-2 mb-3 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold cursor-pointer disabled:bg-orange-800' onClick={handleNextPage} disabled={lastPage}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
          </svg>
          </button>
        </div>}
        <ModalProd isOpen={isModalOpen} onClose={handleCloseModal} title="Agregar Producto"></ModalProd>
      </div>
    </div>
  );
}