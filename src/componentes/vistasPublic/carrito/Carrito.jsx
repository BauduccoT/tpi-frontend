import React, { useState } from 'react';
import Boton from '../../comun/Boton';
import CarritoItem from './Carritoitem';
import { Link } from "wouter";
import { useEffect } from 'react';


export default function Carrito() {
  const [productos,setProductos]=useState(null)
  const [actu,setActu]=useState(false)
  
  useEffect(()=>{
    let carrito=sessionStorage.getItem("carrito")
    if(carrito!==null){
      setProductos(JSON.parse(carrito))
    }
    if(carrito==null) setProductos(null)
    if(carrito==[]) setProductos(null)
    
    setActu(false)
    
  },[actu])

  return (
    <div className="flex flex-col left-0 right-0 mt-14 sm:mt20">
      <div className="w-5/6 md:w-4/6 mx-auto my-8 divide-y shadow rounded-lg ">
        {productos==null?null:
          productos.map((prod, index)=>
            <CarritoItem prod={prod} key={index} actualizar={()=>{
              setActu(true)
              console.log("actualizacion ")
            }}/>
          )
        }
      </div>
      {productos==null?
        <div className='flex justify-center h-64  p-3 '>
          <p className='flex justify-center w-4/6 sm:w-3/6 items-center text-xl text-center bg-slate-200 rounded-lg'>
            Parece que todavía no tienes productos en tu carrito
          </p>
        </div>:
        <div className="flex justify-evenly m-8">
            <Boton texto="Vaciar Carrito"/>
            <Boton texto="Finalizar compra" /> 
        </div>
      }
    </div>
  );
};


