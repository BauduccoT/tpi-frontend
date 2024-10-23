import { useState } from 'react'
import { Link } from 'wouter'
import iconoCarrito from '../../assets/cart.svg'


export default function Navbar() {
  const [buscador,setBuscador]=useState("")

  // function handleOnSubmit(event){
  //   event.preventDefault()
  // }

  // Falta crear la funcion en la que se modifique la ruta a la ruta /busqueda y que pase por parametros lo que esta en el input

  return (
    <div className='w-screen flex flex-row justify-between md:p-3 sm:p-2 bg-purple-900 items-center'>
      <Link to='/home' className="flex flex-none text-slate-50 content-center justify-center hover:bg-purple-950 p-2 rounded-xl">
        <h2 className='md:text-2xl sm:text-base'>Mercadito</h2>
        <img src={iconoCarrito}/>
      </Link>
      
      <div className='flex flex-1 md:max-w-xs sm:max-w-52 md:h-9 bg-white items-center rounded-md p-0 m-0'>
        <form className='flex flex-row justify-center content-center min-w-full min-h-full p-1 gap-1'>
          <input type="text" className='text-sm p-2 w-5/6 focus:outline-none rounded-md' value={buscador} onChange={(e)=>setBuscador(e.target.value)}/>
          <button type='submit' className='flex justify-center items-center w-1/6 '>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </button>
        </form>
      </div>

      <div className='flex flex-row flex-none md:gap-6 sm:gap-3'>
        <Link to="/carrito" className='flex content-center justify-center hover:bg-purple-950 w-12 h-12 p-2 rounded-xl'>
          <div className='p-0 m-0'>
            <svg color='white' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
          </div>
        </Link>
        
        <Link to='/usuario' className='flex content-center justify-center hover:bg-purple-950 w-12 h-12 p-2 rounded-xl'>
          <div>
            <svg color='white' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  )
}
