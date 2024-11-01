import { useState } from 'react';
import { Link } from "wouter";
import axios from "axios";
import Boton from '../../comun/Boton';
import iconoCarrito from '../../../assets/cart.svg'

export default function Login() {
  const [form, setForm] = useState({
    user:"",
    pass:""
  });

  function login(){
    
    const url="http://localhost:3000/api/usuarios/login"
    const data={
      user:form.user,
      pass:form.pass
    }
    axios.post(url,data)
    .then((resp)=>{
      
      sessionStorage.setItem("token",resp.data.token)
      // if(resp)
    })
    .catch((error)=>{
      console.log(error);
      alert("Error");
    })
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
    
      <form className="flex flex-col bg-violet-950 p-20 rounded-lg shadow-md w-100 items-center">
        <div className='flex flex-row mb-10'>
          <p className='text-white text-center font-arial text-2xl '>Mercadito</p>
          <img src={iconoCarrito}/>
        </div>
        
        
        <div className="mb-8 hover:p-25">
          <input
            type="text"
            placeholder="User..."
            className="w-full p-3 rounded"
            onChange={(e) => setForm({...form,user:e.target.value})}
          />
        </div>
        <div className="mb-8"> 
          <input
            type="password"
            placeholder="Password..."
            className="w-full p-3 rounded"
            onChange={(e) => setForm({...form,pass:e.target.value})}
          />
        </div>
        <Link to='/registro'><p className='text-white text-decoration-line: underline'>Haga Click Aquí par Registrarse</p></Link>
      
        <br></br>
        <div className="flex justify-center">
          <Boton texto='Inicio Sesión' click={(e)=>{
            e.preventDefault()
            login()
          }}/>
        </div>
      </form>
    </div>
  );
}
