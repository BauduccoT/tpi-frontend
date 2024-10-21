import { Component, useState } from 'react'
import Boton from '../comun/Boton'

export default function Login (){

    const [user, setUser] =useState;
  
    const [password, setPassword] =useState;



     return(
        <div className='Contenedor Login'>
        <form>
            <input type="text" placeholder='User...' onChange={(e)=>setUser({user:e.target.value})} />
            
            <input type="text" placeholder='Password...' onChange={(e)=>setPassword({password:e.target.value})} />
            
            
            <Boton>Iniciar Sesion</Boton>
        </form>
        </div>
    )
  }

   
