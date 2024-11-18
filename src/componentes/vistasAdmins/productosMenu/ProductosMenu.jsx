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
  const [searchProd, setSearchProd] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPage = 10

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const handleNextPage = () => {
    setCurrentPage(prevPage=> prevPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage=> prevPage - 1)
    }
  }

  const filtrarProductos = searchProd === "" ? productos : productos.filter((producto)  =>
    producto.nombre.toLowerCase().includes(searchProd.toLowerCase()) 
  )

  return (
    <div className="flex h-screen bg-gray-300">
      {showAlert && <Alert data={alertData} click={(value) => setShowAlert(value)} />}
      <div className="flex-1 bg-white">
        <div className="flex items-center bg-cyan-700 p-4 mb-6 mt-14 justify-center w-full">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchProd}
            onChange={(e) => setSearchProd(e.target.value)}
            className="w-1/2 p-2 rounded-md outline-none"
            style={{ minWidth: '200px' }} 
          />
          <div className="ml-4">
            <button className="p-2 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold"
              onClick={handleOpenModal}> Agregar
            </button>
          </div>
        </div>
        <div className="space-y-4 p-6 flex flex-col items-center">
          {filtrarProductos.map((producto) => (
            <ProductoItem
              key={producto.id}
              producto={producto}
            />
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          <button className='p-2 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold cursor-pointer' onClick={handlePrevPage} disabled={currentPage===1}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
          </svg>
          </button>
          <h1 className='mt-2'>{currentPage}</h1>
          <button className='p-2 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold cursor-pointer' onClick={handleNextPage}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
          </svg>
          </button>
        </div>
        <ModalProd isOpen={isModalOpen} onClose={handleCloseModal} title="Agregar Producto"></ModalProd>
      </div>
    </div>
  );
}
