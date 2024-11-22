import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Categoria({ categoria }) {

    const [id, setId]= useState();
    const [location, setLocation]=useLocation();

    useEffect(()=>{
        setId(categoria.id);
    },[])

    function obtenerProdCat() {
        setLocation(`/categoria/${id}`)
    }


  return (
    <button
      className="bg-violet-900 hover:bg-orange-500 text-white px-6 py-3 rounded whitespace-nowrap transition-colors duration-200"
      onClick={() => obtenerProdCat() }

    >
      {categoria.nombre}
    </button>
  );
}
