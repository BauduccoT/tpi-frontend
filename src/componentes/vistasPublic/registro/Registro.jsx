import { Component, useState, useEffect } from 'react'
import Boton from '../comun/Boton'
import { Link } from 'wouter';
import iconoCarrito from '../../assets/cart.svg'

export default function Registro (props){
    const [form, setForm]=useState({        
        user:"",
        password:"",
        nombre:"",
        apellido:"",
        correo:""
    }

);

    // useEffect(()=>{
    //     if()
    // })

     return(
        <div className='flex justify-center items-center min-h-screen w-screen'>
        <form className='flex flex-col bg-violet-950 p-20 w-1/3  py-10 gap-6 rounded-lg shadow-md w-100 items-center'>
            
        <div className='flex flex-row'>
            <p className='text-white text-center font-arial text-2xl '>Mercadito</p>
            <img src={iconoCarrito}/>
        </div>
            
            <input 
            type="text"
            placeholder='Nombre...'
            className="w-full p-2 rounded" 
            onChange={(e)=>setForm({...form,nombre:e.target.value})} />
            
            
            <input 
            type="text"
            placeholder='Apellido...'
            className="w-full p-2 rounded"
            onChange={(e)=>setApellido({...form,apellido:e.target.value})} />
            
            
            <input 
            type="text" 
            placeholder='User...'
            className="w-full p-2 rounded" 
            onChange={(e)=>setUser({...form,user:e.target.value})} />
            
            
            <input 
            type="text" 
            placeholder='Password...' 
            className="w-full p-2 rounded"
            onChange={(e)=>setPassword({...form,password:e.target.value})} />
            
            
            <input 
            type="text" 
            placeholder='Correo...' 
            className="w-full p-2 rounded"
            onChange={(e)=>setCorreo({...form,correo:e.target.value})} />
            
            <Link to='/login'><p className='text-white text-decoration-line: underline'>Haga Click Aquí para Iniciar Sesión</p></Link>
            
            <Link to='/Home'>
            <Boton texto='Registro'/>
            </Link>
            
        </form>


       
        </div>
    )
  }

   
