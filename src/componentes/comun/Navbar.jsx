import { useState } from 'react'
import { Link, useLocation } from 'wouter'

import carritoSvg from "../../assets/carrito.svg"
import usuarioSvg from "../../assets/usuario.svg"
import lupaSvg from "../../assets/lupa.svg"


export default function Navbar() {
  const [buscador,setBuscador]=useState("")
  const [location, setLocation]=useLocation()

  function buscarProducto(){
    setLocation(`/busqueda/${buscador}`)
  }

  return (

    <div className='w-full z-10 flex flex-row px-2 md:p-3 sm:p-2 bg-purple-900 items-center fixed top-0 left-0 right-0'>
      <div className='flex justify-center w-1/5 sm:w-1/5 md:w-1/6'>
        <Link to='/home' className="flex flex-row text-slate-50 content-center justify-center hover:bg-purple-950 p-2 rounded-xl">
          <h2 className='md:text-2xl sm:text-base'>Mercadito </h2><img src={carritoSvg} alt="" />
        </Link>
      </div>
      
      <div className='flex justify-center w-3/5 sm:w-3/5 md:w-4/6'>
        <div className='flex md:w-3/6 sm:w-3/5 sm:h-9 md:h-10 bg-white items-center  rounded-sm sm:rounded-md p-0 m-0'>
          <form className='flex flex-row justify-center content-center min-w-full min-h-full gap-1 items-center'>
            <input type="text" className='text-sm sm:h-7 md:h-8 rounded-sm sm:rounded-md p-2 w-5/6 focus:outline-none items-center' value={buscador} onChange={(e)=>setBuscador(e.target.value)}/>
            <button type='submit' 
              onClick={(e)=>{
                e.preventDefault()
                buscarProducto()
              }}
              className='flex justify-center items-center w-2/6 sm:w-1/6 '
            >
              <img src={lupaSvg} alt="" />
            </button>
          </form>
        </div>
      </div>

      <div className='flex justify-center w-1/5 sm:w-1/5 md:w-1/6'>
        <div className='flex flex-row flex-none relative right-0 md:gap-6 sm:gap-3'>
          <Link to="/carrito" className='flex items-center justify-center hover:bg-purple-950 w-12 h-12 p-2 rounded-xl'>
            <div className='flex items-center'>
              <img src={carritoSvg} alt="" />
            </div>
          </Link>
          
          <Link to='/usuario' className='flex items-center justify-center hover:bg-purple-950 w-12 h-12 p-2 rounded-xl'>
            <div className='flex items-center'>
              <img src={usuarioSvg} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
