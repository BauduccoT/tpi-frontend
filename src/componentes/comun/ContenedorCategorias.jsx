import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Categoria from "./Categoria";

export default function ContenedorCategorias() {
  const [listaCategorias, setListaCats] = useState([]);
  const scrollRef = useRef(null); 

  // Función para obtener las categorías
  function getCategorias() {
    const url = "http://localhost:3000/api/categorias";

    axios.get(url)
      .then((resp) => {
        if (resp.data.categorias) setListaCats(resp.data.categorias);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCategorias();
  }, []);

  // funcion scroll
  const handleWheelScroll = (e) => {
    if (scrollRef.current) {
      e.preventDefault(); 
      scrollRef.current.scrollLeft += e.deltaY; 
    }
  };

  return (
    <div className="p-4">
      <div
        ref={scrollRef}
        onWheel={handleWheelScroll}
        className="w-full overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-white scrollbar-track-violet-700  scrollbar-thumb-rounded-lg"
      >
        <div className=" flex items-end ml-14 gap-8 p-4 ">
          {listaCategorias?.map((categoria) => (
            <Categoria
              key={categoria.id}
              categoria={categoria}
              getCategorias={getCategorias}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
