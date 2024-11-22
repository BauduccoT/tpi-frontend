import { useState } from 'react';
import axios from 'axios';

export default function ModalEliminar({ cerrar, title, id, deleteItem}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-md shadow-lg p-8 max-w-md w-full relative">
      
        <button
          onClick={()=>cerrar()}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl hover:bg-red-600 hover:text-white rounded-sm transition-all duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

        </button>

        <div className="space-y-4">
          <h2 className="text-lg font-bold mb-6 text-center">{title}</h2>
        </div>
        
        <div className='flex justify-center flex-row gap-5'>
        
        <button
          onClick={()=>{
            deleteItem(id)
            cerrar()
          }}
          className="mt-6 w-full py-2 bg-red-600 font-medium hover:bg-red-700 transition-all duration-100 text-white rounded-sm active:bg-red-800"
        >
          Eliminar
        </button>
  
        <button
          onClick={()=>cerrar()}
          className="mt-6 w-full py-2 bg-green-500 font-medium hover:bg-green-600 transition-all duration-100 text-white rounded-sm active:bg-green-700"
        >
          Cancelar
        </button>
        </div>
      </div>
    </div>
  );
}
