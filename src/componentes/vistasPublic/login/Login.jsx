import { useState } from 'react';
import { Link } from "wouter";
import Boton from '../comun/Boton';
import Registro from '../registro/Registro';
import iconoCarrito from '../../assets/cart.svg'

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
    
      <form className="flex flex-col bg-violet-950 p-20 rounded-lg shadow-md w-100 items-center">
      <div className='flex flex-row'>
      <p className='text-white text-center font-arial text-2xl '>Mercadito</p>
      <img src={iconoCarrito}/>
      </div>
      
      <br></br>
        <div className="mb-8 hover:p-25">
          <input
            type="text"
            placeholder="User..."
            className="w-full p-3 rounded"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="mb-8"> 
          <input
            type="password"
            placeholder="Password..."
            className="w-full p-3 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to='/registro'><p className='text-white text-decoration-line: underline'>Haga Click Aquí par Registrarse</p></Link>
       
        <br></br>
        <div className="flex justify-center">
          <Link to='/Home'>
          <Boton texto='Inicio Sesión'/>
          </Link>
            
          
        </div>
      </form>
    </div>
  );
}
