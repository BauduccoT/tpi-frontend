import React from 'react';
import Navbar from '../comun/Navbar'; 
import Boton from '../comun/Boton';
import iconoQuitar from '../../assets/dash-square.svg'
import iconoAgregar from '../../assets/plus-square.svg'


export default function Carrito() {



  return (
    <div className=" w-screen mt-14 sm:mt20">
     
      
      <div className="max-w-5xl mx-auto py-8">
        {/* Contenedor de productos */}
        <div className="bg-gray-100 shadow-lg rounded-lg space-y-4 p-6">

          <div className="grid grid-cols-3 gap-4 items-center border-b px-6 py-4">
            
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-md" />
            </div>

        
            <div className="text-center">
              <p className="font-bold text-lg">producto 1</p>
            </div>

            <div className="flex justify-end items-center space-x-4">
              
              <button>
                <img src={iconoQuitar}/>
              </button>

              <input type="text" value="1" readOnly className="w-12 text-center border border-gray-300 rounded" />

              <button>
                <img src={iconoAgregar}/>
              </button>           
             
              <Boton texto="Eliminar"/>

            </div>
          </div>

         
          <div className="grid grid-cols-3 gap-4 items-center border-b px-6 py-4">
           
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-md" />
            </div>

           
            <div className="text-center">
              <p className="font-bold text-lg">producto 2</p>
            </div>

            
            <div className="flex justify-end items-center space-x-4">
              <button>
                <img src={iconoQuitar}/>
              </button>

              <input type="text" value="1" readOnly className="w-12 text-center border border-gray-300 rounded" />

              <button>
                <img src={iconoAgregar}/>
              </button>   
              
              <Boton texto="Eliminar"/>
            </div>
          </div>

        
          <div className="grid grid-cols-3 gap-4 items-center px-6 py-4">
            
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-md" />
            </div>

            
            <div className="text-center">
              <p className="font-bold text-lg">producto 3</p>
            </div>

            
            <div className="flex justify-end items-center space-x-4">
              
              <button>
                <img src={iconoQuitar}/>
              </button>

              <input type="text" value="1" readOnly className="w-12 text-center border border-gray-300 rounded" />

              <button>
                <img src={iconoAgregar}/>
              </button>   
              
              <Boton texto="Eliminar"/>

            </div>
          </div>
        </div>

      
        <div className="flex justify-between mt-8">
          <Boton texto="Volver" /> 
          <Boton texto="Vaciar Carrito"/>
          <Boton texto="Iniciar" /> 
        </div>
      </div>
    </div>
  );
};


