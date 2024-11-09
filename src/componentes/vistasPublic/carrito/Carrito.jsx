import React from 'react';
import Boton from '../../comun/Boton';
import CarritoItem from './Carritoitem';
import { Link } from "wouter";


export default function Carrito() {



  return (
    <div className="flex flex-col left-0 right-0 mt-14 sm:mt20">
     
      
      <div className="w-5/6 md:w-4/6 mx-auto my-8 divide-y shadow rounded-lg ">
        {/* Contenedor de productos */}
      
        <CarritoItem/>
        <CarritoItem/>
        <CarritoItem/>
        <CarritoItem/>
        <CarritoItem/>
      
        
      </div>
      <div className="flex justify-evenly m-8">
          <Boton texto="Vaciar Carrito"/>
          <Boton texto="Finalizar compra" /> 
      </div>
    </div>
  );
};


