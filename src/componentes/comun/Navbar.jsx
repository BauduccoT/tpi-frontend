import { useState } from 'react'
import { Link } from 'wouter'

import carritoSvg from "../../assets/carrito.svg"
import usuarioSvg from "../../assets/usuario.svg"
import lupaSvg from "../../assets/lupa.svg"


export default function Navbar() {
  const [buscador,setBuscador]=useState("")

  // function handleOnSubmit(event){
  //   event.preventDefault()
  // }

  // Falta crear la funcion en la que se modifique la ruta a la ruta /busqueda y que pase por parametros lo que esta en el input

  return (

    <div className='w-screen z-10 flex flex-row justify-between md:p-3 sm:p-2 bg-purple-900 items-center fixed top-0'>
      <Link to='/home' className="flex flex-row flex-none text-slate-50 content-center justify-center hover:bg-purple-950 p-2 rounded-xl">
        <h2 className='md:text-2xl sm:text-base'>Mercadito </h2><img src={carritoSvg} alt="" />
      </Link>
      
      <div className='flex flex-1 md:max-w-xs sm:max-w-52 sm:h-9 md:h-10 bg-white items-center  rounded-sm sm:rounded-md p-0 m-0'>
        <form className='flex flex-row   justify-center content-center min-w-full min-h-full gap-1'>
          <input type="text" className='text-sm sm:h-7 md:h-8 rounded-sm sm:rounded-md p-2 w-5/6 focus:outline-none ' value={buscador} onChange={(e)=>setBuscador(e.target.value)}/>
          <button type='submit' className='flex justify-center items-center w-2/6 sm:w-1/6 '>
            <img src={lupaSvg} alt="" />
          </button>
        </form>
      </div>

      <div className='flex flex-row flex-none md:gap-6 sm:gap-3'>
        <Link to="/carrito" className='flex content-center justify-center hover:bg-purple-950 w-12 h-12 p-2 rounded-xl'>
          <div className='p-0 m-0'>
            <img src={carritoSvg} alt="" />
          </div>
        </Link>
        
        <Link to='/usuario' className='flex content-center justify-center hover:bg-purple-950 w-12 h-12 p-2 rounded-xl'>
          <div>
            <img src={usuarioSvg} alt="" />
          </div>
        </Link>
      </div>
    </div>
  )
}
