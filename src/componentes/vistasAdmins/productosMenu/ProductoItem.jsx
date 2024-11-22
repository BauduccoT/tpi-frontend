import React, { useState } from 'react';
import ModalProd from './ModalProductos';
import ModalEliminar from '../../comunAdmins/ModalEliminar';


export default function ProductoItem({editar, producto, deleteProducto}) {

  const [modalEliminar, setModalEliminar] = useState(false)


  return (
    <div className="flex md:flex-row flex-col bg-gray-100 hover:bg-gray-300 p-4 rounded-md shadow-md font-Arial w-3/4">
       {modalEliminar==true && <ModalEliminar
        title={`¿Eliminar Producto "${producto.nombre}"?`}
        id={producto.id}
        deleteItem={(id)=> deleteProducto(id)}
        cerrar={()=> setModalEliminar(false)}
      />}
      <div className="h-40 bg-grey rounded-md flex md:w-2/6 w-full justify-center items-center">
          <img src={`http://localhost:3000/${producto.img_url}`} alt="" className='h-full w-2/5'/>

      </div>
      <div className='flex flex-col py-3 justify-start w-4/6'>
        <div className='flex md:flex-row flex-col p-2 md:space-x-2 space-x-0'>
          <span className="font-bold md:w-2/3 w-full">{producto.nombre}</span>
          <span className="font-bold">precio:{producto.precio_unidad}$</span>
          <span className="font-bold">stock:{producto.stock}</span>
        </div>
        <div className='flex'>
          <span className="font-bold">{producto.descripcion}</span>
        </div>
      </div>
      <div className="flex md:space-y-4  space-y-0 md:flex-col flex-row justify-center space-x-5 md:space-x-0 items-center h-full mt-4"  >
        <button className="px-3 py-4 bg-cyan-700 text-white rounded active:bg-cyan-800 font-bold"  onClick={()=>editar(producto)} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>
        <button className="px-3 py-4 bg-orange-500 text-white rounded active:bg-orange-600 font-bold" onClick={()=>setModalEliminar(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  );
}