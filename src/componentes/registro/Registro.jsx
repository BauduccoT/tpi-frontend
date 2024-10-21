import { Component, useState } from 'react'
import Boton from '../comun/Boton'

export default function Registro (){

    const [user, setUser] =useState;
    const [password, setPassword] =useState;
    const [nombre, setNombre] =useState;
    const [apellido, setApellido] =useState;
    const [correo, setCorreo] =useState;

     return(
        <div className='Contenedor Login'>
        <form>
            <input type="text" placeholder='Nombre...' onChange={(e)=>setNombre({nombre:e.target.value})} />
            
            <input type="text" placeholder='Apellido...' onChange={(e)=>setApellido({apellido:e.target.value})} />
            
            <input type="text" placeholder='User...' onChange={(e)=>setUser({user:e.target.value})} />
            
            <input type="text" placeholder='Password...' onChange={(e)=>setPassword({password:e.target.value})} />
            
            <input type="text" placeholder='Correo...' onChange={(e)=>setCorreo({correo:e.target.value})} />
            
            
            <Boton>Iniciar Sesion</Boton>
            
        </form>
        </div>
    )
  }

   
