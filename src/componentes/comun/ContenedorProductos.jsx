import React from "react";
import Producto from "./Producto";

export default function ContenedorProductos(props){
    

    return(
        <div className=" flex justify-center items-center flex-wrap gap-5">
            {props.lista.map((prod)=>{
                <Producto prod={prod}/>
            })}
        </div>
    )
}