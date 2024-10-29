import { useState } from 'react';
import { Link } from "wouter";
import Boton from '../../comun/Boton';
import iconoUser from '../../../assets/person-circle.svg'

export default function Usuario() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex justify-center items-center mt-14 sm:mt-20 w-screen">
   
      <form className="py-20 px-3 sm:p-20 w-full m-3   flex flex-col bg-gray-300 redonded shadow-md sm:w-8/12 items-center sm:m-5 ">
      {/* <div className='m-5 flex mr-20 mt-0 p-5'>
      
      </div>
       */}
      <div className='flex flex-row pb-10'>
      
      <img src={iconoUser}/>
      </div>

    <div className='flex flex-col sm:flex-row justify-center gap-5 sm:gap-10 '>

      <div className='flex flex-col gap-4 w-full sm:w-2/4'>

        <div className="mb-8 hover:p-25">
          <input
            type="text"
            placeholder="Nombre..."
            className="w-full p-3 rounded"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="mb-8"> 
          <input
            type="password"
            placeholder="Apellido..."
            className="w-full p-3 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-8 hover:p-25">
          <input
            type="text"
            placeholder="Gmail..."
            className="w-full p-3 rounded"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
    </div>


    <div className='flex flex-col gap-4 w-max sm:w-2/4'>
        <div className="mb-8"> 
          <input
            type="password"
            placeholder="Usuario..."
            className="w-full p-3 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-8 hover:p-25">
          <input
            type="text"
            placeholder="Contraseña..."
            className="w-full p-3 rounded"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
       
        <div className="flex flex-row justify-center gap-3 max-h-12 ">
          <Boton texto='Modificar'/>
          <Boton texto='Cerrar'/>
        </div>
    </div>
    </div>
      
      </form>
      
    </div>
  );
}
