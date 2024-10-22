import React from "react";
import Categorias from "./Categoria";

export default function Contenedor_categoria(){
    
    return(
        <div className=" flex h-64  justify-center  flex-wrap content-between">
            <Categorias/>
            <Categorias/>
            <Categorias/>
            <Categorias/>
            
        </div>
    )

}