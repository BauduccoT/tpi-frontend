import { Component, useState, useEffect } from 'react'
import Boton from '../../comun/Boton'
import { Link, useLocation } from 'wouter';
import iconoCarrito from '../../../assets/cart.svg'
import axios from "axios";

export default function Registro (props){
    const [form, setForm]=useState({        
        user:"",
        password:"",
        nombre:"",
        apellido:"",
        correo:""
    });
    const [location,setLocation]=useLocation("")

    function newUser(){
        
        const url="http://localhost:3000/api/usuarios"
        const data={
            user:form.user,
            pass:form.pass,
            nombre:form.nombre,
            apellido:form.apellido,
            correo:form.correo
        }
        axios.post(url,data)
        .then((resp)=>{
          console.log(resp.data);
            setLocation("/login")
        })
        .catch((error)=>{
          console.log(error);
          alert("Error");
        })

      }

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
            onChange={(e)=>setForm({...form,apellido:e.target.value})} />
            
            
            <input 
            type="text" 
            placeholder='User...'
            className="w-full p-2 rounded" 
            onChange={(e)=>setForm({...form,user:e.target.value})} />
            
            
            <input 
            type="text" 
            placeholder='Password...' 
            className="w-full p-2 rounded"
            onChange={(e)=>setForm({...form,password:e.target.value})} />
            
            
            <input 
            type="text" 
            placeholder='Correo...' 
            className="w-full p-2 rounded"
            onChange={(e)=>setForm({...form,correo:e.target.value})} />
            
            <Link to='/login'><p className='text-white text-decoration-line: underline'>Haga Click Aquí para Iniciar Sesión</p></Link>
            
            
            <button onClick={(e)=>{
                e.preventDefault()
                newUser()
                }} className="bg-orange-500 text-white p-3 sm:py-1 sm:px:2 md:py-3 md:px-4 rounded-md text-md hover:bg-orange-600" >
                Registro
            </button>
            
            
        </form>


       
        </div>
    )
  }

   
