import React from 'react';
import Boton from '../../comun/Boton';
import CarritoItem from './Carritoitem';
import { Link } from "wouter";
import { useEffect } from 'react';


export default function Carrito() {

  useEffect(()=>{
    // cargar el carrito a un state y ralizar map
  },[sessionStorage.getItem("carrito")])

  return (
    <div className="flex flex-col left-0 right-0 mt-14 sm:mt20">
     
      
      <div className="w-5/6 md:w-4/6 mx-auto my-8 divide-y shadow rounded-lg ">
        
      
        
      
        
      </div>
      <div className="flex justify-evenly m-8">
          <Boton texto="Vaciar Carrito"/>
          <Boton texto="Finalizar compra" /> 
      </div>
    </div>
  );
};


