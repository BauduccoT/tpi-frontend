import React, { useState } from 'react';
import ModalProd from "./ModalProductos";
import ProductoItem from "./ProductoItem";
import Producto from "../comun/Producto";
export default function ProductosMenu(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal =() => {
        setIsModalOpen(true);
    };
    const handleCloseModal =() => {
        setIsModalOpen(false);
    };

    return(
        <div className="flex h-screen bg-gray-300">
            <div className="flex-1 bg-white ">
            <div className="flex items-center bg-cyan-700 p-4 mb-6  mt-14 justify-center w-full ">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-1/2 p-2 rounded-md outline-none"
            style={{ minWidth: '200px' }} 
          />
          <div className="ml-4 ">
            <button className="p-2 bg-orange-500 text-white rounded-md active:bg-orange-600 font-bold"
            onClick={handleOpenModal}> Agregar
            </button>
          </div>
        </div>
        <div className=" space-y-4 p-6 flex flex-col items-center">
          {[...Array(5)].map((_, index) => (
            <ProductoItem key={index} /> 
          ))}

          <ModalProd isOpen={isModalOpen} onClose={handleCloseModal} title="Agregar Producto">

        </ModalProd>
        </div>
            </div>
        </div>
  );

}